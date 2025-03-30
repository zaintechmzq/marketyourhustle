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

const BalloonGarlandSetup = () => {
  const businessMetrics = {
    monthlyRevenue: "$8,000+",
    startupCost: "$2,000 - $4,000",
    profitMargin: "65%",
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
              How I Started a Balloon Garland Setup Business That Earns $8K/Month
            </Typography>
            
            <Box sx={{ mb: 4, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Chip icon={<CelebrationIcon />} label="Event Decor" />
              <Chip icon={<PaletteIcon />} label="Creative Business" />
              <Chip icon={<TrendingUpIcon />} label="High Demand" />
              <Chip icon={<StarIcon />} label="Low Startup Cost" />
            </Box>

            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                fontWeight: 400
              }}
            >
              A creative entrepreneur turned their passion for balloon art into a profitable business. Starting with basic equipment and social media marketing, they now create stunning balloon installations for weddings, corporate events, and parties.
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
                Sarah Chen discovered her talent for balloon art while planning her sister's wedding. What started as a creative hobby quickly turned into a business opportunity when friends and family began requesting her balloon installations.
              </Typography>
              <Typography paragraph>
                "I realized there was a gap in the market for high-quality balloon installations," Sarah explains. "Many event planners were looking for someone who could create custom balloon garlands and arches, but there weren't many professionals offering this service."
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                The Launch
              </Typography>
              <Typography paragraph>
                With an initial investment of $3,000, Sarah purchased essential equipment including a helium tank, various balloon sizes and colors, and basic tools. She started by offering her services through social media and word-of-mouth referrals.
              </Typography>
              <Typography paragraph>
                "The key was building a strong portfolio and maintaining consistent quality," Sarah shares. "I made sure to document every installation and share it on social media to showcase my work."
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Business Model & Operations
              </Typography>
              <Typography paragraph>
                The business model focuses on providing custom balloon installations for various events. Sarah charges $300-800 per installation, depending on the size and complexity. She also offers package deals for multiple installations at the same event.
              </Typography>
              <Typography paragraph>
                "We offer different styles and themes to match any event's aesthetic," Sarah explains. "From elegant wedding arches to playful birthday backdrops, we can create anything the client envisions."
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Scaling & Growth
              </Typography>
              <Typography paragraph>
                Within three months, Sarah had a full schedule of weekend events. By the end of her first year, she had expanded to a team of three and was booking events up to six months in advance. Her success came from excellent customer service and stunning visual content on social media.
              </Typography>
              <Typography paragraph>
                "The turning point was when we started getting referrals from event planners," Sarah says. "That's when we knew we had established ourselves as a reliable, professional service."
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
                <Typography variant="h6">$2,800</Typography>
                <Typography variant="body2" color="text.secondary">
                  • Supplies & equipment: $1,200<br />
                  • Staff wages: $1,200<br />
                  • Marketing: $300<br />
                  • Insurance: $100
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Net Profit</Typography>
                <Typography variant="h6" color="primary">$5,200+</Typography>
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

export default BalloonGarlandSetup; 