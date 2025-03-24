import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  useTheme,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const Forum = () => {
  const theme = useTheme();
  const [openNewPost, setOpenNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '' });
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "How to price wedding photography packages?",
      content: "I'm starting my wedding photography business and need help with pricing strategies...",
      author: "Sarah Johnson",
      category: "Wedding Services",
      likes: 24,
      comments: 12,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "Marketing tips for food truck business",
      content: "Looking for effective marketing strategies for my new food truck...",
      author: "Mike Chen",
      category: "Food & Beverage",
      likes: 18,
      comments: 8,
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      title: "Event planning software recommendations",
      content: "What software do you use to manage your event planning business?",
      author: "Emma Davis",
      category: "Event Planning",
      likes: 15,
      comments: 6,
      timestamp: "1 day ago"
    }
  ]);

  const categories = [
    'Wedding Services',
    'Party Entertainment',
    'Cultural Services',
    'Food & Beverage',
    'Creative Services',
    'Event Planning',
    'Beauty & Wellness',
    'Photography',
    'Art & Design',
    'Seasonal Services'
  ];

  const handleCreatePost = () => {
    const post: Post = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: "Current User", // Replace with actual user
      category: newPost.category,
      likes: 0,
      comments: 0,
      timestamp: "Just now"
    };
    setPosts([post, ...posts]);
    setOpenNewPost(false);
    setNewPost({ title: '', content: '', category: '' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">
          Community Forum
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewPost(true)}
        >
          New Post
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper>
            <List>
              {posts.map((post, index) => (
                <React.Fragment key={post.id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>{post.author[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" component="div">
                            {post.title}
                          </Typography>
                          <Chip
                            label={post.category}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            sx={{ display: 'block', mb: 1 }}
                          >
                            {post.content}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="caption" color="text.secondary">
                              Posted by {post.author} • {post.timestamp}
                            </Typography>
                            <IconButton size="small">
                              <ThumbUpIcon fontSize="small" />
                              <Typography variant="caption" sx={{ ml: 0.5 }}>
                                {post.likes}
                              </Typography>
                            </IconButton>
                            <IconButton size="small">
                              <CommentIcon fontSize="small" />
                              <Typography variant="caption" sx={{ ml: 0.5 }}>
                                {post.comments}
                              </Typography>
                            </IconButton>
                            <IconButton size="small">
                              <ShareIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {index < posts.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => {}}
                  variant="outlined"
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openNewPost} onClose={() => setOpenNewPost(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <TextField
              label="Category"
              select
              fullWidth
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Content"
              multiline
              rows={4}
              fullWidth
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewPost(false)}>Cancel</Button>
          <Button onClick={handleCreatePost} variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Forum; 