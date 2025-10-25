import React, { useState, useEffect } from "react";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { AdminHeader } from "../components/admin/AdminHeader";
import { UsersTable } from "../components/admin/UsersTable";
import { AddUserModal } from "../components/admin/AddUserModal";
import { TeamsSection } from "@/components/admin/TeamSection";
import { db } from "../firebase"; // ✅ Import Firestore instance
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Member" | "Team Lead";
  avatar: string;
  joinDate: string;
  status: "active" | "inactive";
  division: string;
  specialty: string;
  password?: string;
}

export const UserTeamManagementPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"users" | "teams">("users");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  // ✅ Fetch users in realtime from Firestore
  useEffect(() => {
    const q = query(collection(db, "Users"), orderBy("joinDate", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedUsers: User[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];

      setUsers(fetchedUsers);
    });

    // Cleanup listener
    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // ✅ Add a new user to Firestore
  const handleAddUser = async (userData: Omit<User, "id">) => {
    try {
      await addDoc(collection(db, "Users"), {
        ...userData,
        joinDate: new Date().toISOString().split("T")[0],
      });
      setShowAddUserModal(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // ✅ Delete a user from Firestore
  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteDoc(doc(db, "Users", userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-30
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <AdminSidebar onClose={closeSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onMenuToggle={toggleSidebar} />

        <main className="flex-1 p-6 overflow-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              User & Team Management
            </h1>
            <p className="text-gray-600">
              Manage users and teams across the platform.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("users")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "users"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Manage Users
                </button>
                <button
                  onClick={() => setActiveTab("teams")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "teams"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Manage Teams
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          {activeTab === "users" ? (
            <UsersTable
              users={users}
              onAddUser={() => setShowAddUserModal(true)}
              onDeleteUser={handleDeleteUser}
            />
          ) : (
            <TeamsSection />
          )}
        </main>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <AddUserModal
          onClose={() => setShowAddUserModal(false)}
          onSave={handleAddUser}
        />
      )}
    </div>
  );
};
