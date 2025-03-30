import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, Chip, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  TrendingUp as TrendingUpIcon, 
  AccessTime as AccessTimeIcon,
  MonetizationOn as MonetizationOnIcon,
  Business as BusinessIcon,
  Celebration as CelebrationIcon,
  Palette as PaletteIcon,
  Star as StarIcon,
  Group as GroupIcon,
  CalendarToday as CalendarIcon,
  EmojiEvents as EmojiEventsIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const MotionBox = motion(Box);

const CustomEventBackdrops = () => {
  const businessMetrics = {
    monthlyRevenue: "$12,000+",
    startupCost: "$3,000 - $5,000",
    profitMargin: "60%",
    timeToProfit: "3-4 months"
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
              How I Built a $12K/Month Custom Event Backdrop Business
            </Typography>
            
            <Box sx={{ mb: 4, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Chip icon={<CelebrationIcon />} label="Event Decor" />
              <Chip icon={<PaletteIcon />} label="Creative Business" />
              <Chip icon={<TrendingUpIcon />} label="High Demand" />
              <Chip icon={<StarIcon />} label="Custom Design" />
            </Box>

            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                fontWeight: 400
              }}
            >
              A creative entrepreneur turned their passion for design into a profitable business creating custom backdrops for events. Starting with basic materials and a keen eye for design, they now create stunning installations for weddings, corporate events, and social gatherings.
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
                Michael Rodriguez discovered his talent for creating custom backdrops while helping a friend with their wedding decorations. What started as a creative project quickly turned into a business opportunity when other event planners began requesting his services.
              </Typography>
              <Typography paragraph>
                "I noticed that many events were using the same generic backdrops," Michael explains. "There was a growing demand for unique, custom-designed installations that could make events stand out and create memorable photo opportunities."
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                The Launch
              </Typography>
              <Typography paragraph>
                With an initial investment of $4,000, Michael purchased essential materials including various fabrics, frames, lighting equipment, and basic tools. He started by offering his services through social media and networking with local event planners.
              </Typography>
              <Typography paragraph>
                "The key was building a diverse portfolio that showcased different styles and themes," Michael shares. "I made sure to document every installation and share it on social media to demonstrate my versatility."
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Business Model & Operations
              </Typography>
              <Typography paragraph>
                The business model focuses on providing custom backdrop designs for various events. Michael charges $500-1,500 per backdrop, depending on the size, complexity, and materials used. He also offers package deals for multiple backdrops at the same event.
              </Typography>
              <Typography paragraph>
                "We offer different styles and themes to match any event's aesthetic," Michael explains. "From elegant wedding arches to playful birthday backdrops, we can create anything the client envisions."
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Scaling & Growth
              </Typography>
              <Typography paragraph>
                Within four months, Michael had a full schedule of weekend events. By the end of his first year, he had expanded to a team of four and was booking events up to six months in advance. His success came from excellent customer service and stunning visual content on social media.
              </Typography>
              <Typography paragraph>
                "The turning point was when we started getting referrals from event planners," Michael says. "That's when we knew we had established ourselves as a reliable, professional service."
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
                <Typography component="li" sx={{ mb: 1 }}>4 team members</Typography>
                <Typography component="li" sx={{ mb: 1 }}>150+ events completed</Typography>
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
                <Typography variant="h6">$4,800</Typography>
                <Typography variant="body2" color="text.secondary">
                  • Supplies & equipment: $1,800<br />
                  • Staff wages: $2,400<br />
                  • Marketing: $400<br />
                  • Insurance: $200
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Net Profit</Typography>
                <Typography variant="h6" color="primary">$7,200+</Typography>
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

export default CustomEventBackdrops; 