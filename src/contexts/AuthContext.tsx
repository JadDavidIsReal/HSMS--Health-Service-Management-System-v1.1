import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockPatients, Patient, mockAppointments, Appointment } from '../data/mockData';

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
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  signup: (name: string, email: string, password: string) => Promise<User | null>;
  createPatientByNurse: (name: string, email: string) => Promise<Patient | null>;
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
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  useEffect(() => {
    const savedUser = localStorage.getItem('hsms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const [credentials, setCredentials] = useState(mockCredentials);

  const login = async (email: string, password: string): Promise<User | null> => {
    const credential = credentials.find(c => c.email === email && c.password === password);
    if (credential) {
      const userData = users.find(u => u.email === email);
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

  const signup = async (name: string, email: string, password: string): Promise<User | null> => {
    if (users.find(u => u.email === email)) {
      // User already exists
      return null;
    }

    const newUserId = (users.length + 1).toString();
    const newUser: User = { id: newUserId, name, email, role: 'patient' };
    const newPatient: Patient = {
      id: newUserId,
      name,
      email,
      age: 0, // Placeholder
      gender: 'Other', // Placeholder
      contact: '', // Placeholder
      emergencyContact: '', // Placeholder
      medicalHistory: [],
      profileComplete: false,
    };

    setUsers(prev => [...prev, newUser]);
    setPatients(prev => [...prev, newPatient]);
    setCredentials(prev => [...prev, { email, password }]);

    // Automatically log in the new user
    setUser(newUser);
    localStorage.setItem('hsms_user', JSON.stringify(newUser));

    return newUser;
  };

  const createPatientByNurse = async (name: string, email: string): Promise<Patient | null> => {
    if (users.find(u => u.email === email)) {
      return null; // Already exists
    }
    const newUserId = (users.length + 1).toString();
    const tempPassword = Math.random().toString(36).slice(-8); // Generate random password

    const newUser: User = { id: newUserId, name, email, role: 'patient' };
    const newPatient: Patient = {
      id: newUserId,
      name,
      email,
      age: 0,
      gender: 'Other',
      contact: '',
      emergencyContact: '',
      medicalHistory: [],
      profileComplete: false,
    };

    setUsers(prev => [...prev, newUser]);
    setPatients(prev => [...prev, newPatient]);
    setCredentials(prev => [...prev, { email, password: tempPassword }]);

    // Maybe log the temp password for the nurse to see?
    console.log(`Created new patient ${name} with temporary password: ${tempPassword}`);

    return newPatient;
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    patients,
    setPatients,
    appointments,
    setAppointments,
    signup,
    createPatientByNurse,
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