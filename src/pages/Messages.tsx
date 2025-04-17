import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Messages from '../components/Messaging/Messages';

const MessagesPage: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 2, height: '100%' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Messages
      </Typography>
      <Box sx={{ height: 'calc(100vh - 180px)' }}>
        <Messages />
      </Box>
    </Container>
  );
};

export default MessagesPage; 