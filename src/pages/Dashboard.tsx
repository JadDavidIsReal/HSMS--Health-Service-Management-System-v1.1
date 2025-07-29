import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockAppointments } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const recentConsultations = mockAppointments
    .filter(a => a.status === 'Completed')
    .slice(0, 3);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user?.name}!</p>

      {user?.role === 'nurse' && (
        <div>
          <h2 className="text-xl font-bold mt-4">Nurse Dashboard</h2>

          {/* Walk-in/Scheduled Consultations */}
          <div className="mt-4">
            <h3 className="text-lg font-bold">Walk-in/Scheduled Consultations</h3>
            {/* This would typically be a list of appointments for the day */}
            <p>Today's appointments will be displayed here.</p>
          </div>

          {/* Referred Consultations */}
          <div className="mt-4">
            <h3 className="text-lg font-bold">Referred Consultations</h3>
            {/* This would be a list of appointments referred by doctors */}
            <p>Referred consultations will be displayed here.</p>
          </div>

          {/* Recent Consultations */}
          <div className="mt-4">
            <h3 className="text-lg font-bold">Recent Consultations</h3>
            <ul>
              {recentConsultations.map(consultation => (
                <li key={consultation.id}>
                  {consultation.patientName} - {consultation.date}
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Button */}
          <div className="mt-4">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
              Chat
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search for patients..."
              className="border border-border rounded-md px-4 py-2 w-full"
            />
          </div>
        </div>
      )}

      {user?.role === 'doctor' && (
        <div>
          <h2 className="text-xl font-bold mt-4">Doctor Dashboard</h2>
          {/* Same structure as Nurse */}
          <div className="mt-4">
            <h3 className="text-lg font-bold">Consultations</h3>
            <p>Today's appointments will be displayed here.</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold">Referred Consultations</h3>
            <p>Referred consultations will be displayed here.</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold">Recent Consultations</h3>
            <ul>
              {recentConsultations.map(consultation => (
                <li key={consultation.id}>
                  {consultation.patientName} - {consultation.date}
                </li>
              ))}
            </ul>
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search for patients..."
              className="border border-border rounded-md px-4 py-2 w-full"
            />
          </div>
        </div>
      )}

      {user?.role === 'patient' && (
        <div>
          <h2 className="text-xl font-bold mt-4">Patient Dashboard</h2>
          <div className="mt-4">
            <h3 className="text-lg font-bold">Your Profile</h3>
            <p>View your profile information here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;