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

const HalalGuys = () => {
  const businessMetrics = {
    monthlyRevenue: '$100M+',
    startupCost: '$300K - $1M',
    profitMargin: '45%',
    timeToProfit: '12-18 months',
    industry: 'Food & Beverage'
  };

  const keyPoints = [
    'Street Food to Global Brand',
    'Franchise Success',
    'Simple Menu',
    'Strong Brand Identity',
    'Cultural Impact'
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
          From Food Cart to $100M+ Global Franchise
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
              <Typography variant="h6" gutterBottom>Annual Revenue</Typography>
              <Typography variant="h4" color="primary.main">{businessMetrics.monthlyRevenue}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <BusinessIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>Franchise Cost</Typography>
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
              The Backstory
            </Typography>
            <Typography variant="body1" paragraph>
              In 1990, three Egyptian immigrants—Mohamed Abouelenein, Ahmed Elsaka, and Abdelbaset Elsayed—started a hot dog cart in New York City. They noticed many Muslim cab drivers struggling to find halal food options and saw an opportunity to serve their community while building a business.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              The Turning Point
            </Typography>
            <Typography variant="body1" paragraph>
              The founders switched from hot dogs to halal food, offering a simple menu of chicken, gyro meat, and rice. Word spread quickly among taxi drivers and local office workers. Soon, their cart at 53rd and 6th Avenue became legendary, with lines stretching around the block even at 3 AM.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Business Model & Operations
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>Menu Strategy</Typography>
                <Typography variant="body2">
                  • Limited menu options for efficiency<br />
                  • Focus on quality and consistency<br />
                  • Signature white and red sauces<br />
                  • Standardized portions and pricing
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>Franchise Model</Typography>
                <Typography variant="body2">
                  • Comprehensive training program<br />
                  • Standardized operations manual<br />
                  • Quality control systems<br />
                  • Marketing support
                </Typography>
              </Paper>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Brand Development</Typography>
                <Typography variant="body2">
                  • Strong visual identity<br />
                  • Consistent customer experience<br />
                  • Social media presence<br />
                  • Community engagement
                </Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Scaling to Success
            </Typography>
            <Typography variant="body1" paragraph>
              In 2014, The Halal Guys began franchising. Their simple menu, efficient operations, and strong brand recognition made them an attractive franchise opportunity. Today, they have hundreds of locations worldwide and have successfully transformed street food into a global fast-casual phenomenon.
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
              <Typography variant="subtitle2" color="text.secondary">Locations</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>400+ Worldwide</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Founded</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>1990</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Employees</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>5,000+</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Market Position</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Fast-Casual Halal Food</Typography>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Franchise Success Metrics
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Average Unit Revenue</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>$1.2M/Year</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Initial Investment</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>$300K - $1M</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">ROI Timeline</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>2-3 Years</Typography>
            </Box>
          </Paper>

          <Button 
            variant="contained" 
            fullWidth 
            size="large"
            sx={{ mb: 2 }}
          >
            Download Franchise Guide
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

export default HalalGuys; 