import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockPatients } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const PatientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const patient = mockPatients.find(p => p.id === id);

  const [nursesNotes, setNursesNotes] = useState('Initial nurse notes.');
  const [doctorsNotes, setDoctorsNotes] = useState('Initial doctor notes.');

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{patient.name}</h1>
      <div className="mt-4">
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Address:</strong> {patient.emergencyContact}</p>
        <p><strong>Contact Number:</strong> {patient.contact}</p>
        <p><strong>Date of Birth:</strong> {patient.age}</p>
        <p><strong>Civil Status:</strong> Single</p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Nurse's Notes</h2>
        {user?.role === 'nurse' ? (
          <textarea
            className="w-full border border-border rounded-md p-2"
            value={nursesNotes}
            onChange={(e) => setNursesNotes(e.target.value)}
          />
        ) : (
          <p>{nursesNotes}</p>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Doctor's Notes</h2>
        {user?.role === 'doctor' ? (
          <textarea
            className="w-full border border-border rounded-md p-2"
            value={doctorsNotes}
            onChange={(e) => setDoctorsNotes(e.target.value)}
          />
        ) : (
          <p>{doctorsNotes}</p>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
