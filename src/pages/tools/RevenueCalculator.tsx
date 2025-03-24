import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';

const RevenueCalculator = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    hourlyRate: 0,
    hoursPerWeek: 0,
    weeksPerYear: 52,
    additionalRevenue: 0,
    expenses: 0
  });

  const [result, setResult] = useState<{
    grossRevenue: number;
    netRevenue: number;
    monthlyAverage: number;
  } | null>(null);

  const serviceTypes = [
    'Wedding Photography',
    'Event Planning',
    'Food Catering',
    'Party Entertainment',
    'Cultural Services',
    'Beauty Services',
    'Creative Services',
    'Other'
  ];

  const handleChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const calculateRevenue = () => {
    const grossRevenue = 
      (formData.hourlyRate * formData.hoursPerWeek * formData.weeksPerYear) + 
      formData.additionalRevenue;
    
    const netRevenue = grossRevenue - formData.expenses;
    const monthlyAverage = netRevenue / 12;

    setResult({
      grossRevenue,
      netRevenue,
      monthlyAverage
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Revenue Calculator
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Calculate your potential earnings based on your business model
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Business Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Service Type</InputLabel>
                <Select
                  value={formData.serviceType}
                  label="Service Type"
                  onChange={handleChange('serviceType')}
                >
                  {serviceTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Hourly Rate ($)"
                type="number"
                value={formData.hourlyRate}
                onChange={handleChange('hourlyRate')}
              />

              <TextField
                fullWidth
                label="Hours per Week"
                type="number"
                value={formData.hoursPerWeek}
                onChange={handleChange('hoursPerWeek')}
              />

              <TextField
                fullWidth
                label="Weeks per Year"
                type="number"
                value={formData.weeksPerYear}
                onChange={handleChange('weeksPerYear')}
              />

              <TextField
                fullWidth
                label="Additional Revenue (e.g., tips, products)"
                type="number"
                value={formData.additionalRevenue}
                onChange={handleChange('additionalRevenue')}
              />

              <TextField
                fullWidth
                label="Annual Expenses"
                type="number"
                value={formData.expenses}
                onChange={handleChange('expenses')}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={calculateRevenue}
                sx={{ mt: 2 }}
              >
                Calculate Revenue
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {result && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Revenue Projection
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Alert severity="info">
                  Gross Annual Revenue: ${result.grossRevenue.toLocaleString()}
                </Alert>
                <Alert severity="success">
                  Net Annual Revenue: ${result.netRevenue.toLocaleString()}
                </Alert>
                <Alert severity="info">
                  Monthly Average: ${result.monthlyAverage.toLocaleString()}
                </Alert>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default RevenueCalculator; 