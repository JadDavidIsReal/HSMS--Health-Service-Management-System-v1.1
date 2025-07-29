import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'nurse' | 'doctor' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock credentials
const mockUsers: User[] = [
  { id: '1', name: 'Sarah Johnson', email: 'nurse@clinic.edu', role: 'nurse' },
  { id: '2', name: 'Dr. Michael Chen', email: 'doctor@clinic.edu', role: 'doctor' },
  { id: '3', name: 'Alex Smith', email: 'student@clinic.edu', role: 'patient' },
];

const mockCredentials = [
  { email: 'nurse@clinic.edu', password: 'nurse123' },
  { email: 'doctor@clinic.edu', password: 'doctor123' },
  { email: 'student@clinic.edu', password: 'student123' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('hsms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    const credential = mockCredentials.find(c => c.email === email && c.password === password);
    if (credential) {
      const userData = mockUsers.find(u => u.email === email);
      if (userData) {
        setUser(userData);
        localStorage.setItem('hsms_user', JSON.stringify(userData));
        return userData;
      }
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hsms_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};