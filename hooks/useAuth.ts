import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Define interfaces in a separate scope
export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Team Lead" | "Team Member";
  avatar: string;
  joinDate: string;
  status: "active" | "inactive";
  division: string;
  specialty: string;
  // Note: Password should not be stored in frontend user objects in production
}


export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Optional: Create a custom hook for role-based access