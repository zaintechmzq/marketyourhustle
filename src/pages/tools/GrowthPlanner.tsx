import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
} from '@mui/material';
import { TrendingUp as TrendingUpIcon } from '@mui/icons-material';

const GrowthPlanner: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUpIcon fontSize="large" color="primary" />
          Growth Planner
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Plan and track your business growth goals
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Coming Soon
            </Typography>
            <Typography variant="body1">
              The Growth Planner tool is currently under development. Check back soon for features to help plan and track your business growth goals.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GrowthPlanner; 