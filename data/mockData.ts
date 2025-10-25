export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Task {
  id: string;
  title: string;
  // FIX: Added optional description property to the Task interface.
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  dueDate?: string;
  assignees: User[];
  completedDate?: string;
  categoryColor: 'red' | 'yellow' | 'green' | 'blue';
}

export const users: { [key: string]: User } = {
  user1: { id: 'user1', name: 'Alex Johnson', avatarUrl: 'https://i.pravatar.cc/32?u=user1' },
  user2: { id: 'user2', name: 'Maria Garcia', avatarUrl: 'https://i.pravatar.cc/32?u=user2' },
  user3: { id: 'user3', name: 'James Smith', avatarUrl: 'https://i.pravatar.cc/32?u=user3' },
  user4: { id: 'user4', name: 'Li Wei', avatarUrl: 'https://i.pravatar.cc/32?u=user4' },
};

export const priorities = [
    { id: 'p1', name: 'High', color: 'red' },
    { id: 'p2', name: 'Medium', color: 'yellow' },
    { id: 'p3', name: 'Low', color: 'green' },
]

export const tasks: Task[] = [
  // To Do
  {
    id: 'task1',
    title: 'Finalize Q3 budget report',
    status: 'todo',
    dueDate: '2023-10-26',
    assignees: [users.user1],
    categoryColor: 'red',
  },
  {
    id: 'task2',
    title: 'Develop new landing page',
    status: 'todo',
    dueDate: '2023-10-28',
    assignees: [users.user2, users.user3],
    categoryColor: 'yellow',
  },
  {
    id: 'task3',
    title: 'User authentication flow',
    status: 'todo',
    dueDate: '2023-11-02',
    assignees: [users.user1],
    categoryColor: 'yellow',
  },
  {
    id: 'task4',
    title: 'Draft marketing copy',
    status: 'todo',
    dueDate: '2023-11-05',
    assignees: [users.user4],
    categoryColor: 'green',
  },
  // In Progress
  {
    id: 'task5',
    title: 'API Integration for payments',
    status: 'in-progress',
    dueDate: '2023-10-25',
    assignees: [users.user2],
    categoryColor: 'red',
  },
  {
    id: 'task6',
    title: 'QA Testing for mobile app',
    status: 'in-progress',
    dueDate: '2023-10-30',
    assignees: [users.user3, users.user4],
    categoryColor: 'yellow',
  },
  // Completed
  {
    id: 'task7',
    title: 'Onboarding flow design',
    status: 'completed',
    completedDate: '2023-10-15',
    assignees: [],
    categoryColor: 'blue',
  },
  {
    id: 'task8',
    title: 'Setup database schema',
    status: 'completed',
    completedDate: '2023-10-12',
    assignees: [],
    categoryColor: 'blue',
  },
    {
    id: 'task9',
    title: 'Initial project setup',
    status: 'completed',
    completedDate: '2023-10-10',
    assignees: [],
    categoryColor: 'blue',
  },
    {
    id: 'task10',
    title: 'Review wireframes',
    status: 'completed',
    completedDate: '2023-10-09',
    assignees: [],
    categoryColor: 'blue',
  },
    {
    id: 'task11',
    title: 'Kick-off meeting notes',
    status: 'completed',
    completedDate: '2023-10-05',
    assignees: [],
    categoryColor: 'blue',
  },
];