import React, { createContext, useState, useEffect, ReactNode } from 'react';
// Mock user type. In a real app, this might come from firebase/auth.
type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  // login, logout functions would be here
}

export const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mocking auth state check
    const timeout = setTimeout(() => {
      // To test the app with auth, change this to a mock user object
      // e.g., setUser({ uid: '123', email: 'test@test.com', displayName: 'Test User' });
      // To test the login page, leave it as null
       setUser(null); // Mock as logged out
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const value = {
    user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};