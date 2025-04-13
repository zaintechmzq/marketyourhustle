import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { 
  MonetizationOn as MonetizationOnIcon,
  EmojiEvents as EmojiEventsIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Timeline as TimelineIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

interface RevenueInputs {
  servicePrice: number;
  clientsPerMonth: number;
  servicesPerClient: number;
  expenses: number;
}

interface MilestoneCalculation {
  clientsNeeded: number;
  weeksToReach: number;
  monthsToReach: number;
  weeklySchedule: {
    clientsPerWeek: number;
    servicesPerWeek: number;
    revenuePerWeek: number;
  };
}

const RevenueCalculator = () => {
  const [inputs, setInputs] = useState<RevenueInputs>({
    servicePrice: 0,
    clientsPerMonth: 0,
    servicesPerClient: 1,
    expenses: 0,
  });

  const [results, setResults] = useState({
    monthlyRevenue: 0,
    monthlyProfit: 0,
    annualRevenue: 0,
    annualProfit: 0,
    profitMargin: 0,
  });

  const [milestone, setMilestone] = useState<MilestoneCalculation>({
    clientsNeeded: 0,
    weeksToReach: 0,
    monthsToReach: 0,
    weeklySchedule: {
      clientsPerWeek: 0,
      servicesPerWeek: 0,
      revenuePerWeek: 0,
    },
  });

  const handleInputChange = (field: keyof RevenueInputs) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value) || 0;
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateMilestone = (servicePrice: number, servicesPerClient: number, expenses: number) => {
    const TARGET_REVENUE = 10000;
    const WEEKS_IN_MONTH = 4;
    
    if (servicePrice <= 0) return null;

    const revenuePerClient = servicePrice * servicesPerClient;
    const clientsNeeded = Math.ceil(TARGET_REVENUE / revenuePerClient);
    
    // Assuming a reasonable pace of acquiring clients
    const weeksToReach = Math.ceil(clientsNeeded / 3); // Acquiring 3 clients per week
    const monthsToReach = Math.ceil(weeksToReach / WEEKS_IN_MONTH);
    
    const clientsPerWeek = Math.ceil(clientsNeeded / weeksToReach);
    const servicesPerWeek = clientsPerWeek * servicesPerClient;
    const revenuePerWeek = clientsPerWeek * revenuePerClient;

    return {
      clientsNeeded,
      weeksToReach,
      monthsToReach,
      weeklySchedule: {
        clientsPerWeek,
        servicesPerWeek,
        revenuePerWeek,
      },
    };
  };

  const calculateRevenue = () => {
    const monthlyRevenue = inputs.servicePrice * inputs.clientsPerMonth * inputs.servicesPerClient;
    const monthlyProfit = monthlyRevenue - inputs.expenses;
    const annualRevenue = monthlyRevenue * 12;
    const annualProfit = monthlyProfit * 12;
    const profitMargin = (monthlyProfit / monthlyRevenue) * 100;

    setResults({
      monthlyRevenue,
      monthlyProfit,
      annualRevenue,
      annualProfit,
      profitMargin: isNaN(profitMargin) ? 0 : profitMargin,
    });

    const milestoneResult = calculateMilestone(
      inputs.servicePrice,
      inputs.servicesPerClient,
      inputs.expenses
    );
    if (milestoneResult) {
      setMilestone(milestoneResult);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Title Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MonetizationOnIcon sx={{ color: '#FC8B59' }} fontSize="large" />
          Revenue Calculator
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Calculate potential revenue and profit for your service business
        </Typography>
      </Box>

      {/* Introduction Section */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: '#f8f9fa', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#FC8B59', fontWeight: 600 }}>
          Discover Your Business Potential
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TrendingUpIcon sx={{ color: '#FC8B59', mt: 0.5 }} />
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem' }}>
                  Path to $10K
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Find out exactly how many clients you need to reach your first $10,000 milestone
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TimelineIcon sx={{ color: '#FC8B59', mt: 0.5 }} />
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem' }}>
                  Weekly Breakdown
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get a clear weekly schedule showing exactly what it takes to achieve your goals
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <SpeedIcon sx={{ color: '#FC8B59', mt: 0.5 }} />
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem' }}>
                  Profit Insights
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  See your potential monthly and annual revenue with detailed profit margins
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Alert 
          severity="info" 
          sx={{ 
            mt: 3, 
            bgcolor: 'rgba(252, 139, 89, 0.1)', 
            '& .MuiAlert-icon': { color: '#FC8B59' },
            '& .MuiAlert-message': { width: '100%' }
          }}
        >
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
            Ready to see your business potential? 
          </Typography>
          <Typography variant="body2">
            Enter your service price and client numbers below to get a personalized roadmap to your first $10,000 and beyond! 
          </Typography>
        </Alert>
      </Paper>

      <Grid container spacing={4}>
        {/* Input Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h6" gutterBottom>
              Enter Your Numbers
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Service Price ($)"
                type="number"
                value={inputs.servicePrice || ''}
                onChange={handleInputChange('servicePrice')}
                fullWidth
                InputProps={{
                  sx: { '& input': { color: '#000' } }
                }}
              />
              <TextField
                label="Number of Clients per Month"
                type="number"
                value={inputs.clientsPerMonth || ''}
                onChange={handleInputChange('clientsPerMonth')}
                fullWidth
                InputProps={{
                  sx: { '& input': { color: '#000' } }
                }}
              />
              <TextField
                label="Services per Client per Month"
                type="number"
                value={inputs.servicesPerClient || ''}
                onChange={handleInputChange('servicesPerClient')}
                fullWidth
                InputProps={{
                  sx: { '& input': { color: '#000' } }
                }}
              />
              <TextField
                label="Monthly Expenses ($)"
                type="number"
                value={inputs.expenses || ''}
                onChange={handleInputChange('expenses')}
                fullWidth
                InputProps={{
                  sx: { '& input': { color: '#000' } }
                }}
              />
              <Button
                variant="contained"
                size="large"
                onClick={calculateRevenue}
                fullWidth
                sx={{
                  bgcolor: '#FC8B59',
                  '&:hover': {
                    bgcolor: '#E67A4A',
                  },
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                Calculate Revenue
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Results Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h6" gutterBottom>
              Revenue Projections
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Monthly Revenue
                </Typography>
                <Typography variant="h4" sx={{ color: '#FC8B59' }}>
                  ${results.monthlyRevenue.toLocaleString()}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Monthly Profit
                </Typography>
                <Typography variant="h4" sx={{ color: '#FC8B59' }}>
                  ${results.monthlyProfit.toLocaleString()}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Annual Revenue
                </Typography>
                <Typography variant="h4" sx={{ color: '#FC8B59' }}>
                  ${results.annualRevenue.toLocaleString()}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Annual Profit
                </Typography>
                <Typography variant="h4" sx={{ color: '#FC8B59' }}>
                  ${results.annualProfit.toLocaleString()}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Profit Margin
                </Typography>
                <Typography variant="h4" sx={{ color: '#FC8B59' }}>
                  {results.profitMargin.toFixed(1)}%
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Alert severity="info" sx={{ mt: 2 }}>
            These calculations are estimates based on the provided inputs. Actual results may vary depending on various factors.
          </Alert>
        </Grid>

        {/* Milestone Section */}
        {milestone.clientsNeeded > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ 
              p: 3, 
              mt: 2, 
              bgcolor: '#FC8B59', 
              color: 'white',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <EmojiEventsIcon fontSize="large" />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Your Path to $10,000
                </Typography>
              </Box>
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    The Big Picture
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`Total Clients Needed: ${milestone.clientsNeeded}`}
                        secondary={`At $${inputs.servicePrice} per service`}
                        primaryTypographyProps={{ sx: { fontWeight: 600 } }}
                        secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.9)' } }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`Estimated Time: ${milestone.monthsToReach} months`}
                        secondary={`(${milestone.weeksToReach} weeks)`}
                        primaryTypographyProps={{ sx: { fontWeight: 600 } }}
                        secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.9)' } }}
                      />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Weekly Schedule to Success
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`Clients per Week: ${milestone.weeklySchedule.clientsPerWeek}`}
                        secondary="Manageable client acquisition pace"
                        primaryTypographyProps={{ sx: { fontWeight: 600 } }}
                        secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.9)' } }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`Services per Week: ${milestone.weeklySchedule.servicesPerWeek}`}
                        secondary={`${inputs.servicesPerClient} service(s) per client`}
                        primaryTypographyProps={{ sx: { fontWeight: 600 } }}
                        secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.9)' } }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`Weekly Revenue: $${milestone.weeklySchedule.revenuePerWeek.toLocaleString()}`}
                        secondary="Steady progress towards your goal"
                        primaryTypographyProps={{ sx: { fontWeight: 600 } }}
                        secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.9)' } }}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>

              <Alert severity="success" sx={{ 
                mt: 2, 
                bgcolor: 'rgba(255,255,255,0.95)',
                '& .MuiAlert-icon': {
                  color: '#FC8B59'
                }
              }}>
                <Typography variant="body1" sx={{ color: '#000', fontWeight: 500 }}>
                  You're just {milestone.clientsNeeded} clients away from your first $10,000! 
                  With {milestone.weeklySchedule.clientsPerWeek} clients per week, you can reach this milestone in {milestone.monthsToReach} months.
                </Typography>
              </Alert>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default RevenueCalculator; 