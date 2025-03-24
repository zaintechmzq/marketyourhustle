import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme
} from '@mui/material';
import {
  School as SchoolIcon,
  Group as GroupIcon,
  Business as BusinessIcon,
  Article as ArticleIcon,
  VideoLibrary as VideoIcon,
  Assessment as AssessmentIcon,
  Forum as ForumIcon,
  TrendingUp as TrendingUpIcon,
  Description as DescriptionIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Dashboard = () => {
  const theme = useTheme();

  const enhancedContent = [
    {
      title: "Featured Case Study",
      description: "How I Built a $100K Wedding Photography Business",
      icon: <ArticleIcon />,
      link: "/story/featured"
    },
    {
      title: "Latest Success Story",
      description: "From Side Hustle to Full-Time: Food Truck Edition",
      icon: <TrendingUpIcon />,
      link: "/story/latest"
    },
    {
      title: "Video Interview",
      description: "Exclusive Interview with Top Wedding Planner",
      icon: <VideoIcon />,
      link: "/video/interview"
    }
  ];

  const communityFeatures = [
    {
      title: "Community Forum",
      description: "Connect with other entrepreneurs",
      icon: <ForumIcon />,
      link: "/community/forum"
    },
    {
      title: "Live Q&A Session",
      description: "Monthly expert Q&A (Next: March 15)",
      icon: <GroupIcon />,
      link: "/community/qa"
    },
    {
      title: "Success Stories",
      description: "Share your journey with the community",
      icon: <ArticleIcon />,
      link: "/community/stories"
    }
  ];

  const businessTools = [
    {
      title: "Revenue Calculator",
      description: "Calculate your potential earnings",
      icon: <AssessmentIcon />,
      link: "/tools/revenue"
    },
    {
      title: "Business Plan Template",
      description: "Professional business plan builder",
      icon: <DescriptionIcon />,
      link: "/tools/business-plan"
    },
    {
      title: "Marketing Calendar",
      description: "Plan your marketing activities",
      icon: <CalendarIcon />,
      link: "/tools/marketing"
    }
  ];

  const learningResources = [
    {
      title: "Online Courses",
      description: "Step-by-step business courses",
      icon: <SchoolIcon />,
      link: "/learn/courses"
    },
    {
      title: "Webinars",
      description: "Live and recorded expert sessions",
      icon: <VideoIcon />,
      link: "/learn/webinars"
    },
    {
      title: "Resource Library",
      description: "Downloadable guides and templates",
      icon: <ArticleIcon />,
      link: "/learn/resources"
    }
  ];

  const renderSection = (title: string, items: any[], color: string) => (
    <Card sx={{ height: '100%', mb: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ color }}>
          {title}
        </Typography>
        <List>
          {items.map((item, index) => (
            <React.Fragment key={item.title}>
              <ListItem
                button
                component={RouterLink}
                to={item.link}
                sx={{
                  '&:hover': {
                    backgroundColor: `${color}10`,
                  },
                }}
              >
                <ListItemIcon sx={{ color }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  secondary={item.description}
                />
              </ListItem>
              {index < items.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Your Premium Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Access all your premium features and resources
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {renderSection('Enhanced Content', enhancedContent, theme.palette.primary.main)}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderSection('Community Features', communityFeatures, theme.palette.secondary.main)}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderSection('Business Tools', businessTools, '#2ecc71')}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderSection('Learning Resources', learningResources, '#e74c3c')}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 