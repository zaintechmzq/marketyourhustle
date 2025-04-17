import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
} from '@mui/material';
import {
  Build as BuildIcon,
  Calculate as CalculateIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Schedule as ScheduleIcon,
  MonetizationOn as MonetizationOnIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const tools = [
  {
    id: 1,
    title: "Revenue Calculator",
    description: "Calculate potential revenue and profit margins for your service business.",
    icon: <MonetizationOnIcon />,
    category: "Finance",
    path: "/tools/revenue-calculator",
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: "Pricing Strategy Tool",
    description: "Determine optimal pricing for your services based on market research and costs.",
    icon: <CalculateIcon />,
    category: "Finance",
    path: "/tools/pricing-strategy",
    image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: "Appointment Scheduler",
    description: "Manage your service appointments and client bookings efficiently.",
    icon: <ScheduleIcon />,
    category: "Operations",
    path: "/tools/appointment-scheduler",
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    title: "Business Analytics",
    description: "Track and analyze your business performance metrics.",
    icon: <AssessmentIcon />,
    category: "Analytics",
    path: "/tools/business-analytics",
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    title: "Growth Planner",
    description: "Plan and track your business growth milestones.",
    icon: <TimelineIcon />,
    category: "Planning",
    path: "/tools/growth-planner",
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    title: "Service Cost Calculator",
    description: "Calculate the true cost of providing your services.",
    icon: <BuildIcon />,
    category: "Finance",
    path: "/tools/cost-calculator",
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&auto=format&fit=crop&q=80'
  }
];

const BusinessTools = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Business Tools
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Interactive tools and calculators to help you plan, manage, and grow your service business
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {tools.map((tool) => (
          <Grid item xs={12} md={4} key={tool.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={tool.image}
                alt={tool.title}
                sx={{ 
                  objectFit: 'cover',
                  borderBottom: '1px solid rgba(0,0,0,0.1)'
                }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    icon={tool.icon}
                    label={tool.category}
                    size="small"
                    color="primary"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {tool.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {tool.description}
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={() => navigate(tool.path)}
                  startIcon={tool.icon}
                  sx={{ mt: 'auto' }}
                >
                  Launch Tool
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BusinessTools; 