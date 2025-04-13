import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Messages from '../components/Messaging/Messages';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const MessagesPage: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, height: 'calc(100vh - 64px)' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Messages
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect and collaborate with other entrepreneurs in the community
        </Typography>
      </Box>
      <Box sx={{ height: 'calc(100% - 100px)' }}>
        <Messages />
      </Box>
    </Container>
  );
};

export default MessagesPage; 