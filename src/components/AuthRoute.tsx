import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthRouteProps {
  children: React.ReactNode;
  requireFirebaseAuth?: boolean;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children, requireFirebaseAuth = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      // Always check for email first
      const email = localStorage.getItem('userEmail');
      setHasEmail(!!email);

      // Only check Firebase auth if required
      if (requireFirebaseAuth) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setIsAuthenticated(!!user);
          setIsLoading(false);
        });
        return () => unsubscribe();
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [requireFirebaseAuth]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // For routes that require Firebase auth (community, profile, dashboard)
  if (requireFirebaseAuth) {
    if (!isAuthenticated) {
      // Redirect to auth page with return URL
      return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
    }
    return <>{children}</>;
  }

  // For all other routes (except landing page), require email
  if (location.pathname !== '/') {
    if (!hasEmail) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default AuthRoute; 