import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, Chip, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  TrendingUp as TrendingUpIcon, 
  AccessTime as AccessTimeIcon,
  MonetizationOn as MonetizationOnIcon,
  Business as BusinessIcon,
  Landscape as PicnicIcon,
  LocalFlorist as LocalFloristIcon,
  Star as StarIcon,
  Group as GroupIcon,
  CalendarToday as CalendarIcon,
  EmojiEvents as EmojiEventsIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const MotionBox = motion(Box);

const LuxuryPicnicSetup = () => {
  const businessMetrics = {
    monthlyRevenue: "$8,000+",
    startupCost: "$2,500 - $4,000",
    profitMargin: "70%",
    timeToProfit: "2-3 months"
  };

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
              How I Built an $8K/Month Luxury Picnic Setup Business
            </Typography>
            
            <Box sx={{ mb: 4, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Chip icon={<PicnicIcon />} label="Event Services" />
              <Chip icon={<LocalFloristIcon />} label="Luxury Events" />
              <Chip icon={<TrendingUpIcon />} label="Growing Trend" />
              <Chip icon={<StarIcon />} label="Premium Experience" />
            </Box>

            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                fontWeight: 400
              }}
            >
              An entrepreneur turned their passion for creating beautiful outdoor experiences into a thriving luxury picnic setup business. By offering turnkey picnic experiences with premium decor, gourmet food, and personalized touches, they've created a unique niche in the event industry.
            </Typography>

            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/community"
              sx={{ 
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Join Our Community
            </Button>
          </MotionBox>
        </Container>
      </Box>

      {/* Business Metrics */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <MonetizationOnIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom>Monthly Revenue</Typography>
                    <Typography variant="h4" color="primary">{businessMetrics.monthlyRevenue}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <BusinessIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom>Startup Cost</Typography>
                    <Typography variant="h4" color="primary">{businessMetrics.startupCost}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom>Profit Margin</Typography>
                    <Typography variant="h4" color="primary">{businessMetrics.profitMargin}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <CalendarIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom>Time to Profit</Typography>
                    <Typography variant="h4" color="primary">{businessMetrics.timeToProfit}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Main Content */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                The Backstory
              </Typography>
              <Typography paragraph>
                Sarah Martinez started her luxury picnic setup business after noticing a growing trend of people wanting to create Instagram-worthy outdoor experiences. She saw an opportunity to combine her love for event planning with the rising demand for unique outdoor gatherings.
              </Typography>
              <Typography paragraph>
                "The pandemic really changed how people think about social gatherings," Sarah explains. "People wanted to celebrate special moments outdoors, but they also wanted it to be beautiful and effortless. That's where we come in."
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                The Launch
              </Typography>
              <Typography paragraph>
                With an initial investment of $3,500, Sarah purchased premium picnic blankets, decorative pillows, wooden tables, lanterns, and other decorative elements. She started by offering basic picnic setups and gradually expanded to include gourmet food packages and additional services.
              </Typography>
              <Typography paragraph>
                "I focused on creating a signature style that would stand out on social media," Sarah shares. "Each setup is unique and tailored to the client's preferences, whether it's a romantic date night or a group celebration."
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Business Model & Operations
              </Typography>
              <Typography paragraph>
                The business offers three main packages: Intimate Setup ($250), Group Celebration ($500), and Luxury Experience ($1,000). Each package includes different levels of decor, food options, and additional services like setup and cleanup.
              </Typography>
              <Typography paragraph>
                "We handle everything from location scouting to cleanup," Sarah explains. "Our clients just need to show up and enjoy their experience. We even provide a detailed guide for the best photo spots and timing for perfect lighting."
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Scaling & Growth
              </Typography>
              <Typography paragraph>
                Within three months, Sarah had a full schedule of weekend bookings and began hiring additional setup assistants. By the end of her first year, she had expanded to a team of three and was offering specialized packages for corporate events and proposals.
              </Typography>
              <Typography paragraph>
                "The key to our growth was building a strong social media presence and maintaining high-quality photos of our setups," Sarah says. "We also developed partnerships with local food vendors and photographers to offer complete packages."
              </Typography>
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Facts
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" sx={{ mb: 1 }}>Founded in 2022</Typography>
                <Typography component="li" sx={{ mb: 1 }}>3 team members</Typography>
                <Typography component="li" sx={{ mb: 1 }}>100+ events completed</Typography>
                <Typography component="li" sx={{ mb: 1 }}>4.9/5 customer rating</Typography>
              </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Monthly Breakdown
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Revenue</Typography>
                <Typography variant="h6">$8,000+</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Expenses</Typography>
                <Typography variant="h6">$2,400</Typography>
                <Typography variant="body2" color="text.secondary">
                  • Supplies & equipment: $800<br />
                  • Staff wages: $1,200<br />
                  • Marketing: $300<br />
                  • Insurance: $100
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Net Profit</Typography>
                <Typography variant="h6" color="primary">$5,600+</Typography>
              </Box>
            </Paper>

            <Button 
              variant="contained" 
              fullWidth 
              component={RouterLink}
              to="/community"
              sx={{ mb: 2 }}
            >
              Join Our Community
            </Button>
            <Button 
              variant="outlined" 
              fullWidth 
              component={RouterLink}
              to="/learn"
              sx={{ mb: 2 }}
            >
              Download Business Plan
            </Button>
            <Button 
              variant="outlined" 
              fullWidth 
              component={RouterLink}
              to="/consult"
            >
              Schedule Consultation
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LuxuryPicnicSetup; 