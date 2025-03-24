import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, IconButton, useTheme, useMediaQuery, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { TrendingUp as TrendingUpIcon, AccessTime as AccessTimeIcon, 
  Business as BusinessIcon, Group as GroupIcon, 
  Lightbulb as LightbulbIcon, Speed as SpeedIcon,
  ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Import local images
import qawahHouseImg from '../assets/images/qawahhouse.jpg';
import qamariaImg from '../assets/images/qamaria.png';
import halalGuysImg from '../assets/images/THE-HALAL-GUYS.jpg';

const featuredStories = [
  {
    id: 1,
    title: "Qahwah House: A Heritage Brewed Over Generations",
    category: "Food & Beverage",
    image: qawahHouseImg,
    excerpt: "How Ibrahim Alhasbani brought 500-year-old Yemeni coffee tradition to America...",
    revenue: "$100,000+",
    readTime: "12 min read",
    featured: true,
    path: "/learn/articles/qahwah-house"
  },
  {
    id: 2,
    title: "The Halal Guys: From Cart to Global Empire",
    category: "Food & Beverage",
    image: halalGuysImg,
    excerpt: "Three Egyptian immigrants turned a NYC food cart into a global halal phenomenon...",
    revenue: "$2M+",
    readTime: "15 min read",
    featured: true,
    path: "/learn/articles/halal-guys"
  },
  {
    id: 3,
    title: "Building a Modern Coffee Experience",
    category: "Food & Beverage",
    image: qamariaImg,
    excerpt: "How Qamaria Coffee is revolutionizing the coffee scene with a blend of tradition and innovation...",
    revenue: "$50,000+",
    readTime: "10 min read",
    featured: true,
    path: "/learn/articles/qamaria"
  }
];

const categories = [
  { name: 'Food & Beverage', icon: <BusinessIcon />, count: 12 },
  { name: 'Wedding Services', icon: <GroupIcon />, count: 8 },
  { name: 'Creative Services', icon: <LightbulbIcon />, count: 15 },
  { name: 'Photography', icon: <SpeedIcon />, count: 10 },
];

const StyledCard = styled(RouterLink)<LinkProps>(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  textDecoration: 'none',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const MotionBox = motion(Box);

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                    color: 'text.primary',
                  }}
                >
                  Unlock the secrets to 7-figure online businesses
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                  }}
                >
                  Dive into our database of case studies & join our community of thousands of successful founders.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={RouterLink}
                    to="/learn/articles"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    Read Success Stories
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/community"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': {
                        borderColor: 'primary.dark',
                        bgcolor: 'primary.light',
                      },
                    }}
                  >
                    Join Community
                  </Button>
                </Box>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)',
                    borderRadius: '20px',
                    zIndex: 1,
                  },
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                  alt="Business Success"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: 600,
                    display: 'block',
                    margin: '0 auto',
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                />
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            mb: 6,
          }}
        >
          Explore Stories by Category
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.name}>
              <Card
                component={RouterLink}
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {category.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.count} stories
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Stories Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Featured Success Stories
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            See exactly how these businesses went from zero to millions
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Qahwah House */}
          <Grid item xs={12} md={4}>
            <StyledCard to="/learn/articles/qahwah-house">
              <Card>
                <CardMedia
                  component="img"
                  height="240"
                  image={qawahHouseImg}
                  alt="Qahwah House"
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Qahwah House
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Founder: Ibrahim Alhasbani
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Bringing 500-year-old Yemeni coffee tradition to the U.S., Qahwah House has grown from a single location in Dearborn to multiple locations across the country.
                  </Typography>
                  <Button variant="outlined" color="primary" fullWidth>
                    Read Full Story
                  </Button>
                </CardContent>
              </Card>
            </StyledCard>
          </Grid>

          {/* Qamaria */}
          <Grid item xs={12} md={4}>
            <StyledCard to="/learn/articles/qamaria">
              <Card>
                <CardMedia
                  component="img"
                  height="240"
                  image={qamariaImg}
                  alt="Qamaria Yemeni Coffee Co."
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Qamaria Yemeni Coffee Co.
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Founder: Hatem Al-Eidaroos
                  </Typography>
                  <Typography variant="body1" paragraph>
                    A fast-scaling, modern Yemeni coffee shop capturing national buzz with its unique blend of traditional Yemeni coffee and contemporary café culture.
                  </Typography>
                  <Button variant="outlined" color="primary" fullWidth>
                    Read Full Story
                  </Button>
                </CardContent>
              </Card>
            </StyledCard>
          </Grid>

          {/* Halal Guys */}
          <Grid item xs={12} md={4}>
            <StyledCard to="/learn/articles/halal-guys">
              <Card>
                <CardMedia
                  component="img"
                  height="240"
                  image={halalGuysImg}
                  alt="The Halal Guys"
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    The Halal Guys
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Founders: Mohamed Abouelenein, Ahmed Elsaka, and Abdelbaset Elsayed
                  </Typography>
                  <Typography variant="body1" paragraph>
                    From a humble food cart to a global fast-casual empire, The Halal Guys have revolutionized halal street food in America.
                  </Typography>
                  <Button variant="outlined" color="primary" fullWidth>
                    Read Full Story
                  </Button>
                </CardContent>
              </Card>
            </StyledCard>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button
            component={RouterLink}
            to="/learn/articles"
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
          >
            View All Stories
          </Button>
        </Box>
      </Container>

      {/* Newsletter Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ pr: { md: 4 } }}>
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    lineHeight: 1.2,
                  }}
                >
                  Want to discover ideas that actually make money?
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  paragraph
                  sx={{ fontSize: '1.1rem', mb: 3 }}
                >
                  Get our 5-minute email newsletter packed with business ideas and money-making opportunities, backed by real-life case studies.
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 4, 
                    fontStyle: 'italic',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <TrendingUpIcon sx={{ color: 'primary.main' }} />
                  It's free and read by 200,000+ founders
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    Subscribe Now
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': {
                        borderColor: 'primary.dark',
                        bgcolor: 'primary.light',
                      },
                    }}
                  >
                    View Past Issues
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)',
                    borderRadius: '20px',
                    zIndex: 1,
                  },
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80"
                  alt="Newsletter Preview"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: 500,
                    display: 'block',
                    margin: '0 auto',
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                />
              </MotionBox>
            </Grid>
          </Grid>
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