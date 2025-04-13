import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
} from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';

const CostCalculator: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalculateIcon fontSize="large" color="primary" />
          Cost Calculator
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Calculate and analyze your business costs
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Coming Soon
            </Typography>
            <Typography variant="body1">
              The Cost Calculator tool is currently under development. Check back soon for features to help calculate and analyze your business costs.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CostCalculator; 