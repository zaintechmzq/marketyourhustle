import React from 'react';
import { Box, Container, Typography, Grid, Paper, Chip, Button, Divider } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BusinessIcon from '@mui/icons-material/Business';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const CarDetailingBusiness = () => {
  const businessMetrics = {
    monthlyRevenue: '$75,000',
    startupCost: '$500 - $20,000',
    profitMargin: '42%',
    timeToProfit: '3-6 months',
    industry: 'Automotive Services'
  };

  const keyPoints = [
    'Low barrier to entry',
    'High profit margins',
    'Mobile or fixed location',
    'Recurring revenue potential',
    'Scalable business model'
  ];

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
          How to Build a $75K/Month Car Detailing Business
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
              The Car Detailing Business Opportunity
            </Typography>
            <Typography variant="body1" paragraph>
              The car detailing industry presents a lucrative opportunity with its $14.7 billion market size. 
              Starting a car detailing business can be done with minimal initial investment, making it an 
              attractive option for entrepreneurs. This guide breaks down how to build a successful car 
              detailing business that can generate $75,000 or more in monthly revenue.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Getting Started: Essential Requirements
            </Typography>
            <Typography variant="body1" paragraph>
              To start a car detailing business, you'll need:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Typography component="li" paragraph>Basic detailing equipment ($500-$2,000)</Typography>
              <Typography component="li" paragraph>Vehicle or fixed location</Typography>
              <Typography component="li" paragraph>Business licenses and insurance</Typography>
              <Typography component="li" paragraph>Marketing strategy and materials</Typography>
              <Typography component="li" paragraph>Basic automotive knowledge</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Services and Pricing Strategy
            </Typography>
            <Typography variant="body1" paragraph>
              Successful car detailing businesses offer tiered service packages:
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>Basic Package: $75-150</Typography>
                <Typography variant="body2">
                  • Exterior wash and dry<br />
                  • Interior vacuum and wipe-down<br />
                  • Window cleaning<br />
                  • Tire dressing
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>Premium Package: $150-300</Typography>
                <Typography variant="body2">
                  • Everything in Basic Package<br />
                  • Clay bar treatment<br />
                  • Paint sealant<br />
                  • Interior deep cleaning<br />
                  • Leather conditioning
                </Typography>
              </Paper>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Ultimate Package: $300-600+</Typography>
                <Typography variant="body2">
                  • Everything in Premium Package<br />
                  • Paint correction<br />
                  • Ceramic coating<br />
                  • Engine bay detailing<br />
                  • Premium wax application
                </Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Marketing and Customer Acquisition
            </Typography>
            <Typography variant="body1" paragraph>
              Successful car detailing businesses use a mix of marketing strategies:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Typography component="li" paragraph>Social media presence with before/after photos</Typography>
              <Typography component="li" paragraph>Local SEO and Google Business Profile</Typography>
              <Typography component="li" paragraph>Partnerships with car dealerships</Typography>
              <Typography component="li" paragraph>Referral program ($10-20 per referral)</Typography>
              <Typography component="li" paragraph>Email marketing for repeat customers</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Scaling Your Business
            </Typography>
            <Typography variant="body1" paragraph>
              To reach $75,000 monthly revenue:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Typography component="li" paragraph>Hire and train skilled detailers</Typography>
              <Typography component="li" paragraph>Invest in multiple mobile units</Typography>
              <Typography component="li" paragraph>Implement booking and CRM software</Typography>
              <Typography component="li" paragraph>Add premium services like ceramic coating</Typography>
              <Typography component="li" paragraph>Build corporate and fleet contracts</Typography>
            </Box>
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
              <Typography variant="subtitle2" color="text.secondary">Industry Size</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>$14.7 Billion</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Average Startup Time</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>2-4 Weeks</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Required Skills</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Basic - Intermediate</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Location Type</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Mobile or Fixed</Typography>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Profit Breakdown
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Revenue</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>$75,000</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Operating Costs</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>$43,500</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Net Profit</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>$31,500</Typography>
            </Box>
          </Paper>

          <Button 
            variant="contained" 
            fullWidth 
            size="large"
            sx={{ mb: 2 }}
          >
            Download Business Plan Template
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

export default CarDetailingBusiness; 