import React, { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { createUserProfile } from '../utils/userProfile';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Card, 
  CardContent,
  Alert,
  CircularProgress,
  Grid,
  Divider
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored email from landing page
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }

    // Set initial isSignUp state from location state
    const state = location.state as { isSignUp?: boolean; from?: string };
    if (state?.isSignUp !== undefined) {
      setIsSignUp(state.isSignUp);
    }
  }, [location]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // Get the return path from location state, default to home
        const state = location.state as { from?: string };
        const returnTo = state?.from || '/home';
        navigate(returnTo, { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const displayName = `${firstName} ${lastName}`.trim();
        
        // Update the user's display name
        await updateProfile(userCredential.user, {
          displayName: displayName
        });

        // Create user profile with the full name
        await createUserProfile({
          uid: userCredential.user.uid,
          email: userCredential.user.email!,
          displayName: displayName,
          photoURL: userCredential.user.photoURL,
          hasFullAccess: true // Mark as full access user
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Welcome back, {user.displayName || user.email}!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            You now have full access to all features.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/home')}
            fullWidth
            sx={{ mb: 1 }}
          >
            Go to Home
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={() => signOut(auth)}
            fullWidth
          >
            Sign Out
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {isSignUp ? 'Create Full Account' : 'Welcome Back'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {isSignUp 
            ? 'Create a full account to access all features including messaging, community, and tools.' 
            : 'Sign in to access your full account features.'}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleAuth} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {isSignUp && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          )}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            disabled={!!localStorage.getItem('userEmail')}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={loading}
            fullWidth
            sx={{ mt: 1 }}
          >
            {loading ? <CircularProgress size={24} /> : (isSignUp ? 'Create Account' : 'Sign In')}
          </Button>
          <Divider sx={{ my: 1 }}>or</Divider>
          <Button 
            variant="outlined" 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setFirstName('');
              setLastName('');
            }}
            fullWidth
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Auth; 