import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Slider,
  Alert,
} from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';

interface PricingInputs {
  costPerHour: number;
  overheadCosts: number;
  desiredProfitMargin: number;
  competitorLowPrice: number;
  competitorHighPrice: number;
  marketDemand: number;
}

const PricingStrategy = () => {
  const [inputs, setInputs] = useState<PricingInputs>({
    costPerHour: 0,
    overheadCosts: 0,
    desiredProfitMargin: 30,
    competitorLowPrice: 0,
    competitorHighPrice: 0,
    marketDemand: 50,
  });

  const [recommendedPrice, setRecommendedPrice] = useState<number | null>(null);

  const handleSliderChange = (field: keyof PricingInputs) => (
    _: Event,
    newValue: number | number[]
  ) => {
    setInputs(prev => ({
      ...prev,
      [field]: newValue as number
    }));
  };

  const handleTextFieldChange = (field: keyof PricingInputs) => (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(event.target.value) || 0
    }));
  };

  const calculatePrice = () => {
    const baseHourlyCost = inputs.costPerHour + (inputs.overheadCosts / 160);
    const priceWithMargin = baseHourlyCost * (1 + (inputs.desiredProfitMargin / 100));
    const marketMidPoint = (inputs.competitorLowPrice + inputs.competitorHighPrice) / 2;
    const marketAdjustmentFactor = inputs.marketDemand / 50;
    const recommendedPrice = (priceWithMargin + marketMidPoint) / 2 * marketAdjustmentFactor;
    setRecommendedPrice(Math.round(recommendedPrice * 100) / 100);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalculateIcon fontSize="large" color="primary" />
          Pricing Strategy Calculator
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Determine the optimal price for your services based on costs, market, and competition
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Cost Factors
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Cost Per Hour ($)"
                type="number"
                value={inputs.costPerHour || ''}
                onChange={handleTextFieldChange('costPerHour')}
                fullWidth
              />
              <TextField
                label="Monthly Overhead Costs ($)"
                type="number"
                value={inputs.overheadCosts || ''}
                onChange={handleTextFieldChange('overheadCosts')}
                fullWidth
              />
              <Typography gutterBottom>Desired Profit Margin (%)</Typography>
              <Slider
                value={inputs.desiredProfitMargin}
                onChange={handleSliderChange('desiredProfitMargin')}
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Market Factors
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Competitor Lowest Price ($)"
                type="number"
                value={inputs.competitorLowPrice || ''}
                onChange={handleTextFieldChange('competitorLowPrice')}
                fullWidth
              />
              <TextField
                label="Competitor Highest Price ($)"
                type="number"
                value={inputs.competitorHighPrice || ''}
                onChange={handleTextFieldChange('competitorHighPrice')}
                fullWidth
              />
              <Typography gutterBottom>Market Demand Level</Typography>
              <Slider
                value={inputs.marketDemand}
                onChange={handleSliderChange('marketDemand')}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                marks={[
                  { value: 0, label: 'Low' },
                  { value: 50, label: 'Medium' },
                  { value: 100, label: 'High' },
                ]}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={calculatePrice}
              startIcon={<CalculateIcon />}
            >
              Calculate Recommended Price
            </Button>
          </Box>
        </Grid>

        {recommendedPrice !== null && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Recommended Hourly Rate
              </Typography>
              <Typography variant="h3" color="primary" gutterBottom>
                ${recommendedPrice}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This price balances your costs, desired profit margin, and market conditions
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      <Alert severity="info" sx={{ mt: 2 }}>
        This calculation is a recommendation based on the provided inputs. Consider additional factors specific to your business when setting final prices.
      </Alert>
    </Container>
  );
};

export default PricingStrategy; 