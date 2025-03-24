import React, { useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, Divider, Button, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { TrendingUp as TrendingUpIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
}));

const Qamaria: React.FC = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ mb: 6 }}>
          <Chip
            label="Food & Beverage"
            color="primary"
            size="medium"
            sx={{ mb: 2 }}
          />
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Building a Modern Coffee Experience
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
            <Typography variant="body1" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUpIcon sx={{ mr: 0.5 }} />
              Revenue: $50,000+
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon sx={{ mr: 0.5 }} />
              10 min read
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <StyledPaper elevation={3}>
              <Typography variant="h4" gutterBottom>
                The Vision
              </Typography>
              <Typography variant="body1" paragraph>
                Qamaria Coffee was born from a desire to blend traditional Middle Eastern coffee culture with modern specialty coffee trends. The founders saw an opportunity to create a unique coffee experience that would appeal to both traditional coffee lovers and those seeking something new and exciting.
              </Typography>
            </StyledPaper>

            <StyledPaper elevation={3}>
              <Typography variant="h4" gutterBottom>
                The Journey
              </Typography>
              <Typography variant="body1" paragraph>
                Starting with a small location in Houston, Qamaria quickly gained attention for its innovative approach to coffee. They combined traditional Arabic coffee preparation methods with modern brewing techniques, creating unique flavor profiles that set them apart in the competitive coffee market.
              </Typography>
            </StyledPaper>

            <StyledPaper elevation={3}>
              <Typography variant="h4" gutterBottom>
                Innovation & Growth
              </Typography>
              <Typography variant="body1" paragraph>
                Qamaria's success comes from their commitment to quality and innovation. They source beans directly from farmers, roast in small batches, and continuously experiment with new flavors and brewing methods. Their modern approach to traditional coffee has created a loyal customer base and strong growth potential.
              </Typography>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledPaper elevation={3}>
              <Typography variant="h5" gutterBottom>
                Key Differentiators
              </Typography>
              <Typography variant="body1" paragraph>
                • Fusion of traditional and modern
              </Typography>
              <Typography variant="body1" paragraph>
                • Direct trade relationships
              </Typography>
              <Typography variant="body1" paragraph>
                • Innovative flavor profiles
              </Typography>
              <Typography variant="body1" paragraph>
                • Quality-focused approach
              </Typography>
            </StyledPaper>

            <StyledPaper elevation={3}>
              <Typography variant="h5" gutterBottom>
                Business Model
              </Typography>
              <Typography variant="body1" paragraph>
                • Premium pricing strategy
              </Typography>
              <Typography variant="body1" paragraph>
                • Direct sourcing
              </Typography>
              <Typography variant="body1" paragraph>
                • In-house roasting
              </Typography>
              <Typography variant="body1" paragraph>
                • Experience-focused retail
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Qamaria; 