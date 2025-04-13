import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  useTheme,
  Divider,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/config';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Update profile with name
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }
      
      // Get the return URL from location state or default to home
      const from = (location.state as any)?.from || '/home';
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // If this is a new user (no display name), prompt for name
      if (!result.user.displayName) {
        const name = prompt('Please enter your name:');
        if (name) {
          await updateProfile(result.user, {
            displayName: name
          });
        }
      }
      
      const from = (location.state as any)?.from || '/home';
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setError(err.message || 'An error occurred with Google sign in.');
    }
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
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 2 }}
                  disabled={isSubmitting}
                  required
                />
              )}
              
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
                disabled={isSubmitting}
                required
              />
              
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
                disabled={isSubmitting}
                required
              />
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                }}
              >
                {isSubmitting ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>

            <Divider sx={{ my: 3 }}>or</Divider>

            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={handleGoogleSignIn}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              }}
            >
              Continue with Google
            </Button>

            <Typography
              variant="body1"
              sx={{ mt: 3, color: 'text.secondary' }}
            >
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <Button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setName(''); // Clear name when switching modes
                }}
                sx={{
                  textTransform: 'none',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    background: 'transparent',
                  },
                }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Button>
            </Typography>

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

export default Auth; 