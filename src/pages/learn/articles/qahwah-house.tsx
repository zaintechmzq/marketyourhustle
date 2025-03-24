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

const QahwahHouse: React.FC = () => {
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
            How I Built a $100K+ Yemeni Coffee Empire
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
            <Typography variant="body1" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUpIcon sx={{ mr: 0.5 }} />
              Revenue: $100,000+
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon sx={{ mr: 0.5 }} />
              12 min read
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
                Ibrahim Alhasbani grew up in Yemen surrounded by coffee trees. His family had been coffee farmers for centuries, cultivating some of the world's finest coffee beans in the mountainous regions of Yemen. When he moved to the U.S., he realized most Americans had never tasted true Yemeni coffee, and he saw an opportunity to share his heritage.
              </Typography>
            </StyledPaper>

            <StyledPaper elevation={3}>
              <Typography variant="h4" gutterBottom>
                Launch & Early Days
              </Typography>
              <Typography variant="body1" paragraph>
                In 2017, Alhasbani opened his first location in Dearborn, Michigan—a city with a strong Arab-American population. He hand-carried beans from his family's farm in Yemen, ensuring every cup told a story of his homeland. The coffee shop was designed to feel like home, with ornate decor, traditional brewing methods, and warm hospitality.
              </Typography>
            </StyledPaper>

            <StyledPaper elevation={3}>
              <Typography variant="h4" gutterBottom>
                Scaling Up
              </Typography>
              <Typography variant="body1" paragraph>
                Qahwah House has since expanded to Brooklyn, NY, and Lombard, IL, with more locations in the pipeline. The focus has always been on authenticity rather than speed. Each barista is trained in traditional Yemeni brewing techniques, and quality is controlled by sourcing beans exclusively from family-owned farms in Yemen.
              </Typography>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledPaper elevation={3}>
              <Typography variant="h5" gutterBottom>
                Key Insights
              </Typography>
              <Typography variant="body1" paragraph>
                • Your story is your brand: Alhasbani didn't just sell coffee—he sold history.
              </Typography>
              <Typography variant="body1" paragraph>
                • Slow, intentional growth: No rush to franchise. Culture over cash.
              </Typography>
              <Typography variant="body1" paragraph>
                • Community loyalty: Dearborn locals defend Qahwah House as their own.
              </Typography>
            </StyledPaper>

            <StyledPaper elevation={3}>
              <Typography variant="h5" gutterBottom>
                Business Model
              </Typography>
              <Typography variant="body1" paragraph>
                • Direct sourcing from family farms in Yemen
              </Typography>
              <Typography variant="body1" paragraph>
                • Traditional brewing methods
              </Typography>
              <Typography variant="body1" paragraph>
                • Cultural experience-focused retail
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default QahwahHouse; 