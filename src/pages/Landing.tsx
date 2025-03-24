import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  useTheme,
  useMediaQuery,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    localStorage.setItem('userEmail', email);
    navigate('/home');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, sm: 6 },
              borderRadius: 4,
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                mb: 3,
              }}
            >
              Market Your Hustle
            </Typography>
            
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Discover Success Stories from Real Entrepreneurs
            </Typography>

            <Typography
              variant="body1"
              sx={{ mb: 4, color: 'text.secondary' }}
            >
              Join our community of entrepreneurs and get access to inspiring stories, 
              practical tips, and valuable insights to grow your business.
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Enter your email"
                variant="outlined"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                error={!!error}
                helperText={error}
                sx={{ mb: 3 }}
              />
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                }}
              >
                Get Started
              </Button>
            </form>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 3 }}
            >
              By signing up, you agree to our Terms of Service and Privacy Policy
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Landing; 