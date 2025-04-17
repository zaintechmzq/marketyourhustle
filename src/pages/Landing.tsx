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
  Grid,
  Chip,
  Stack
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon,
  MonetizationOn as MonetizationOnIcon,
  Group as GroupIcon,
  Lightbulb as LightbulbIcon,
  Assignment as AssignmentIcon,
  Chat as ChatIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const Landing = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <MonetizationOnIcon color="primary" sx={{ fontSize: 40 }} />,
      title: "Real Success Stories",
      description: "Learn from Muslim entrepreneurs who've built 6-7 figure businesses from scratch."
    },
    {
      icon: <GroupIcon color="primary" sx={{ fontSize: 40 }} />,
      title: "Exclusive Community",
      description: "Connect with like-minded entrepreneurs, share insights, and grow together."
    },
    {
      icon: <LightbulbIcon color="primary" sx={{ fontSize: 40 }} />,
      title: "Practical Resources",
      description: "Access proven business templates, guides, and strategies."
    }
  ];

  const testimonials = [
    {
      quote: "This platform helped me turn my side hustle into a $25K/month business.",
      author: "Ahmed S., Luxury Home Services"
    },
    {
      quote: "The community insights were invaluable in scaling my business.",
      author: "Fatima R., Event Planning"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    try {
      setIsSubmitting(true);
      const docRef = await addDoc(collection(db, 'emailEntries'), {
        email,
        createdAt: serverTimestamp(),
        userAgent: navigator.userAgent,
        hasFullAccess: false
      });
      localStorage.setItem('userEmail', email);
      navigate('/home', { replace: true });
    } catch (err) {
      console.error('Error saving email:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
        py: { xs: 3, sm: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 'auto' }
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Hero Section */}
        <Grid 
          container 
          spacing={{ xs: 4, sm: 5, md: 6 }} 
          sx={{ 
            alignItems: 'center',
            mb: { xs: 4, sm: 5, md: 8 }
          }}
        >
          {/* Left Side - Hero Content */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? -20 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3.75rem' },
                    fontWeight: 800,
                    mb: { xs: 2, sm: 3 },
                    color: '#fff',
                    lineHeight: { xs: 1.3, md: 1.2 }
                  }}
                >
                  Turn Your Skills Into A{' '}
                  <span style={{ color: '#FF7F50', display: 'inline-block' }}>Thriving Business</span>
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    mb: { xs: 3, sm: 4 },
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
                  }}
                >
                  Join thousands of Muslim entrepreneurs who've built successful service-based businesses. Get access to real success stories, practical resources, and a supportive community.
                </Typography>

                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={{ xs: 1.5, sm: 2 }} 
                  sx={{ mb: { xs: 3, sm: 4 } }}
                >
                  <Chip 
                    icon={<TrendingUpIcon />} 
                    label="150+ Success Stories" 
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.9)', 
                      fontWeight: 500,
                      py: { xs: 1.25, sm: 1.5 },
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      '& .MuiChip-icon': {
                        fontSize: { xs: '1.2rem', sm: '1.4rem' }
                      }
                    }}
                  />
                  <Chip 
                    icon={<GroupIcon />} 
                    label="5,000+ Members" 
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.9)', 
                      fontWeight: 500,
                      py: { xs: 1.25, sm: 1.5 },
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      '& .MuiChip-icon': {
                        fontSize: { xs: '1.2rem', sm: '1.4rem' }
                      }
                    }}
                  />
                </Stack>

                <Paper
                  component="form"
                  onSubmit={handleSubmit}
                  elevation={3}
                  sx={{
                    p: { xs: 1.5, sm: 2, md: 2.5 },
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1.5, sm: 2 },
                    maxWidth: 500,
                    borderRadius: { xs: 2, sm: 3 },
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Enter your email to get started"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    error={!!error}
                    helperText={error}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'white',
                      }
                    }}
                  />
                  <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      sx={{
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1, sm: 1.5 },
                        whiteSpace: 'nowrap',
                        minWidth: { xs: '100%', sm: 'auto' }
                      }}
                    >
                      {isSubmitting ? 'Please wait...' : 'Get Started'}
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate('/auth')}
                      sx={{
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1, sm: 1.5 },
                        whiteSpace: 'nowrap',
                        minWidth: { xs: '100%', sm: 'auto' }
                      }}
                    >
                      Sign In
                    </Button>
                  </Box>
                </Paper>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    color: 'rgba(255, 255, 255, 0.7)',
                    textAlign: 'center'
                  }}
                >
                  Join 6,000+ entrepreneurs who receive our weekly insights.
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* Right Side - Features */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Grid container spacing={{ xs: 2, sm: 3 }}>
                {features.map((feature, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper
                      sx={{
                        p: { xs: 2.5, sm: 3.5 },
                        height: '100%',
                        borderRadius: { xs: 2, sm: 3 },
                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 2, sm: 2.5 } }}>
                        <Box 
                          sx={{ 
                            color: '#FF7F50',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {React.cloneElement(feature.icon, { 
                            sx: { fontSize: { xs: 36, sm: 44 } },
                            color: 'inherit'
                          })}
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: { xs: 0.5, sm: 1 },
                              color: 'text.primary',
                              fontSize: { xs: '1.1rem', sm: '1.25rem' }
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: 'text.secondary',
                              lineHeight: 1.6,
                              fontSize: { xs: '0.9rem', sm: '1rem' }
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>
        </Grid>

        {/* Testimonials Section */}
        <Box>
          <Grid container spacing={{ xs: 3, sm: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Paper
                    sx={{
                      p: { xs: 3, sm: 4 },
                      borderRadius: { xs: 2, sm: 3 },
                      bgcolor: 'rgba(255, 255, 255, 0.95)',
                      height: '100%',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        mb: { xs: 2, sm: 2.5 },
                        fontStyle: 'italic',
                        color: 'text.primary',
                        fontSize: { xs: '1.1rem', sm: '1.2rem' },
                        lineHeight: 1.6
                      }}
                    >
                      "{testimonial.quote}"
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        fontSize: { xs: '0.85rem', sm: '0.95rem' }
                      }}
                    >
                      {testimonial.author}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Landing; 