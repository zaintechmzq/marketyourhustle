import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
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
  AttachMoney as MoneyIcon,
  Campaign as CampaignIcon,
  Assignment as AssignmentIcon,
  Instagram as InstagramIcon,
  Calculate as CalculateIcon,
  Handshake as HandshakeIcon,
} from '@mui/icons-material';

const resources = [
  {
    id: 1,
    title: "Halal Business Plan Template",
    description: "Comprehensive business plan template specifically designed for Muslim entrepreneurs, including sections for halal certification, Islamic finance considerations, and ethical business practices.",
    type: "Template",
    format: "PDF & Word",
    size: "3.2 MB",
    category: "Planning",
    downloads: 2345,
    icon: <AssignmentIcon />
  },
  {
    id: 2,
    title: "Social Media Content Calendar (Islamic Occasions)",
    description: "12-month content calendar with key Islamic dates, Ramadan marketing ideas, and Eid promotions. Includes ready-to-use post templates and hashtag suggestions.",
    type: "Template",
    format: "Excel",
    size: "2.8 MB",
    category: "Marketing",
    downloads: 1876,
    icon: <InstagramIcon />
  },
  {
    id: 3,
    title: "Halal Service Pricing Calculator",
    description: "Advanced Excel calculator to help price your services fairly and profitably, considering zakat obligations and ethical pricing principles.",
    type: "Tool",
    format: "Excel",
    size: "1.5 MB",
    category: "Finance",
    downloads: 3210,
    icon: <CalculateIcon />
  },
  {
    id: 4,
    title: "Shariah-Compliant Contract Templates",
    description: "Professional contract templates reviewed by Islamic scholars, ensuring your business agreements are both legally sound and Shariah-compliant.",
    type: "Template",
    format: "Word",
    size: "2.1 MB",
    category: "Legal",
    downloads: 1987,
    icon: <HandshakeIcon />
  },
  {
    id: 5,
    title: "Digital Marketing Guide for Muslim Businesses",
    description: "Comprehensive guide on digital marketing strategies, including tips for modest advertising, targeting Muslim consumers, and building an authentic brand.",
    type: "Guide",
    format: "PDF",
    size: "4.2 MB",
    category: "Marketing",
    downloads: 2543,
    icon: <CampaignIcon />
  },
  {
    id: 6,
    title: "Islamic Finance & Budgeting Template",
    description: "Financial planning templates that incorporate Islamic principles, including profit-sharing calculations, zakat tracking, and interest-free financial projections.",
    type: "Template",
    format: "Excel",
    size: "2.3 MB",
    category: "Finance",
    downloads: 2890,
    icon: <MoneyIcon />
  }
];

const ResourceLibrary = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Resource Library
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Download professional templates, guides, and tools designed specifically for Muslim entrepreneurs to build and grow their service businesses.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {resources.map((resource) => (
          <Grid item xs={12} md={4} key={resource.id}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.shadows[4]
              }
            }}>
              <Box sx={{ 
                height: 140, 
                bgcolor: 'primary.main', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                {React.cloneElement(resource.icon, { sx: { fontSize: 60 } })}
              </Box>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    icon={<DescriptionIcon />}
                    label={resource.type}
                    size="small"
                    color="primary"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {resource.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {resource.description}
                  </Typography>
                </Box>
                <List dense sx={{ mt: 'auto' }}>
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
                    <ListItemText primary={`${resource.downloads.toLocaleString()} downloads`} />
                  </ListItem>
                </List>
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<DownloadIcon />}
                  sx={{ 
                    mt: 2,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
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