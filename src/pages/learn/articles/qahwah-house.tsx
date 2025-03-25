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

const QahwahHouse = () => {
  const businessMetrics = {
    monthlyRevenue: '$100,000+',
    startupCost: '$50,000 - $150,000',
    profitMargin: '35%',
    timeToProfit: '6-12 months',
    industry: 'Food & Beverage'
  };

  const keyPoints = [
    'Family Heritage',
    'Direct Trade Coffee',
    'Cultural Experience',
    'Multi-State Expansion',
    'Premium Positioning'
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
          How I Built a $100K+ Yemeni Coffee Empire
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
              The Backstory
            </Typography>
            <Typography variant="body1" paragraph>
              Ibrahim Alhasbani grew up in Yemen surrounded by coffee trees. His family had been coffee farmers for centuries, cultivating some of the world's finest coffee beans in the mountainous regions of Yemen. When he moved to the U.S., he realized most Americans had never tasted true Yemeni coffee, and he saw an opportunity to share his heritage.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Launch & Early Days
            </Typography>
            <Typography variant="body1" paragraph>
              In 2017, Alhasbani opened his first location in Dearborn, Michigan—a city with a strong Arab-American population. He hand-carried beans from his family's farm in Yemen, ensuring every cup told a story of his homeland. The coffee shop was designed to feel like home, with ornate decor, traditional brewing methods, and warm hospitality.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Business Model & Operations
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>Direct Sourcing</Typography>
                <Typography variant="body2">
                  • Exclusive partnerships with family farms in Yemen<br />
                  • Quality control at source<br />
                  • Premium bean selection<br />
                  • Sustainable farming practices
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>Traditional Methods</Typography>
                <Typography variant="body2">
                  • Authentic Yemeni brewing techniques<br />
                  • Specialized barista training<br />
                  • Cultural presentation<br />
                  • Premium pricing strategy
                </Typography>
              </Paper>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Customer Experience</Typography>
                <Typography variant="body2">
                  • Immersive cultural atmosphere<br />
                  • Educational coffee tastings<br />
                  • Community events<br />
                  • Retail coffee bean sales
                </Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Scaling Up
            </Typography>
            <Typography variant="body1" paragraph>
              Qahwah House has since expanded to Brooklyn, NY, and Lombard, IL, with more locations in the pipeline. The focus has always been on authenticity rather than speed. Each barista is trained in traditional Yemeni brewing techniques, and quality is controlled by sourcing beans exclusively from family-owned farms in Yemen.
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
              <Typography variant="body1" sx={{ fontWeight: 600 }}>3 Stores (Multi-State)</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Founded</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>2017</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Employees</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>20-50</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Market Position</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Premium Specialty Coffee</Typography>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Profit Breakdown
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Revenue</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>$100,000+</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Operating Costs</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>$65,000</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Net Profit</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>$35,000+</Typography>
            </Box>
          </Paper>

          <Button 
            variant="contained" 
            fullWidth 
            size="large"
            sx={{ mb: 2 }}
          >
            Download Coffee Shop Business Plan
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

export default QahwahHouse; 