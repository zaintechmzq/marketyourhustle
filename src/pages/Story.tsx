import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, Grid, Chip, Divider } from '@mui/material';
import { motion } from 'framer-motion';

interface ContentSection {
  type: 'text' | 'stats';
  content?: string;
  title?: string;
  items?: Array<{
    label: string;
    value: string;
  }>;
}

interface Story {
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  revenue: string;
  image: string;
  content: ContentSection[];
  tags: string[];
  tools: string[];
}

interface StoryData {
  [key: number]: Story;
}

// This would typically come from an API or database
const storyData: StoryData = {
  1: {
    title: "How I Built a $50K Wedding Photography Business",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Wedding Services",
    revenue: "$50,000",
    image: "https://source.unsplash.com/random/1200x600/?wedding-photography",
    content: [
      {
        type: "text",
        content: "In 2020, I was working as a corporate photographer, taking headshots and product photos. While it paid the bills, I knew I wanted more. My passion was capturing the raw emotions and beautiful moments of weddings."
      },
      {
        type: "text",
        content: "I started by offering free wedding photography to friends and family in exchange for testimonials and portfolio pieces. This helped me build a solid foundation of work to showcase to potential clients."
      },
      {
        type: "text",
        content: "The turning point came when I invested in better equipment and created a professional website. Suddenly, I was getting inquiries from complete strangers who had found me through Google searches."
      },
      {
        type: "stats",
        title: "Key Metrics",
        items: [
          { label: "Starting Investment", value: "$2,500" },
          { label: "First Year Revenue", value: "$15,000" },
          { label: "Current Annual Revenue", value: "$50,000" },
          { label: "Number of Weddings", value: "25+" }
        ]
      },
      {
        type: "text",
        content: "My marketing strategy focused on Instagram and Pinterest, where I shared behind-the-scenes content and beautiful wedding photos. This helped me build a following of engaged couples planning their weddings."
      },
      {
        type: "text",
        content: "The most important lesson I learned was the value of building relationships with other wedding vendors. By networking with planners, venues, and other photographers, I was able to get referrals and grow my business organically."
      }
    ],
    tags: ["Photography", "Wedding Services", "Entrepreneurship", "Marketing"],
    tools: [
      "Canon EOS R5",
      "Adobe Lightroom",
      "Squarespace",
      "Instagram",
      "Pinterest"
    ]
  }
};

const Story: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const story = storyData[Number(id)];

  if (!story) {
    return (
      <Container>
        <Typography variant="h4">Story not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            {story.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              By {story.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {story.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {story.readTime}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            {story.tags.map((tag: string) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <img
                src={story.image}
                alt={story.title}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '24px' }}
              />
              {story.content.map((section: ContentSection, index: number) => (
                <Box key={index} sx={{ mb: 3 }}>
                  {section.type === 'text' && (
                    <Typography variant="body1" paragraph>
                      {section.content}
                    </Typography>
                  )}
                  {section.type === 'stats' && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {section.title}
                      </Typography>
                      <Grid container spacing={2}>
                        {section.items?.map((item: { label: string; value: string }, i: number) => (
                          <Grid item xs={6} key={i}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                              <Typography variant="h6" color="primary">
                                {item.value}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.label}
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}
                </Box>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Tools & Resources Used
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {story.tools.map((tool: string) => (
                  <Chip key={tool} label={tool} />
                ))}
              </Box>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Revenue
              </Typography>
              <Typography variant="h4" color="primary">
                {story.revenue}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Annual Revenue
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Story; 