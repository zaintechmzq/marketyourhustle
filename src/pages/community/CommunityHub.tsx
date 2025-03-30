import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { usePosts, useComments, useNotifications } from '../../hooks/useFirebase';
import { Post as PostType } from '../../types/community';
import { auth } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Auth from '../../components/Auth';
import Post from '../../components/Post';
import RichTextEditor from '../../components/RichTextEditor';

type NewPost = Pick<PostType, 'title' | 'content' | 'category' | 'tags' | 'authorId'>;

const CommunityHub = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newPostDialogOpen, setNewPostDialogOpen] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [newPost, setNewPost] = useState<NewPost>({
    title: '',
    content: '',
    category: '',
    tags: [],
    authorId: auth.currentUser?.uid || '',
  });
  const [activePostId, setActivePostId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed in CommunityHub:", user?.uid);
      setCurrentUser(user);
      setIsAuthChecking(false);

      if (!user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const { posts, loading: postsLoading, error: postsError, createPost } = usePosts(selectedCategory || undefined);
  const { notifications, loading: notificationsLoading } = useNotifications();
  const { addComment } = useComments(activePostId || '');

  const unreadNotifications = notifications.filter(n => !n.read).length;

  if (isAuthChecking) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!currentUser) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Sign in to join the community
        </Typography>
        <Auth />
      </Box>
    );
  }

  const handleCreatePost = async () => {
    if (!currentUser) {
      console.error('No user found');
      return;
    }

    try {
      await createPost({
        ...newPost,
        authorId: currentUser.uid,
        isHtml: true,
      });
      setNewPostDialogOpen(false);
      setNewPost({
        title: '',
        content: '',
        category: '',
        tags: [],
        authorId: currentUser.uid,
      });
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  const handleAddComment = async (postId: string, content: string) => {
    if (!currentUser) {
      console.error('No user found');
      return;
    }

    try {
      setActivePostId(postId);
      await addComment(content);
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', pt: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Community Hub
        </Typography>
        <Grid container spacing={3}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={3}>
            <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              <List>
                <ListItem
                  button
                  selected={!selectedCategory}
                  onClick={() => setSelectedCategory(null)}
                >
                  <ListItemText primary="All" />
                </ListItem>
                {['Questions', 'Success Stories', 'Tips', 'Resources'].map((category) => (
                  <ListItem
                    key={category}
                    button
                    selected={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <ListItemText primary={category} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Share your thoughts..."
                onClick={() => setNewPostDialogOpen(true)}
                InputProps={{
                  endAdornment: (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={() => setNewPostDialogOpen(true)}
                    >
                      Post
                    </Button>
                  ),
                }}
              />
            </Box>

            {postsLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : postsError ? (
              <Alert severity="error" sx={{ mb: 2 }}>{postsError}</Alert>
            ) : posts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="text.secondary">
                  No posts yet. Be the first to post!
                </Typography>
              </Box>
            ) : (
              posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  onComment={(content) => handleAddComment(post.id, content)}
                />
              ))
            )}
          </Grid>

          {/* Right Sidebar */}
          <Grid item xs={12} md={3}>
            <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUpIcon />
                Trending Topics
              </Typography>
              <List>
                {['Marketing', 'Growth', 'Finance', 'Operations'].map((topic) => (
                  <ListItem key={topic} button>
                    <ListItemIcon>
                      <TrendingUpIcon color="action" />
                    </ListItemIcon>
                    <ListItemText primary={topic} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Badge badgeContent={unreadNotifications} color="primary">
                  <NotificationsIcon />
                </Badge>
                Notifications
              </Typography>
              {notificationsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : (
                <List>
                  {notifications.slice(0, 5).map((notification) => (
                    <ListItem key={notification.id}>
                      <ListItemText
                        primary={`New ${notification.type}`}
                        secondary={notification.createdAt.toLocaleDateString()}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* New Post Dialog */}
        <Dialog
          open={newPostDialogOpen}
          onClose={() => setNewPostDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Create New Post</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Title"
                fullWidth
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
              <RichTextEditor
                content={newPost.content}
                onChange={(content) => setNewPost({ ...newPost, content })}
              />
              <TextField
                select
                label="Category"
                fullWidth
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              >
                {['Questions', 'Success Stories', 'Tips', 'Resources'].map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Tags (comma-separated)"
                fullWidth
                value={newPost.tags.join(', ')}
                onChange={(e) => setNewPost({
                  ...newPost,
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                })}
                helperText="Enter tags separated by commas (e.g., marketing, tips, help)"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNewPostDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleCreatePost}
              variant="contained"
              color="primary"
              disabled={!newPost.title || !newPost.content || !newPost.category}
            >
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default CommunityHub; 