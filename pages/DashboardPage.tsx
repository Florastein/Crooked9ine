import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/dashboard/Header';
import { TaskColumn } from '../components/dashboard/TaskColumn';
import { UpcomingDeadlines } from '../components/dashboard/UpcomingDeadlines';
import { CreateTaskModal } from '../components/modals/CreateTaskModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';
import { Task } from '../types';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  updateDoc,
  query,
  where,
  getDoc
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuth } from '../hooks/useAuth';

interface User {
  id: string;
  name: string;
  email: string;
  division: string;
  role: 'Admin' | 'Team Lead' | 'Team Member';
}

export const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // ✅ Fetch user profile (from Firestore "Users" collection)
  useEffect(() => {
    if (!user?.uid) return;

    const fetchUserProfile = async () => {
      const userRef = doc(db, 'Users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserProfile({ id: userSnap.id, ...userSnap.data() } as User);
      }
    };

    fetchUserProfile();
  }, [user]);

  // ✅ Fetch live tasks filtered by user's division
  useEffect(() => {
    if (!userProfile) return;

    const tasksQuery = query(
      collection(db, 'Tasks'),
      where('division', '==', userProfile.division || 'General')
    );

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const fetchedTasks: Task[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];
      setTasks(fetchedTasks);
    });

    return () => unsubscribe();
  }, [userProfile]);

  // ✅ Fetch all users for task assignment
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Users'), (snapshot) => {
      const fetchedUsers: User[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
      setAllUsers(fetchedUsers);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Navigate to single task view
  const handleTaskClick = (task: Task) => {
    navigate(`/task/${task.id}`);
  };

  // ✅ Create new task — only allowed if Team Lead
  const handleCreateTask = async (taskData: any) => {
    if (userProfile?.role !== 'Team Lead') {
      alert('Only Team Leads can create tasks.');
      return;
    }

    try {
      await addDoc(collection(db, 'Tasks'), {
        ...taskData,
        status: 'To Do',
        createdAt: new Date().toISOString(),
        createdBy: user?.uid,
        createdByName: userProfile?.name || user?.email,
        division: userProfile?.division || 'General',
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // ✅ Handle delete confirmation
  const handleDeleteRequest = (task: Task) => {
    setTaskToDelete(task);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    try {
      await deleteDoc(doc(db, 'Tasks', taskToDelete.id));
      setTaskToDelete(null);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // ✅ Handle drag-and-drop status updates
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, newStatus: Task['status']) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (!taskId) return;

    try {
      await updateDoc(doc(db, 'Tasks', taskId), { 
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  // ✅ Filter tasks by status
  const tasksToDo = tasks.filter(task => task.status === 'To Do');
  const tasksInProgress = tasks.filter(task => task.status === 'In Progress');
  const tasksInReview = tasks.filter(task => task.status === 'In Review');
  const tasksDone = tasks.filter(task => task.status === 'Done');

  // ✅ Prepare deadlines for UpcomingDeadlines component
  const deadlines = tasks
    .filter(task => task.dueDate && new Date(task.dueDate) > new Date())
    .map(task => {
      const allowed = ['low', 'medium', 'high'] as const;
      const priority = (allowed.includes((task.priority as any)) ? task.priority : 'medium') as typeof allowed[number];
      return {
        title: task.title,
        dueDate: task.dueDate,
        priority
      };
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5); // Show only 5 upcoming deadlines

  return (
    <div className="bg-background dark:bg-background-dark min-h-screen text-text-main dark:text-text-main-dark">
      <Header 
        onNewTaskClick={() => {
          if (userProfile?.role === 'Team Lead') {
            setIsModalOpen(true);
          } else {
            alert('Only Team Leads can create tasks.');
          }
        }} 
      />
      
      <main className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <TaskColumn 
                title="To Do" 
                tasks={tasksToDo} 
                count={tasksToDo.length} 
                onTaskClick={handleTaskClick} 
                onDeleteRequest={handleDeleteRequest} 
                onDrop={(e) => handleDrop(e, 'To Do')} 
                onDragOver={handleDragOver} 
              />
              <TaskColumn 
                title="In Progress" 
                tasks={tasksInProgress} 
                count={tasksInProgress.length} 
                onTaskClick={handleTaskClick} 
                onDeleteRequest={handleDeleteRequest} 
                onDrop={(e) => handleDrop(e, 'In Progress')} 
                onDragOver={handleDragOver} 
              />
              <TaskColumn 
                title="In Review" 
                tasks={tasksInReview} 
                count={tasksInReview.length} 
                onTaskClick={handleTaskClick} 
                onDeleteRequest={handleDeleteRequest} 
                onDrop={(e) => handleDrop(e, 'In Review')} 
                onDragOver={handleDragOver} 
              />
              <TaskColumn 
                title="Done" 
                tasks={tasksDone} 
                count={tasksDone.length} 
                onTaskClick={handleTaskClick} 
                onDeleteRequest={handleDeleteRequest} 
                onDrop={(e) => handleDrop(e, 'Done')} 
                onDragOver={handleDragOver} 
              />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <UpcomingDeadlines deadlines={deadlines} />
          </div>
        </div>
      </main>

      {isModalOpen && (
        <CreateTaskModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleCreateTask}
          users={allUsers.filter(u => u.division === userProfile?.division)}
          currentUserDivision={userProfile?.division || 'General'}
        />
      )}

      {taskToDelete && (
        <DeleteConfirmationModal
          isOpen={!!taskToDelete}
          onClose={() => setTaskToDelete(null)}
          onConfirm={handleConfirmDelete}
          taskTitle={taskToDelete.title}
        />
      )}
    </div>
  );
};
