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
  Star as StarIcon,
  Article as ArticleIcon,
  AutoStories as AutoStoriesIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: "Wedding Photography Mastery",
    description: "Learn everything you need to know about wedding photography, from equipment to post-processing.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80",
    duration: "8 weeks",
    level: "Intermediate",
    price: "$199",
    rating: 4.8
  },
  {
    id: 2,
    title: "Event Planning Fundamentals",
    description: "Master the basics of event planning and start your own business.",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&auto=format&fit=crop&q=80",
    duration: "6 weeks",
    level: "Beginner",
    price: "$149",
    rating: 4.6
  },
  {
    id: 3,
    title: "Food Truck Business Success",
    description: "Complete guide to starting and running a successful food truck business.",
    image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=800&auto=format&fit=crop&q=80",
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

const resourceArticles = [
  {
    id: 1,
    title: "Essential Tools to Automate Your Service Business",
    description: "Discover the best tools and strategies to streamline your operations and grow your business efficiently.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
    readTime: "15 min read",
    category: "Business Tools",
    path: "/learn/articles/business-automation-tools"
  },
  {
    id: 2,
    title: "From Side Gig to Full-Time: Dog Walker Success Story",
    description: "How a passionate dog lover built a thriving business with 50+ regular clients using MarketHustle.",
    image: "https://images.unsplash.com/photo-1494947665470-20322015e3a8?w=800&auto=format&fit=crop&q=80",
    readTime: "12 min read",
    category: "Success Story",
    path: "/learn/articles/dog-walker-success"
  }
];

const LearningResources = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Learning Resources
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          sx={{ 
            maxWidth: '600px', 
            mx: 'auto',
            mb: 4 
          }}
        >
          Access premium courses, webinars, and downloadable resources to grow your business
        </Typography>
      </Box>

      {/* Resource Articles Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" gutterBottom sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          fontWeight: 600,
          mb: 3
        }}>
          <ArticleIcon /> Resource Articles
        </Typography>
        <Grid container spacing={4}>
          {resourceArticles.map((article) => (
            <Grid item xs={12} md={6} key={article.id}>
              <Card 
                component={RouterLink}
                to={article.path}
                sx={{ 
                  height: '100%',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: (theme) => `0 12px 24px ${theme.palette.primary.light}25`,
                  },
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  <CardMedia
                    component="img"
                    image={article.image}
                    alt={article.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      icon={<AutoStoriesIcon />} 
                      label={article.category} 
                      size="small" 
                      color="primary" 
                      sx={{ mb: 2 }} 
                    />
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 1
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      paragraph
                      sx={{ mb: 2 }}
                    >
                      {article.description}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    pt: 2
                  }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <AccessTimeIcon sx={{ fontSize: 16 }} />
                      {article.readTime}
                    </Typography>
                    <Button 
                      variant="text" 
                      size="small"
                      sx={{ 
                        fontWeight: 600,
                        '&:hover': { backgroundColor: 'transparent' }
                      }}
                    >
                      Read Article →
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Courses Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" gutterBottom sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          fontWeight: 600,
          mb: 3
        }}>
          <SchoolIcon /> Online Courses
        </Typography>
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item xs={12} md={4} key={course.id}>
              <Card sx={{ 
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) => `0 12px 24px ${theme.palette.primary.light}25`,
                },
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
              }}>
                <Box sx={{ position: 'relative', paddingTop: '60%' }}>
                  <CardMedia
                    component="img"
                    image={course.image}
                    alt={course.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      mb: 1
                    }}
                  >
                    {course.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{ mb: 2 }}
                  >
                    {course.description}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    mb: 3,
                    flexWrap: 'wrap'
                  }}>
                    <Chip 
                      label={course.level} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                    />
                    <Chip 
                      label={course.duration} 
                      size="small"
                      sx={{ borderRadius: 1 }}
                    />
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5,
                      ml: 'auto'
                    }}>
                      <StarIcon 
                        fontSize="small" 
                        sx={{ color: theme.palette.warning.main }} 
                      />
                      <Typography variant="body2">{course.rating}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    pt: 2
                  }}>
                    <Typography 
                      variant="h6" 
                      color="primary"
                      sx={{ fontWeight: 600 }}
                    >
                      {course.price}
                    </Typography>
                    <Button 
                      variant="contained"
                      startIcon={<PlayIcon />}
                      sx={{ 
                        borderRadius: 1,
                        textTransform: 'none'
                      }}
                    >
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
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" gutterBottom sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          fontWeight: 600,
          mb: 3
        }}>
          <VideoIcon /> Upcoming Webinars
        </Typography>
        <Grid container spacing={4}>
          {webinars.map((webinar) => (
            <Grid item xs={12} md={4} key={webinar.id}>
              <Card sx={{ 
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) => `0 12px 24px ${theme.palette.primary.light}25`,
                },
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      mb: 1
                    }}
                  >
                    {webinar.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{ mb: 3 }}
                  >
                    {webinar.description}
                  </Typography>
                  <List dense sx={{ mb: 3 }}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <AccessTimeIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${webinar.date} at ${webinar.time}`}
                        primaryTypographyProps={{
                          variant: 'body2',
                          fontWeight: 500
                        }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <AccessTimeIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`Duration: ${webinar.duration}`}
                        primaryTypographyProps={{
                          variant: 'body2',
                          fontWeight: 500
                        }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <SchoolIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`Speaker: ${webinar.speaker}`}
                        primaryTypographyProps={{
                          variant: 'body2',
                          fontWeight: 500
                        }}
                      />
                    </ListItem>
                  </List>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    startIcon={<PlayIcon />}
                    sx={{ 
                      borderRadius: 1,
                      textTransform: 'none'
                    }}
                  >
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
        <Typography variant="h5" gutterBottom sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          fontWeight: 600,
          mb: 3
        }}>
          <DescriptionIcon /> Resource Library
        </Typography>
        <Grid container spacing={4}>
          {resources.map((resource) => (
            <Grid item xs={12} md={4} key={resource.id}>
              <Card sx={{ 
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) => `0 12px 24px ${theme.palette.primary.light}25`,
                },
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      mb: 1
                    }}
                  >
                    {resource.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{ mb: 3 }}
                  >
                    {resource.description}
                  </Typography>
                  <List dense sx={{ mb: 3 }}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <DescriptionIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`Type: ${resource.type}`}
                        primaryTypographyProps={{
                          variant: 'body2',
                          fontWeight: 500
                        }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <DownloadIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`Size: ${resource.size}`}
                        primaryTypographyProps={{
                          variant: 'body2',
                          fontWeight: 500
                        }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <DownloadIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`Downloads: ${resource.downloads}`}
                        primaryTypographyProps={{
                          variant: 'body2',
                          fontWeight: 500
                        }}
                      />
                    </ListItem>
                  </List>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<DownloadIcon />}
                    sx={{ 
                      borderRadius: 1,
                      textTransform: 'none'
                    }}
                  >
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