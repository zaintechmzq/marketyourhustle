import React, { useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, Divider, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  TrendingUp as TrendingUpIcon, 
  AccessTime as AccessTimeIcon,
  MonetizationOn as MonetizationOnIcon,
  Business as BusinessIcon,
  Store as StoreIcon,
  Group as GroupIcon
} from '@mui/icons-material';

const MotionBox = motion(Box);

const Qamaria = () => {
  const businessMetrics = {
    monthlyRevenue: '$50,000+',
    startupCost: '$100K - $250K',
    profitMargin: '40%',
    timeToProfit: '8-12 months',
    industry: 'Food & Beverage'
  };

  const keyPoints = [
    'Modern Coffee Experience',
    'Middle Eastern Fusion',
    'Direct Trade Coffee',
    'Premium Quality',
    'Innovative Flavors'
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h1" gutterBottom sx={{ 
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          fontWeight: 700,
          mb: 3 
        }}>
          Building a Modern Coffee Experience
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            {keyPoints.map((point, index) => (
              <Grid item key={index}>
                <Chip 
                  label={point} 
                  color="primary" 
                  sx={{ 
                    borderRadius: '16px',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }} 
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </MotionBox>

      {/* Business Metrics Card */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <MonetizationOnIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>Monthly Revenue</Typography>
              <Typography variant="h4" color="primary.main">{businessMetrics.monthlyRevenue}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <BusinessIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>Startup Cost</Typography>
              <Typography variant="h4" color="primary.main">{businessMetrics.startupCost}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <TrendingUpIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>Profit Margin</Typography>
              <Typography variant="h4" color="primary.main">{businessMetrics.profitMargin}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <AccessTimeIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>Time to Profit</Typography>
              <Typography variant="h4" color="primary.main">{businessMetrics.timeToProfit}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              The Vision
            </Typography>
            <Typography variant="body1" paragraph>
              Qamaria Coffee was born from a desire to blend traditional Middle Eastern coffee culture with modern specialty coffee trends. The founders saw an opportunity to create a unique coffee experience that would appeal to both traditional coffee lovers and those seeking something new and exciting.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              The Journey
            </Typography>
            <Typography variant="body1" paragraph>
              Starting with a small location in Houston, Qamaria quickly gained attention for its innovative approach to coffee. They combined traditional Arabic coffee preparation methods with modern brewing techniques, creating unique flavor profiles that set them apart in the competitive coffee market.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Business Model & Operations
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>Coffee Program</Typography>
                <Typography variant="body2">
                  • Direct trade relationships with farmers<br />
                  • In-house roasting program<br />
                  • Blend of traditional and modern methods<br />
                  • Seasonal menu rotations
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>Customer Experience</Typography>
                <Typography variant="body2">
                  • Educational coffee tastings<br />
                  • Modern café atmosphere<br />
                  • Cultural fusion elements<br />
                  • Premium service standards
                </Typography>
              </Paper>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Revenue Streams</Typography>
                <Typography variant="body2">
                  • Café beverages and food<br />
                  • Retail coffee beans<br />
                  • Coffee equipment sales<br />
                  • Coffee subscriptions
                </Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Innovation & Growth
            </Typography>
            <Typography variant="body1" paragraph>
              Qamaria's success comes from their commitment to quality and innovation. They source beans directly from farmers, roast in small batches, and continuously experiment with new flavors and brewing methods. Their modern approach to traditional coffee has created a loyal customer base and strong growth potential.
            </Typography>
          </Box>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Facts
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Location</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Houston, Texas</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Founded</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>2020</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Employees</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>15-20</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Market Position</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Premium Specialty Coffee</Typography>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Performance
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Revenue</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>$50,000+</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Operating Costs</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>$30,000</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Net Profit</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>$20,000+</Typography>
            </Box>
          </Paper>

          <Button 
            variant="contained" 
            fullWidth 
            size="large"
            sx={{ mb: 2 }}
          >
            Download Coffee Shop Guide
          </Button>
          <Button 
            variant="outlined" 
            fullWidth 
            size="large"
          >
            Schedule a Consultation
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Qamaria; 