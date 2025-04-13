import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, Chip, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  TrendingUp as TrendingUpIcon, 
  AccessTime as AccessTimeIcon,
  MonetizationOn as MonetizationOnIcon,
  Business as BusinessIcon,
  Store as StoreIcon,
  Star as StarIcon,
  Group as GroupIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const MotionBox = motion(Box);

interface BusinessMetrics {
  monthlyRevenue: string;
  startupCost: string;
  profitMargin: string;
  timeToProfit: string;
}

interface QuickFact {
  label: string;
  value: string;
}

interface MonthlyBreakdown {
  revenue: string;
  expenses: {
    total: string;
    breakdown: { [key: string]: string };
  };
  netProfit: string;
}

interface ServiceArticleProps {
  title: string;
  summary: string;
  tags: Array<{
    icon: React.ReactNode;
    label: string;
  }>;
  businessMetrics: BusinessMetrics;
  quickFacts: QuickFact[];
  monthlyBreakdown: MonthlyBreakdown;
  content: {
    backstory: string[];
    launch: string[];
    businessModel: string[];
    scaling: string[];
  };
}

const ServiceArticle: React.FC<ServiceArticleProps> = ({
  title,
  summary,
  tags,
  businessMetrics,
  quickFacts,
  monthlyBreakdown,
  content,
}) => {
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
              {title}
            </Typography>
            
            <Box sx={{ mb: 4, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              {tags.map((tag, index) => (
                <Chip key={index} icon={tag.icon} label={tag.label} />
              ))}
            </Box>

            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                fontWeight: 400
              }}
            >
              {summary}
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
              {content.backstory.map((paragraph, index) => (
                <Typography key={index} paragraph>
                  {paragraph}
                </Typography>
              ))}
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                The Launch
              </Typography>
              {content.launch.map((paragraph, index) => (
                <Typography key={index} paragraph>
                  {paragraph}
                </Typography>
              ))}
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Business Model & Operations
              </Typography>
              {content.businessModel.map((paragraph, index) => (
                <Typography key={index} paragraph>
                  {paragraph}
                </Typography>
              ))}
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Scaling & Growth
              </Typography>
              {content.scaling.map((paragraph, index) => (
                <Typography key={index} paragraph>
                  {paragraph}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Facts
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {quickFacts.map((fact, index) => (
                  <Typography key={index} component="li" sx={{ mb: 1 }}>
                    {fact.label}: {fact.value}
                  </Typography>
                ))}
              </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Monthly Breakdown
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Revenue</Typography>
                <Typography variant="h6">{monthlyBreakdown.revenue}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Expenses</Typography>
                <Typography variant="h6">{monthlyBreakdown.expenses.total}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {Object.entries(monthlyBreakdown.expenses.breakdown).map(([key, value]) => (
                    `• ${key}: ${value}\n`
                  ))}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Net Profit</Typography>
                <Typography variant="h6" color="primary">{monthlyBreakdown.netProfit}</Typography>
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

export default ServiceArticle; 