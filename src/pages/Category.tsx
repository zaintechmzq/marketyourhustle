import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

interface Story {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  revenue: string;
  readTime: string;
  tags: string[];
}

// This would typically come from an API or database
const storiesByCategory: { [key: string]: Story[] } = {
  'wedding-services': [
    {
      id: 1,
      title: "How I Built a $50K Wedding Photography Business",
      category: "Wedding Services",
      image: "https://source.unsplash.com/random/800x600/?wedding-photography",
      excerpt: "From starting with a basic DSLR to becoming one of the most sought-after wedding photographers in the city...",
      revenue: "$50,000",
      readTime: "8 min read",
      tags: ["Photography", "Wedding Services", "Entrepreneurship"]
    },
    {
      id: 2,
      title: "The Art of Wedding Decor: A $75K Success Story",
      category: "Wedding Services",
      image: "https://source.unsplash.com/random/800x600/?wedding-decoration",
      excerpt: "How I turned my passion for floral arrangements into a thriving wedding decor business...",
      revenue: "$75,000",
      readTime: "10 min read",
      tags: ["Wedding Decor", "Floral Design", "Event Planning"]
    },
    {
      id: 3,
      title: "Wedding Catering: From Home Kitchen to Full-Service Business",
      category: "Wedding Services",
      image: "https://source.unsplash.com/random/800x600/?wedding-catering",
      excerpt: "A journey from cooking for friends' weddings to running a successful catering company...",
      revenue: "$100,000",
      readTime: "12 min read",
      tags: ["Catering", "Food Service", "Event Planning"]
    }
  ],
  'party-entertainment': [
    {
      id: 4,
      title: "Party Clowning: From Side Hustle to Full-Time Career",
      category: "Party Entertainment",
      image: "https://source.unsplash.com/random/800x600/?clown",
      excerpt: "How I turned my love for making people laugh into a successful entertainment business...",
      revenue: "$45,000",
      readTime: "7 min read",
      tags: ["Entertainment", "Party Services", "Performance"]
    },
    {
      id: 5,
      title: "DJ Business: Spinning Success at Events",
      category: "Party Entertainment",
      image: "https://source.unsplash.com/random/800x600/?dj",
      excerpt: "Building a thriving DJ business through networking and social media...",
      revenue: "$60,000",
      readTime: "9 min read",
      tags: ["DJ", "Music", "Event Entertainment"]
    }
  ],
  'cultural-services': [
    {
      id: 6,
      title: "Henna Art: Building a Cultural Business",
      category: "Cultural Services",
      image: "https://source.unsplash.com/random/800x600/?henna",
      excerpt: "How I turned traditional henna art into a modern, profitable business...",
      revenue: "$35,000",
      readTime: "6 min read",
      tags: ["Henna", "Cultural Services", "Beauty"]
    }
  ]
};

const Category: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const stories = storiesByCategory[category || ''] || [];
  const categoryTitle = category?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            {categoryTitle} Stories
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Discover how entrepreneurs built successful businesses in {categoryTitle}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {stories.map((story) => (
            <Grid item xs={12} md={6} key={story.id}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={story.image}
                    alt={story.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {story.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {story.excerpt}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {story.tags.map((tag: string) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="primary">
                        Revenue: {story.revenue}
                      </Typography>
                      <Button
                        component={RouterLink}
                        to={`/story/${story.id}`}
                        variant="outlined"
                        size="small"
                      >
                        Read More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {stories.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" gutterBottom>
              No stories found in this category
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Check back later for stories about {categoryTitle}
            </Typography>
          </Box>
        )}
      </motion.div>
    </Container>
  );
};

export default Category; 