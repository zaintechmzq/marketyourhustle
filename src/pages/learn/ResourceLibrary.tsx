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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Download as DownloadIcon,
  AccessTime as AccessTimeIcon,
  CloudDownload as CloudDownloadIcon,
} from '@mui/icons-material';

const resources = [
  {
    id: 1,
    title: "Business Plan Template",
    description: "Comprehensive business plan template with examples and guidelines for service-based businesses.",
    type: "Template",
    format: "PDF",
    size: "2.5 MB",
    category: "Planning",
    downloads: 1234,
    image: "https://source.unsplash.com/random/400x300/?business-plan"
  },
  {
    id: 2,
    title: "Marketing Strategy Guide",
    description: "Step-by-step guide to creating and implementing a marketing strategy for your service business.",
    type: "Guide",
    format: "PDF",
    size: "3.1 MB",
    category: "Marketing",
    downloads: 856,
    image: "https://source.unsplash.com/random/400x300/?marketing"
  },
  {
    id: 3,
    title: "Service Pricing Calculator",
    description: "Excel spreadsheet to help you calculate optimal pricing for your services.",
    type: "Tool",
    format: "Excel",
    size: "1.2 MB",
    category: "Finance",
    downloads: 2341,
    image: "https://source.unsplash.com/random/400x300/?calculator"
  },
  {
    id: 4,
    title: "Client Contract Template",
    description: "Professional contract template for service providers with legal guidelines.",
    type: "Template",
    format: "Word",
    size: "1.8 MB",
    category: "Legal",
    downloads: 1567,
    image: "https://source.unsplash.com/random/400x300/?contract"
  },
  {
    id: 5,
    title: "Social Media Content Calendar",
    description: "Monthly content calendar template with post ideas and scheduling tools.",
    type: "Template",
    format: "Excel",
    size: "1.5 MB",
    category: "Marketing",
    downloads: 1890,
    image: "https://source.unsplash.com/random/400x300/?social-media"
  },
  {
    id: 6,
    title: "Service Business Checklist",
    description: "Comprehensive checklist for starting and running a service-based business.",
    type: "Guide",
    format: "PDF",
    size: "1.1 MB",
    category: "Planning",
    downloads: 2156,
    image: "https://source.unsplash.com/random/400x300/?checklist"
  }
];

const ResourceLibrary = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Resource Library
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Download free templates, guides, and tools to help grow your service business
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {resources.map((resource) => (
          <Grid item xs={12} md={4} key={resource.id}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={resource.image}
                alt={resource.title}
              />
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    icon={<DescriptionIcon />}
                    label={resource.type}
                    size="small"
                    color="primary"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {resource.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {resource.description}
                  </Typography>
                </Box>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <DescriptionIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={`Format: ${resource.format}`}
                      secondary={`Size: ${resource.size}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CloudDownloadIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={`${resource.downloads} downloads`} />
                  </ListItem>
                </List>
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<DownloadIcon />}
                  sx={{ mt: 2 }}
                >
                  Download {resource.format}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ResourceLibrary; 