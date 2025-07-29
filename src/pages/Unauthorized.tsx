import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-destructive">403</h1>
        <p className="text-xl font-medium text-foreground mt-2">Unauthorized</p>
        <p className="text-muted-foreground mt-2">
          You do not have permission to access this page.
        </p>
        <Link to="/dashboard" className="mt-6 inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
