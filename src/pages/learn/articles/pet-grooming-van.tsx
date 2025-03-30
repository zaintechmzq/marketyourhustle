import React, { useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, Button, Chip, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  TrendingUp as TrendingUpIcon, 
  AccessTime as AccessTimeIcon,
  MonetizationOn as MonetizationOnIcon,
  Business as BusinessIcon,
  Store as StoreIcon,
  Pets as PetsIcon,
  LocalShipping as LocalShippingIcon,
  Star as StarIcon,
  Group as GroupIcon,
  CalendarToday as CalendarIcon,
  EmojiEvents as EmojiEventsIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const MotionBox = motion(Box);

const PetGroomingVan = () => {
  const businessMetrics = {
    monthlyRevenue: "$20,000+",
    startupCost: "$25,000 - $60,000",
    profitMargin: "45%",
    timeToProfit: "6-9 months"
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
              How I Started a Pet Grooming Van That Earns $20K+/Month
            </Typography>
            
            <Box sx={{ mb: 4, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Chip icon={<PetsIcon />} label="Pet Care" />
              <Chip icon={<LocalShippingIcon />} label="Mobile Business" />
              <Chip icon={<TrendingUpIcon />} label="High Demand" />
              <Chip icon={<GroupIcon />} label="Recurring Clients" />
            </Box>

            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                fontWeight: 400
              }}
            >
              After getting laid off, a dog lover launched a mobile grooming service. They outfitted a used van with essential equipment and focused on upscale pet owners looking for convenience. Within a year, they had a waitlist and a second van.
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
                Sarah Johnson had always been passionate about animals. After working as a veterinary technician for five years, she found herself unexpectedly laid off during the pandemic. Instead of looking for another job, she saw an opportunity to combine her love for pets with her entrepreneurial spirit.
              </Typography>
              <Typography paragraph>
                "I noticed that many pet owners were struggling to get their dogs groomed during lockdown," Sarah recalls. "The existing mobile groomers in our area had long waitlists, and traditional grooming salons were either closed or operating with limited capacity."
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                The Launch
              </Typography>
              <Typography paragraph>
                Sarah started by researching mobile grooming vans and equipment. She found a used cargo van for $15,000 and invested another $10,000 in essential grooming equipment, including a hydraulic lift table, grooming tools, and a water system.
              </Typography>
              <Typography paragraph>
                "The initial setup was challenging," she admits. "I had to learn about van modifications, water systems, and proper ventilation. But I was determined to create a comfortable, safe environment for both pets and groomers."
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Business Model & Operations
              </Typography>
              <Typography paragraph>
                Sarah's business model focused on convenience and quality. She offered door-to-door service, flexible scheduling, and premium grooming packages. Her target market was busy professionals and elderly pet owners who valued the convenience of mobile service.
              </Typography>
              <Typography paragraph>
                "We charge a premium for our service, but customers are willing to pay for the convenience and quality," she explains. "Our average service costs $80-120, depending on the dog's size and coat type."
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Scaling & Growth
              </Typography>
              <Typography paragraph>
                Within six months, Sarah had a full schedule and a growing waitlist. She hired her first groomer and purchased a second van. By the end of her first year, she had three vans operating in different areas of the city.
              </Typography>
              <Typography paragraph>
                "The key to our growth has been maintaining high quality and building trust," she says. "We've developed a loyal customer base through consistent service and attention to detail."
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
                <Typography component="li" sx={{ mb: 1 }}>Founded in 2020</Typography>
                <Typography component="li" sx={{ mb: 1 }}>3 mobile grooming vans</Typography>
                <Typography component="li" sx={{ mb: 1 }}>5 full-time groomers</Typography>
                <Typography component="li" sx={{ mb: 1 }}>500+ regular clients</Typography>
              </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Monthly Breakdown
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Revenue</Typography>
                <Typography variant="h6">$20,000+</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Expenses</Typography>
                <Typography variant="h6">$11,000</Typography>
                <Typography variant="body2" color="text.secondary">
                  • Van maintenance: $1,500<br />
                  • Equipment & supplies: $2,000<br />
                  • Staff wages: $6,000<br />
                  • Marketing: $1,500
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Net Profit</Typography>
                <Typography variant="h6" color="primary">$9,000+</Typography>
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

export default PetGroomingVan; 