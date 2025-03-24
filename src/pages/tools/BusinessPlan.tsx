import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';

const steps = [
  'Executive Summary',
  'Business Description',
  'Market Analysis',
  'Organization & Management',
  'Service/Product Line',
  'Marketing & Sales',
  'Financial Projections',
  'Funding Requirements'
];

const BusinessPlan = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    executiveSummary: '',
    businessDescription: '',
    marketAnalysis: '',
    organization: '',
    serviceLine: '',
    marketing: '',
    financial: '',
    funding: ''
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Write a brief overview of your business plan
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={formData.executiveSummary}
              onChange={handleChange('executiveSummary')}
              placeholder="Include your business concept, financial features, and current business position..."
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Describe your business in detail
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={formData.businessDescription}
              onChange={handleChange('businessDescription')}
              placeholder="Describe your business structure, mission, and goals..."
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Analyze your market and competition
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={formData.marketAnalysis}
              onChange={handleChange('marketAnalysis')}
              placeholder="Describe your target market, competition, and market trends..."
            />
          </Box>
        );
      case 3:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Detail your organization structure
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={formData.organization}
              onChange={handleChange('organization')}
              placeholder="Describe your management team, organizational structure, and ownership..."
            />
          </Box>
        );
      case 4:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Describe your services or products
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={formData.serviceLine}
              onChange={handleChange('serviceLine')}
              placeholder="Detail your service/product offerings, pricing, and unique selling points..."
            />
          </Box>
        );
      case 5:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Outline your marketing strategy
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={formData.marketing}
              onChange={handleChange('marketing')}
              placeholder="Describe your marketing plan, sales strategy, and customer acquisition methods..."
            />
          </Box>
        );
      case 6:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Provide financial projections
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={formData.financial}
              onChange={handleChange('financial')}
              placeholder="Include income statements, cash flow projections, and balance sheets..."
            />
          </Box>
        );
      case 7:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Detail funding requirements
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={formData.funding}
              onChange={handleChange('funding')}
              placeholder="Describe your funding needs, use of funds, and repayment plans..."
            />
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  const handleSave = () => {
    // Here you would typically save the business plan to a backend
    console.log('Saving business plan:', formData);
    alert('Business plan saved successfully!');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Business Plan Template
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Create a comprehensive business plan for your service business
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                Save Business Plan
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default BusinessPlan; 