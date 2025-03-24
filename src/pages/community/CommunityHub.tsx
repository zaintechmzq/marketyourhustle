import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  TextField,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Tabs,
  Tab,
  useTheme,
  Badge
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as EmojiEventsIcon,
  Group as GroupIcon,
  Chat as ChatIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon
} from '@mui/icons-material';

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  category: string;
  tags: string[];
}

interface User {
  id: number;
  name: string;
  avatar: string;
  title: string;
  business: string;
  followers: number;
  following: number;
  posts: number;
}

const CommunityHub = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const posts: Post[] = [
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        avatar: "https://source.unsplash.com/random/100x100/?portrait",
        title: "Wedding Photographer"
      },
      content: "Just wrapped up an amazing wedding shoot! The couple was so happy with the results. Any tips for post-processing wedding photos?",
      likes: 24,
      comments: 8,
      timestamp: "2 hours ago",
      category: "Photography",
      tags: ["wedding", "photography", "tips"]
    },
    {
      id: 2,
      author: {
        name: "Mike Chen",
        avatar: "https://source.unsplash.com/random/100x100/?chef",
        title: "Food Truck Owner"
      },
      content: "Looking for recommendations on the best POS system for a food truck. Currently using Square but thinking about switching.",
      likes: 18,
      comments: 12,
      timestamp: "4 hours ago",
      category: "Food & Beverage",
      tags: ["foodtruck", "pos", "business"]
    },
    {
      id: 3,
      author: {
        name: "Emma Davis",
        avatar: "https://source.unsplash.com/random/100x100/?event-planner",
        title: "Event Planner"
      },
      content: "Just launched my new event planning website! Would love feedback from fellow event planners on the design and content.",
      likes: 32,
      comments: 15,
      timestamp: "6 hours ago",
      category: "Event Planning",
      tags: ["website", "feedback", "launch"]
    }
  ];

  const suggestedUsers: User[] = [
    {
      id: 1,
      name: "Alex Thompson",
      avatar: "https://source.unsplash.com/random/100x100/?artist",
      title: "Creative Director",
      business: "Design Studio",
      followers: 234,
      following: 156,
      posts: 89
    },
    {
      id: 2,
      name: "Lisa Wong",
      avatar: "https://source.unsplash.com/random/100x100/?entrepreneur",
      title: "Beauty Entrepreneur",
      business: "Spa & Wellness",
      followers: 567,
      following: 234,
      posts: 156
    },
    {
      id: 3,
      name: "David Rodriguez",
      avatar: "https://source.unsplash.com/random/100x100/?chef",
      title: "Catering Expert",
      business: "Culinary Services",
      followers: 789,
      following: 345,
      posts: 234
    }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Community Hub
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Connect, share, and grow with fellow entrepreneurs
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Avatar src="https://source.unsplash.com/random/100x100/?user" />
                <TextField
                  fullWidth
                  placeholder="Share your thoughts, ask questions, or start a discussion..."
                  variant="outlined"
                  size="small"
                />
                <Button variant="contained" startIcon={<AddIcon />}>
                  Post
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip icon={<ThumbUpIcon />} label="Share Experience" />
                <Chip icon={<CommentIcon />} label="Ask Question" />
                <Chip icon={<ShareIcon />} label="Share Resource" />
              </Box>
            </CardContent>
          </Card>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ mb: 3 }}
          >
            <Tab label="For You" />
            <Tab label="Following" />
            <Tab label="Trending" />
            <Tab label="Latest" />
          </Tabs>

          {posts.map((post) => (
            <Card key={post.id} sx={{ mb: 2 }}>
              <CardHeader
                avatar={
                  <Avatar src={post.author.avatar} />
                }
                title={post.author.name}
                subheader={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {post.author.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • {post.timestamp}
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <Typography variant="body1" paragraph>
                  {post.content}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  {post.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton size="small">
                    <ThumbUpIcon />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {post.likes}
                    </Typography>
                  </IconButton>
                  <IconButton size="small">
                    <CommentIcon />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {post.comments}
                    </Typography>
                  </IconButton>
                  <IconButton size="small">
                    <ShareIcon />
                  </IconButton>
                  <IconButton size="small">
                    <BookmarkIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Search */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <TextField
                fullWidth
                placeholder="Search community..."
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Suggested Connections */}
          <Card sx={{ mb: 3 }}>
            <CardHeader
              title="Suggested Connections"
              avatar={<GroupIcon />}
            />
            <CardContent>
              <List>
                {suggestedUsers.map((user) => (
                  <React.Fragment key={user.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={user.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.name}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {user.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {user.business}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Button variant="outlined" size="small">
                          Follow
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {user.id !== suggestedUsers.length && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card>
            <CardHeader
              title="Your Community Stats"
              avatar={<EmojiEventsIcon />}
            />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Followers"
                    secondary="234"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Following"
                    secondary="156"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Posts"
                    secondary="89"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Engagement Rate"
                    secondary="4.2%"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CommunityHub; 