import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, Chip, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  TrendingUp as TrendingUpIcon, 
  AccessTime as AccessTimeIcon,
  MonetizationOn as MonetizationOnIcon,
  Business as BusinessIcon,
  Store as StoreIcon,
  Home as HomeIcon,
  Star as StarIcon,
  Group as GroupIcon,
  CalendarToday as CalendarIcon,
  EmojiEvents as EmojiEventsIcon,
  Recycling as EcoIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const MotionBox = motion(Box);

const LuxuryHomeCleaning = () => {
  const businessMetrics = {
    monthlyRevenue: "$12,000+",
    startupCost: "$5,000 - $10,000",
    profitMargin: "55%",
    timeToProfit: "3-5 months"
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
              How I Opened a Luxury Home Cleaning Business with $8K
            </Typography>
            
            <Box sx={{ mb: 4, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Chip icon={<HomeIcon />} label="Residential Services" />
              <Chip icon={<TrendingUpIcon />} label="Recurring Revenue" />
              <Chip icon={<StarIcon />} label="Trust-Based Business" />
              <Chip icon={<EcoIcon />} label="Eco-Friendly" />
            </Box>

            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                fontWeight: 400
              }}
            >
              A couple started a luxury home cleaning business targeting high-income neighborhoods. Their focus on consistency, eco-friendly products, and trust turned first-time clients into long-term customers.
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
                Michael and Emily Chen had always dreamed of starting their own business together. After years of working in corporate jobs, they decided to take the leap into entrepreneurship. Their inspiration came from a frustrating experience with a cleaning service that left their home in worse condition than before.
              </Typography>
              <Typography paragraph>
                "We realized there was a gap in the market for a truly premium cleaning service," Michael explains. "We wanted to create a business that would treat every home with the same care and attention to detail that we would want for our own."
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                The Launch
              </Typography>
              <Typography paragraph>
                The couple started with a modest investment of $8,000, which covered essential cleaning equipment, eco-friendly products, and marketing materials. They focused on high-end neighborhoods where residents valued quality service and were willing to pay a premium.
              </Typography>
              <Typography paragraph>
                "We spent a lot of time researching the best eco-friendly cleaning products and developing our cleaning protocols," Emily shares. "We wanted to ensure we were providing the highest quality service while being environmentally conscious."
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Business Model & Operations
              </Typography>
              <Typography paragraph>
                Their business model centered on building long-term relationships with clients through consistent, high-quality service. They offered flexible scheduling, customized cleaning plans, and a satisfaction guarantee. Their team of carefully vetted cleaners received extensive training in their proprietary cleaning methods.
              </Typography>
              <Typography paragraph>
                "We charge $50-75 per hour, depending on the service level," Michael explains. "Our clients appreciate the attention to detail and the fact that we use eco-friendly products that are safe for their families and pets."
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Scaling & Growth
              </Typography>
              <Typography paragraph>
                Within three months, they had a full schedule of recurring clients. By the end of their first year, they had expanded to a team of 10 cleaners and were serving over 100 regular clients. Their success came from word-of-mouth referrals and their commitment to maintaining high standards.
              </Typography>
              <Typography paragraph>
                "The key to our growth has been building trust and delivering consistent results," Emily says. "Our clients know they can count on us to provide the same high-quality service every time."
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
                <Typography component="li" sx={{ mb: 1 }}>Founded in 2021</Typography>
                <Typography component="li" sx={{ mb: 1 }}>10 full-time cleaners</Typography>
                <Typography component="li" sx={{ mb: 1 }}>100+ regular clients</Typography>
                <Typography component="li" sx={{ mb: 1 }}>4.9/5 customer rating</Typography>
              </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Monthly Breakdown
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Revenue</Typography>
                <Typography variant="h6">$12,000+</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Expenses</Typography>
                <Typography variant="h6">$5,400</Typography>
                <Typography variant="body2" color="text.secondary">
                  • Supplies & equipment: $1,200<br />
                  • Staff wages: $3,500<br />
                  • Marketing: $400<br />
                  • Insurance: $300
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Net Profit</Typography>
                <Typography variant="h6" color="primary">$6,600+</Typography>
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

export default LuxuryHomeCleaning; 