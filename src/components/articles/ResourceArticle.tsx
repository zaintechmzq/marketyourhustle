import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Link,
  useTheme,
  useMediaQuery,
  Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  MenuBook as MenuBookIcon,
  Download as DownloadIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  TipsAndUpdates as TipsIcon,
  Star as StarIcon,
  KeyboardDoubleArrowRight as ArrowIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const MotionBox = motion(Box);

interface TableOfContentsItem {
  title: string;
  anchor: string;
}

interface ResourceDownload {
  title: string;
  description: string;
  link: string;
}

interface RelatedArticle {
  title: string;
  description: string;
  link: string;
}

interface ResourceArticleProps {
  title: string;
  summary: string;
  tableOfContents: TableOfContentsItem[];
  content: {
    [key: string]: {
      title: string;
      content: string[];
      tips?: string[];
      keyPoints?: string[];
    };
  };
  downloads?: ResourceDownload[];
  relatedArticles?: RelatedArticle[];
}

const ResourceArticle: React.FC<ResourceArticleProps> = ({
  title,
  summary,
  tableOfContents,
  content,
  downloads,
  relatedArticles,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Table of Contents component
  const TableOfContentsNav = () => (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        height: 'fit-content'
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <MenuBookIcon color="primary" />
        Table of Contents
      </Typography>
      <Stack spacing={1}>
        {tableOfContents.map((item, index) => (
          <Box
            key={index}
            component="a"
            href={`#${item.anchor}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.primary',
              textDecoration: 'none',
              py: 0.75,
              px: 1.5,
              borderRadius: 1,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'primary.main',
                transform: 'translateX(4px)'
              }
            }}
          >
            <ArrowIcon sx={{ fontSize: 16, mr: 1.5, color: 'primary.main' }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {item.title}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );

  // Downloads section component
  const DownloadsSection = () => downloads && downloads.length > 0 ? (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 3, 
        mb: 4,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Resources & Downloads
      </Typography>
      <Stack spacing={2}>
        {downloads.map((download, index) => (
          <Box key={index} sx={{ p: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              {download.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {download.description}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<DownloadIcon />}
              component={Link}
              href={download.link}
              target="_blank"
              sx={{ color: 'primary.main' }}
            >
              Download
            </Button>
          </Box>
        ))}
      </Stack>
    </Paper>
  ) : null;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          py: 8,
          textAlign: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          mb: 6
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            {summary}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8} sx={{ mb: { xs: 4, md: 0 } }}>
            {/* Mobile Table of Contents */}
            {isMobile && <TableOfContentsNav />}

            {Object.entries(content).map(([anchor, section]) => (
              <Box 
                key={anchor} 
                id={anchor} 
                sx={{ 
                  mb: 8,
                  scrollMarginTop: '100px'
                }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    mb: 3,
                    pb: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  {section.title}
                </Typography>
                
                {section.content.map((paragraph, i) => (
                  <Typography 
                    key={i} 
                    paragraph
                    sx={{
                      color: 'text.primary',
                      lineHeight: 1.8,
                      mb: 2
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}

                {section.keyPoints && (
                  <Box sx={{ 
                    mt: 4, 
                    p: 3, 
                    bgcolor: (theme) => theme.palette.mode === 'light' ? 'grey.50' : 'grey.900',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        color: 'primary.main', 
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2
                      }}
                    >
                      <StarIcon />
                      Key Points
                    </Typography>
                    <List dense>
                      {section.keyPoints.map((point, i) => (
                        <ListItem key={i} sx={{ py: 1 }}>
                          <ListItemIcon>
                            <CheckCircleIcon sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={point}
                            primaryTypographyProps={{
                              color: 'text.primary',
                              fontWeight: 500
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {section.tips && (
                  <Box sx={{ 
                    mt: 4, 
                    p: 3, 
                    bgcolor: (theme) => theme.palette.mode === 'light' ? 'grey.50' : 'grey.900',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        color: 'primary.main', 
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2
                      }}
                    >
                      <TipsIcon />
                      Pro Tips
                    </Typography>
                    <List dense>
                      {section.tips.map((tip, i) => (
                        <ListItem key={i} sx={{ py: 1 }}>
                          <ListItemIcon>
                            <ArrowIcon sx={{ color: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={tip}
                            primaryTypographyProps={{
                              color: 'text.primary',
                              fontWeight: 500
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Box>
            ))}

            {/* Mobile Downloads Section */}
            {isMobile && <DownloadsSection />}
          </Grid>

          {/* Right Sidebar for larger screens */}
          {!isMobile && (
            <Grid item md={4}>
              <Box sx={{ 
                position: 'relative',
                height: '100%'
              }}>
                <Box sx={{
                  position: 'sticky',
                  top: '24px',
                  maxHeight: 'calc(100vh - 100px)',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4
                }}>
                  <TableOfContentsNav />
                  <DownloadsSection />
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ResourceArticle; 