import React, { useState } from 'react';
import { mockPatients, Patient } from '../data/mockData';

const PatientRecords: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeletePatient = (patientId: string) => {
    setPatients(patients.filter(p => p.id !== patientId));
  };

  const handleSavePatient = (formData: any) => {
    if (isEditing && selectedPatient) {
      setPatients(patients.map(p =>
        p.id === selectedPatient.id
          ? { ...selectedPatient, ...formData }
          : p
      ));
    } else {
      const newPatient: Patient = {
        id: (patients.length + 1).toString(),
        medicalHistory: [],
        ...formData
      };
      setPatients([...patients, newPatient]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Patient Records</h1>
          <p className="text-gray-500">Manage patient information and medical records</p>
        </div>
        <button onClick={handleAddPatient} className="bg-pink-500 text-white px-4 py-2 rounded-md">
          Add Patient
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search patients by name, email, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="border rounded-md p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold">{patient.name}</h2>
                <p className="text-sm text-gray-500">
                  {patient.studentId ? `Student ID: ${patient.studentId}` : `Employee ID: ${patient.employeeId}`}
                </p>
              </div>
              <div className="flex space-x-1">
                <button onClick={() => handleEditPatient(patient)}>
                  Edit
                </button>
                <button onClick={() => handleDeletePatient(patient.id)}>
                  Delete
                </button>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold bg-gray-200 text-gray-800 px-2 py-1 rounded-full">{patient.gender}</span>
                <span className="text-xs font-semibold bg-gray-200 text-gray-800 px-2 py-1 rounded-full">{patient.age} years</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <span>{patient.contact}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="truncate">{patient.email}</span>
                </div>
              </div>
              {patient.medicalHistory.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-1">Medical History:</p>
                  <div className="space-y-1">
                    {patient.medicalHistory.slice(0, 2).map((history, index) => (
                      <p key={index} className="text-xs text-gray-500">{history}</p>
                    ))}
                    {patient.medicalHistory.length > 2 && (
                      <p className="text-xs text-gray-500">+{patient.medicalHistory.length - 2} more</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isDialogOpen && (
        <PatientDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSavePatient}
          patient={selectedPatient}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

interface PatientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  patient: Patient | null;
  isEditing: boolean;
}

const PatientDialog: React.FC<PatientDialogProps> = ({ isOpen, onClose, onSave, patient, isEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    email: '',
    studentId: '',
    employeeId: '',
    emergencyContact: '',
    medicalHistory: ''
  });

  React.useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name,
        age: patient.age.toString(),
        gender: patient.gender,
        contact: patient.contact,
        email: patient.email,
        studentId: patient.studentId || '',
        employeeId: patient.employeeId || '',
        emergencyContact: patient.emergencyContact,
        medicalHistory: patient.medicalHistory.join(', ')
      });
    } else {
      setFormData({
        name: '',
        age: '',
        gender: '',
        contact: '',
        email: '',
        studentId: '',
        employeeId: '',
        emergencyContact: '',
        medicalHistory: ''
      });
    }
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      age: parseInt(formData.age),
      medicalHistory: formData.medicalHistory.split(',').map(item => item.trim()).filter(item => item)
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold">{isEditing ? 'Edit Patient' : 'Add New Patient'}</h2>
        <p className="text-gray-500">{isEditing ? 'Update patient information' : 'Enter patient details to create a new record'}</p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="contact">Phone Number</label>
            <input
              id="contact"
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="studentId">Student ID</label>
              <input
                id="studentId"
                type="text"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="If student"
              />
            </div>
            <div>
              <label htmlFor="employeeId">Employee ID</label>
              <input
                id="employeeId"
                type="text"
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="If employee"
              />
            </div>
          </div>
          <div>
            <label htmlFor="emergencyContact">Emergency Contact</label>
            <input
              id="emergencyContact"
              type="text"
              value={formData.emergencyContact}
              onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="medicalHistory">Medical History</label>
            <textarea
              id="medicalHistory"
              value={formData.medicalHistory}
              onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Separate multiple entries with commas"
              rows={3}
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button type="submit" className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-md">
              {isEditing ? 'Update Patient' : 'Add Patient'}
            </button>
            <button type="button" onClick={onClose} className="flex-1 border border-gray-300 px-4 py-2 rounded-md">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRecords;