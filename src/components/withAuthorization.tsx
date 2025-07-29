import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';

interface WithAuthorizationProps {
  allowedRoles: UserRole[];
}

const withAuthorization = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAuthorization: React.FC<P & WithAuthorizationProps> = ({ allowedRoles, ...props }) => {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
      if (user.role === 'patient') {
        return <Navigate to="/patient-landing" replace />;
      }
      return <Navigate to="/unauthorized" replace />;
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return WithAuthorization;
};

export default withAuthorization;
