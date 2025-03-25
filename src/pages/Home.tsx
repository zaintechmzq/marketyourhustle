import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, TextField, Divider, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  TrendingUp as TrendingUpIcon, 
  AccessTime as AccessTimeIcon,
  MonetizationOn as MonetizationOnIcon,
  Business as BusinessIcon,
  Store as StoreIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link as RouterLink } from 'react-router-dom';

// Import local images
import qawahHouseImg from '../assets/images/qawahhouse.jpg';
import qamariaImg from '../assets/images/qamaria.png';
import halalGuysImg from '../assets/images/THE-HALAL-GUYS.jpg';

const MotionBox = motion(Box);

const Home = () => {
  const featuredStories = [
    {
      title: "Qahwah House",
      description: "Modern coffee experience with traditional roots",
      image: qawahHouseImg,
      path: "/learn/articles/qahwah-house",
      readTime: "10 min read",
      revenue: "$50,000+"
    },
    {
      title: "Qamaria",
      description: "Middle Eastern coffee culture reimagined",
      image: qamariaImg,
      path: "/learn/articles/qamaria",
      readTime: "8 min read",
      revenue: "$40,000+"
    },
    {
      title: "The Halal Guys",
      description: "From food cart to global franchise",
      image: halalGuysImg,
      path: "/learn/articles/halal-guys",
      readTime: "12 min read",
      revenue: "$100,000+"
    },
    {
      title: "Halal Food Cart",
      description: "Street food success story",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80",
      path: "/learn/articles/halal-food-cart",
      readTime: "6 min read",
      revenue: "$30,000+"
    },
    {
      title: "Islamic Fashion",
      description: "Modern modest fashion brand",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80",
      path: "/learn/articles/islamic-fashion",
      readTime: "9 min read",
      revenue: "$45,000+"
    },
    {
      title: "Halal Tech",
      description: "Muslim-focused tech solutions",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
      path: "/learn/articles/halal-tech",
      readTime: "11 min read",
      revenue: "$75,000+"
    },
    {
      title: "Islamic Finance",
      description: "Sharia-compliant financial services",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
      path: "/learn/articles/islamic-finance",
      readTime: "7 min read",
      revenue: "$60,000+"
    },
    {
      title: "Halal Travel",
      description: "Muslim-friendly travel platform",
      image: "https://images.unsplash.com/photo-1437846972679-9e6e537be46e?auto=format&fit=crop&q=80",
      path: "/learn/articles/halal-travel",
      readTime: "10 min read",
      revenue: "$55,000+"
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.paper', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ 
        py: { xs: 8, md: 12 },
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Container maxWidth="md">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ textAlign: 'center' }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 3,
                color: 'text.primary'
              }}
            >
              💵 Market Your Hustle
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                fontWeight: 400
              }}
            >
              Discover successful Muslim-owned businesses and learn how they built their empires
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Enter your email"
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        bgcolor: 'background.paper',
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    size="large"
                    sx={{ 
                      height: '56px',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    Subscribe
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <GroupIcon sx={{ fontSize: 20 }} />
              Join 5,000+ Muslim entrepreneurs
            </Typography>
          </MotionBox>
        </Container>
      </Box>

      {/* Featured Stories */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4,
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          Featured Success Stories
        </Typography>

        <Grid container spacing={3}>
          {featuredStories.map((story, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                component={RouterLink} 
                to={story.path}
                sx={{ 
                  p: 2,
                  display: 'block',
                  textDecoration: 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: 'divider',
                  height: '100%'
                }}
              >
                <Box
                  component="img"
                  src={story.image}
                  alt={story.title}
                  sx={{
                    width: '100%',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    mb: 2
                  }}
                />
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary',
                    fontSize: '1rem',
                    mb: 1
                  }}
                >
                  {story.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 2,
                    fontSize: '0.875rem'
                  }}
                >
                  {story.description}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2,
                  alignItems: 'center',
                  color: 'text.secondary',
                  fontSize: '0.75rem'
                }}>
                  <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <MonetizationOnIcon sx={{ fontSize: 14 }} />
                    {story.revenue}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 14 }} />
                    {story.readTime}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Newsletter Section */}
      <Box sx={{ 
        py: 8,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 2,
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              Want to discover ideas that actually make money?
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4,
                color: 'text.secondary'
              }}
            >
              Join our newsletter and get weekly insights from successful Muslim entrepreneurs
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  variant="outlined"
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      bgcolor: 'background.paper',
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  sx={{ 
                    height: '56px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontSize: '1rem'
                  }}
                >
                  Subscribe
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'black', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2" paragraph>
                We're building the first Muslim-centered business storytelling platform—just like Starter Story, but tailored for us.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton color="inherit">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="inherit">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="inherit">
                  <InstagramIcon />
                </IconButton>
                <IconButton color="inherit">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Button 
                    component={RouterLink}
                    to="/learn/articles"
                    color="inherit"
                    sx={{ textTransform: 'none', p: 0 }}
                  >
                    Success Stories
                  </Button>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Button
                    component={RouterLink}
                    to="/community"
                    color="inherit"
                    sx={{ textTransform: 'none', p: 0 }}
                  >
                    Community
                  </Button>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Button
                    component={RouterLink}
                    to="/learn"
                    color="inherit"
                    sx={{ textTransform: 'none', p: 0 }}
                  >
                    Resources
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" paragraph>
                Have questions or want to share your story?
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ mt: 2 }}
              >
                Get in Touch
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Market Your Hustle. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 