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

const HalalGuys: React.FC = () => {
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
            From Food Cart to $100M+ Global Franchise
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
            <Typography variant="body1" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUpIcon sx={{ mr: 0.5 }} />
              Revenue: $100M+
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon sx={{ mr: 0.5 }} />
              15 min read
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <StyledPaper elevation={3}>
              <Typography variant="h4" gutterBottom>
                The Backstory
              </Typography>
              <Typography variant="body1" paragraph>
                In 1990, three Egyptian immigrants—Mohamed Abouelenein, Ahmed Elsaka, and Abdelbaset Elsayed—started a hot dog cart in New York City. They noticed many Muslim cab drivers struggling to find halal food options and saw an opportunity to serve their community while building a business.
              </Typography>
            </StyledPaper>

            <StyledPaper elevation={3}>
              <Typography variant="h4" gutterBottom>
                The Turning Point
              </Typography>
              <Typography variant="body1" paragraph>
                The founders switched from hot dogs to halal food, offering a simple menu of chicken, gyro meat, and rice. Word spread quickly among taxi drivers and local office workers. Soon, their cart at 53rd and 6th Avenue became legendary, with lines stretching around the block even at 3 AM.
              </Typography>
            </StyledPaper>

            <StyledPaper elevation={3}>
              <Typography variant="h4" gutterBottom>
                Scaling to Success
              </Typography>
              <Typography variant="body1" paragraph>
                In 2014, The Halal Guys began franchising. Their simple menu, efficient operations, and strong brand recognition made them an attractive franchise opportunity. Today, they have hundreds of locations worldwide and have successfully transformed street food into a global fast-casual phenomenon.
              </Typography>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledPaper elevation={3}>
              <Typography variant="h5" gutterBottom>
                Key Success Factors
              </Typography>
              <Typography variant="body1" paragraph>
                • Identified and served an underserved market
              </Typography>
              <Typography variant="body1" paragraph>
                • Maintained consistent quality and taste
              </Typography>
              <Typography variant="body1" paragraph>
                • Built a strong brand identity
              </Typography>
              <Typography variant="body1" paragraph>
                • Strategic franchise expansion
              </Typography>
            </StyledPaper>

            <StyledPaper elevation={3}>
              <Typography variant="h5" gutterBottom>
                Business Model
              </Typography>
              <Typography variant="body1" paragraph>
                • Simple, focused menu
              </Typography>
              <Typography variant="body1" paragraph>
                • Efficient operations
              </Typography>
              <Typography variant="body1" paragraph>
                • Franchise-based expansion
              </Typography>
              <Typography variant="body1" paragraph>
                • Strong brand recognition
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default HalalGuys; 