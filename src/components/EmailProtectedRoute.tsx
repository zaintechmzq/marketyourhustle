import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

interface EmailProtectedRouteProps {
  children: React.ReactNode;
}

const EmailProtectedRoute: React.FC<EmailProtectedRouteProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasEmail, setHasEmail] = useState(false);

  useEffect(() => {
    const checkEmail = () => {
      const email = localStorage.getItem('userEmail');
      setHasEmail(!!email);
      setIsLoading(false);
    };

    checkEmail();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!hasEmail) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default EmailProtectedRoute; 