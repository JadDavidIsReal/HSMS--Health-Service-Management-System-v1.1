import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const PatientLanding: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome, {user?.name}!</h1>
        <p className="text-xl font-medium text-foreground mt-2">
          This is your personal health services portal.
        </p>
        <div className="mt-6 space-x-4">
          <Link to="/book-appointment" className="bg-primary text-primary-foreground px-6 py-2 rounded-md">
            Book an Appointment
          </Link>
          <Link to="/about" className="border border-border px-6 py-2 rounded-md">
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientLanding;
