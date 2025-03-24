import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme
} from '@mui/material';
import {
  PlayCircle as PlayIcon,
  Download as DownloadIcon,
  School as SchoolIcon,
  VideoLibrary as VideoIcon,
  Description as DescriptionIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon
} from '@mui/icons-material';

const courses = [
  {
    id: 1,
    title: "Wedding Photography Mastery",
    description: "Learn everything you need to know about wedding photography, from equipment to post-processing.",
    image: "https://source.unsplash.com/random/400x300/?wedding-photography",
    duration: "8 weeks",
    level: "Intermediate",
    price: "$199",
    rating: 4.8
  },
  {
    id: 2,
    title: "Event Planning Fundamentals",
    description: "Master the basics of event planning and start your own business.",
    image: "https://source.unsplash.com/random/400x300/?event-planning",
    duration: "6 weeks",
    level: "Beginner",
    price: "$149",
    rating: 4.6
  },
  {
    id: 3,
    title: "Food Truck Business Success",
    description: "Complete guide to starting and running a successful food truck business.",
    image: "https://source.unsplash.com/random/400x300/?food-truck",
    duration: "10 weeks",
    level: "Beginner",
    price: "$249",
    rating: 4.9
  }
];

const webinars = [
  {
    id: 1,
    title: "Marketing Strategies for Service Businesses",
    date: "March 25, 2024",
    time: "2:00 PM EST",
    duration: "1 hour",
    speaker: "Sarah Johnson",
    description: "Learn proven marketing strategies to grow your service business."
  },
  {
    id: 2,
    title: "Pricing Your Services for Maximum Profit",
    date: "April 1, 2024",
    time: "3:00 PM EST",
    duration: "1 hour",
    speaker: "Mike Chen",
    description: "Master the art of pricing your services to maximize revenue."
  },
  {
    id: 3,
    title: "Building a Strong Brand Identity",
    date: "April 8, 2024",
    time: "1:00 PM EST",
    duration: "1 hour",
    speaker: "Emma Davis",
    description: "Create a memorable brand that resonates with your target audience."
  }
];

const resources = [
  {
    id: 1,
    title: "Business Plan Template",
    description: "Professional business plan template with examples and guidelines.",
    type: "PDF",
    size: "2.5 MB",
    downloads: 1234
  },
  {
    id: 2,
    title: "Marketing Calendar Template",
    description: "Comprehensive marketing calendar to plan your promotional activities.",
    type: "Excel",
    size: "1.2 MB",
    downloads: 856
  },
  {
    id: 3,
    title: "Client Contract Template",
    description: "Legal contract template for service providers.",
    type: "Word",
    size: "1.8 MB",
    downloads: 2341
  }
];

const LearningResources = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Learning Resources
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Access premium courses, webinars, and downloadable resources to grow your business
      </Typography>

      {/* Courses Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SchoolIcon /> Online Courses
        </Typography>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} md={4} key={course.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={course.image}
                  alt={course.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {course.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Chip label={course.level} size="small" color="primary" variant="outlined" />
                    <Chip label={course.duration} size="small" />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <StarIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />
                      <Typography variant="body2">{course.rating}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                      {course.price}
                    </Typography>
                    <Button variant="contained" startIcon={<PlayIcon />}>
                      Enroll Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Webinars Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VideoIcon /> Upcoming Webinars
        </Typography>
        <Grid container spacing={3}>
          {webinars.map((webinar) => (
            <Grid item xs={12} md={4} key={webinar.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {webinar.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {webinar.description}
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTimeIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={`${webinar.date} at ${webinar.time}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTimeIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={`Duration: ${webinar.duration}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SchoolIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={`Speaker: ${webinar.speaker}`} />
                    </ListItem>
                  </List>
                  <Button variant="contained" fullWidth startIcon={<PlayIcon />}>
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Resources Section */}
      <Box>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DescriptionIcon /> Resource Library
        </Typography>
        <Grid container spacing={3}>
          {resources.map((resource) => (
            <Grid item xs={12} md={4} key={resource.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {resource.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {resource.description}
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <DescriptionIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={`Type: ${resource.type}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DownloadIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={`Size: ${resource.size}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DownloadIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={`Downloads: ${resource.downloads}`} />
                    </ListItem>
                  </List>
                  <Button variant="outlined" fullWidth startIcon={<DownloadIcon />}>
                    Download
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default LearningResources; 