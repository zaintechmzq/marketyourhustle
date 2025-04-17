import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase/config';

interface BasicRouteProps {
  children: React.ReactNode;
}

const BasicRoute: React.FC<BasicRouteProps> = ({ children }) => {
  const location = useLocation();
  const storedEmail = localStorage.getItem('userEmail');
  
  // Allow access if user has basic access (email) or is fully authenticated
  if (storedEmail || auth.currentUser) {
    return <>{children}</>;
  }

  // Redirect to landing page if no access
  return <Navigate to="/" state={{ from: location.pathname }} replace />;
};

export default BasicRoute; 