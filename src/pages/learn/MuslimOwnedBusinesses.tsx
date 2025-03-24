import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

// Import images from assets
import qawahHouseImg from '../../assets/images/qawahhouse.jpg';
import qamariaImg from '../../assets/images/qamaria.png';
import halalGuysImg from '../../assets/images/THE-HALAL-GUYS.jpg';

const StyledCard = styled(RouterLink)<LinkProps>(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  textDecoration: 'none',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const MotionBox = motion(Box);

const MuslimOwnedBusinesses: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
          Brewing Success & Building Legacy: Muslim Entrepreneurs Who Changed the Game
        </Typography>
        
        <Typography variant="h5" color="text.secondary" paragraph align="center" sx={{ mb: 8 }}>
          In a time when immigrant narratives are reshaping business in America, Muslim founders—especially from the brown and Arab diaspora—are turning cultural roots into competitive advantages.
        </Typography>

        <Grid container spacing={4}>
          {/* Qahwah House Section */}
          <Grid item xs={12} md={4}>
            <StyledCard to="/learn/articles/qahwah-house">
              <Card>
                <CardMedia
                  component="img"
                  height="240"
                  image={qawahHouseImg}
                  alt="Qahwah House"
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Qahwah House
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Founder: Ibrahim Alhasbani
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Bringing 500-year-old Yemeni coffee tradition to the U.S., Qahwah House has grown from a single location in Dearborn to multiple locations across the country.
                  </Typography>
                  <Button variant="outlined" color="primary" fullWidth>
                    Read Full Story
                  </Button>
                </CardContent>
              </Card>
            </StyledCard>
          </Grid>

          {/* Qamaria Section */}
          <Grid item xs={12} md={4}>
            <StyledCard to="/learn/articles/qamaria">
              <Card>
                <CardMedia
                  component="img"
                  height="240"
                  image={qamariaImg}
                  alt="Qamaria Yemeni Coffee Co."
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Qamaria Yemeni Coffee Co.
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Founder: Hatem Al-Eidaroos
                  </Typography>
                  <Typography variant="body1" paragraph>
                    A fast-scaling, modern Yemeni coffee shop capturing national buzz with its unique blend of traditional Yemeni coffee and contemporary café culture.
                  </Typography>
                  <Button variant="outlined" color="primary" fullWidth>
                    Read Full Story
                  </Button>
                </CardContent>
              </Card>
            </StyledCard>
          </Grid>

          {/* Halal Guys Section */}
          <Grid item xs={12} md={4}>
            <StyledCard to="/learn/articles/halal-guys">
              <Card>
                <CardMedia
                  component="img"
                  height="240"
                  image={halalGuysImg}
                  alt="The Halal Guys"
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    The Halal Guys
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Founders: Mohamed Abouelenein, Ahmed Elsaka, and Abdelbaset Elsayed
                  </Typography>
                  <Typography variant="body1" paragraph>
                    From a humble food cart to a global fast-casual empire, The Halal Guys have revolutionized halal street food in America.
                  </Typography>
                  <Button variant="outlined" color="primary" fullWidth>
                    Read Full Story
                  </Button>
                </CardContent>
              </Card>
            </StyledCard>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom align="center">
            Key Lessons for Muslim Entrepreneurs
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Heritage Matters</Typography>
              <Typography variant="body1">
                Each business leveraged their cultural heritage as a unique selling point, turning traditional practices into modern success stories.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Start Local, Think Global</Typography>
              <Typography variant="body1">
                All three businesses started by serving their local communities before expanding to reach a broader audience.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Branding Is Everything</Typography>
              <Typography variant="body1">
                Strong, consistent branding helped these businesses stand out and build lasting customer relationships.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Want More Founder Stories Like This?
          </Typography>
          <Typography variant="body1" paragraph>
            We're building the first Muslim-centered business storytelling platform—just like Starter Story, but tailored for us.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Join the Waitlist
          </Button>
        </Box>
      </MotionBox>
    </Container>
  );
};

export default MuslimOwnedBusinesses; 