export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  email: string;
  studentId?: string;
  employeeId?: string;
  medicalHistory: string[];
  emergencyContact: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId?: string;
  doctorName?: string;
  date: string;
  time: string;
  type: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  medicine: string;
  dosage: string;
  instructions: string;
  date: string;
  duration: string;
}

export interface MedicalService {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  cost: number;
  available: boolean;
}

export interface Staff {
  id: string;
  name: string;
  role: 'Nurse' | 'Doctor' | 'Admin' | 'Receptionist';
  email: string;
  phone: string;
  department: string;
  joinDate: string;
}

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    age: 20,
    gender: 'Female',
    contact: '+1 (555) 123-4567',
    email: 'emma.wilson@university.edu',
    studentId: 'STU001',
    medicalHistory: ['Allergic to penicillin', 'Previous ankle injury'],
    emergencyContact: '+1 (555) 987-6543'
  },
  {
    id: '2',
    name: 'James Rodriguez',
    age: 22,
    gender: 'Male',
    contact: '+1 (555) 234-5678',
    email: 'james.rodriguez@university.edu',
    studentId: 'STU002',
    medicalHistory: ['Asthma', 'Seasonal allergies'],
    emergencyContact: '+1 (555) 876-5432'
  },
  {
    id: '3',
    name: 'Dr. Lisa Thompson',
    age: 35,
    gender: 'Female',
    contact: '+1 (555) 345-6789',
    email: 'lisa.thompson@university.edu',
    employeeId: 'EMP001',
    medicalHistory: ['Hypertension'],
    emergencyContact: '+1 (555) 765-4321'
  },
  {
    id: '4',
    name: 'Marcus Johnson',
    age: 19,
    gender: 'Male',
    contact: '+1 (555) 456-7890',
    email: 'marcus.johnson@university.edu',
    studentId: 'STU003',
    medicalHistory: ['No known allergies'],
    emergencyContact: '+1 (555) 654-3210'
  },
  {
    id: '5',
    name: 'Sophia Chang',
    age: 21,
    gender: 'Female',
    contact: '+1 (555) 567-8901',
    email: 'sophia.chang@university.edu',
    studentId: 'STU004',
    medicalHistory: ['Lactose intolerant', 'Previous concussion'],
    emergencyContact: '+1 (555) 543-2109'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Emma Wilson',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    date: '2024-01-15',
    time: '09:00',
    type: 'General Checkup',
    status: 'Confirmed',
    notes: 'Annual health screening'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'James Rodriguez',
    date: '2024-01-15',
    time: '10:30',
    type: 'Asthma Follow-up',
    status: 'Pending',
  },
  {
    id: '3',
    patientId: '4',
    patientName: 'Marcus Johnson',
    date: '2024-01-16',
    time: '14:00',
    type: 'Sports Physical',
    status: 'Confirmed',
  },
  {
    id: '4',
    patientId: '5',
    patientName: 'Sophia Chang',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    date: '2024-01-17',
    time: '11:15',
    type: 'Consultation',
    status: 'Completed',
    notes: 'Discussed nutrition and wellness'
  }
];

export const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    patientId: '2',
    patientName: 'James Rodriguez',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    medicine: 'Albuterol Inhaler',
    dosage: '2 puffs',
    instructions: 'Use as needed for asthma symptoms, up to 4 times daily',
    date: '2024-01-10',
    duration: '30 days'
  },
  {
    id: '2',
    patientId: '1',
    patientName: 'Emma Wilson',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    medicine: 'Ibuprofen',
    dosage: '200mg',
    instructions: 'Take with food, twice daily for 7 days',
    date: '2024-01-08',
    duration: '7 days'
  },
  {
    id: '3',
    patientId: '5',
    patientName: 'Sophia Chang',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    medicine: 'Vitamin D3',
    dosage: '1000 IU',
    instructions: 'Take once daily with breakfast',
    date: '2024-01-05',
    duration: '90 days'
  }
];

export const mockServices: MedicalService[] = [
  {
    id: '1',
    name: 'General Checkup',
    description: 'Comprehensive health examination including vital signs and basic assessments',
    duration: 30,
    cost: 0,
    available: true
  },
  {
    id: '2',
    name: 'Immunizations',
    description: 'Vaccination services including flu shots and required immunizations',
    duration: 15,
    cost: 25,
    available: true
  },
  {
    id: '3',
    name: 'Mental Health Consultation',
    description: 'Initial consultation with counseling services',
    duration: 60,
    cost: 0,
    available: true
  },
  {
    id: '4',
    name: 'Sports Physical',
    description: 'Physical examination required for athletic participation',
    duration: 45,
    cost: 30,
    available: true
  },
  {
    id: '5',
    name: 'Dental Cleaning',
    description: 'Basic dental hygiene and oral health examination',
    duration: 45,
    cost: 40,
    available: false
  },
  {
    id: '6',
    name: 'Allergy Testing',
    description: 'Comprehensive allergy testing and consultation',
    duration: 90,
    cost: 75,
    available: true
  }
];

export const mockStaff: Staff[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Nurse',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 111-2222',
    department: 'General Medicine',
    joinDate: '2022-03-15'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    role: 'Doctor',
    email: 'michael.chen@university.edu',
    phone: '+1 (555) 333-4444',
    department: 'Family Medicine',
    joinDate: '2021-08-01'
  },
  {
    id: '3',
    name: 'Rebecca Martinez',
    role: 'Receptionist',
    email: 'rebecca.martinez@university.edu',
    phone: '+1 (555) 555-6666',
    department: 'Administration',
    joinDate: '2023-01-10'
  },
  {
    id: '4',
    name: 'Dr. Amanda Foster',
    role: 'Doctor',
    email: 'amanda.foster@university.edu',
    phone: '+1 (555) 777-8888',
    department: 'Mental Health',
    joinDate: '2022-09-20'
  },
  {
    id: '5',
    name: 'Kevin Park',
    role: 'Admin',
    email: 'kevin.park@university.edu',
    phone: '+1 (555) 999-0000',
    department: 'IT Support',
    joinDate: '2023-05-12'
  }
];

export const dashboardStats = {
  nurse: {
    totalPatients: mockPatients.length,
    todayAppointments: mockAppointments.filter(apt => apt.date === '2024-01-15').length,
    pendingAppointments: mockAppointments.filter(apt => apt.status === 'Pending').length,
    activeStaff: mockStaff.length,
    availableServices: mockServices.filter(service => service.available).length,
    monthlyVisits: 89
  },
  doctor: {
    myAppointments: mockAppointments.filter(apt => apt.doctorId === '2').length,
    todayAppointments: mockAppointments.filter(apt => apt.date === '2024-01-15' && apt.doctorId === '2').length,
    prescriptionsWritten: mockPrescriptions.length,
    patientsThisMonth: 24
  },
  patient: {
    upcomingAppointments: mockAppointments.filter(apt => apt.patientId === '3' && apt.status !== 'Completed').length,
    activePrescriptions: mockPrescriptions.filter(presc => presc.patientId === '3').length,
    lastVisit: '2024-01-05',
    healthRecords: 3
  }
};