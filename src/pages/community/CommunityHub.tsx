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
  Paper,
  Chip,
  Tabs,
  Tab,
  Divider,
  useTheme,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  LocalOffer as TagIcon,
  Category as CategoryIcon,
  Whatshot as WhatshotIcon,
  NewReleases as NewIcon,
  ThumbUp as TopIcon,
  Edit as EditIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from '@mui/icons-material';
import { usePosts, useComments, useNotifications } from '../../hooks/useFirebase';
import { Post as PostType } from '../../types/community';
import { auth } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Auth from '../../components/Auth';
import Post from '../../components/Post';
import RichTextEditor from '../../components/RichTextEditor';
import { formatRelativeTime } from '../../utils/dateUtils';
import { motion } from 'framer-motion';

type NewPost = Pick<PostType, 'title' | 'content' | 'category' | 'tags' | 'authorId'>;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const CATEGORIES = [
  'All',
  'Business Strategy',
  'Marketing',
  'Technology',
  'Finance',
  'Personal Development',
  'Success Stories',
  'Questions',
  'Resources'
];

const TRENDING_TOPICS = [
  { title: 'Growing Your Online Presence', posts: 156 },
  { title: 'Halal Investment Strategies', posts: 89 },
  { title: 'Marketing on a Budget', posts: 67 },
];

const CommunityHub = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newPostDialogOpen, setNewPostDialogOpen] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [tabValue, setTabValue] = useState(0);
  const [newPost, setNewPost] = useState<NewPost>({
    title: '',
    content: '',
    category: '',
    tags: [],
    authorId: auth.currentUser?.uid || '',
  });
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthChecking(false);

      if (!user) {
        navigate('/auth');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const { posts, loading: postsLoading, error: postsError, createPost } = usePosts(selectedCategory === 'All' ? undefined : selectedCategory);
  const { notifications, loading: notificationsLoading } = useNotifications();
  const { addComment } = useComments(activePostId || '');

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowAllCategories(false);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-scroll-container');
    if (container) {
      const scrollAmount = 200; // Adjust this value based on your needs
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (tabValue === 0) { // Hot
      return (b.reactions?.['👍']?.count || 0) - (a.reactions?.['👍']?.count || 0);
    } else if (tabValue === 1) { // New
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else { // Top
      return (b.commentCount || 0) - (a.commentCount || 0);
    }
  });

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

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', pt: 3 }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          mb: 4
        }}>
          <Typography variant="h4" sx={{ 
            textAlign: 'center',
            fontWeight: 500
          }}>
            Community Hub
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Left Sidebar - Categories for Desktop */}
          {!isMobile && (
            <Grid item md={3}>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CategoryIcon />
                  Categories
                </Typography>
                <List sx={{ py: 1 }}>
                  {CATEGORIES.map((category) => (
                    <ListItem 
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      sx={{
                        borderRadius: 2,
                        mb: 0.5,
                        backgroundColor: selectedCategory === category ? theme.palette.primary.main : 'transparent',
                        color: selectedCategory === category ? 'white' : 'inherit',
                        '&:hover': {
                          backgroundColor: selectedCategory === category 
                            ? theme.palette.primary.dark 
                            : theme.palette.action.hover,
                        },
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <ListItemText primary={category} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          )}

          {/* Main Content */}
          <Grid item xs={12} md={6}>
            {/* Mobile Categories */}
            {isMobile && (
              <Paper sx={{ mb: 3, p: 2, borderRadius: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
                    Browse Categories
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                      gap: 1,
                    }}
                  >
                    {CATEGORIES.slice(0, 4).map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "contained" : "outlined"}
                        onClick={() => handleCategoryChange(category)}
                        sx={{
                          textTransform: 'none',
                          borderRadius: 2,
                          py: 1,
                          backgroundColor: selectedCategory === category ? '#FF7F50' : 'transparent',
                          borderColor: selectedCategory === category ? '#FF7F50' : 'rgba(0, 0, 0, 0.12)',
                          color: selectedCategory === category ? 'white' : 'text.primary',
                          '&:hover': {
                            backgroundColor: selectedCategory === category ? '#FF6B3D' : 'rgba(0, 0, 0, 0.04)',
                            borderColor: selectedCategory === category ? '#FF6B3D' : 'rgba(0, 0, 0, 0.2)',
                          },
                          fontSize: '0.875rem',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {category}
                      </Button>
                    ))}
                    <Button
                      variant="outlined"
                      onClick={() => setShowAllCategories(true)}
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        py: 1,
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                        color: 'text.secondary',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          borderColor: 'rgba(0, 0, 0, 0.2)',
                        },
                        fontSize: '0.875rem'
                      }}
                    >
                      More Categories
                    </Button>
                  </Box>
                </Box>
              </Paper>
            )}

            {/* Create Post Card */}
            <Paper 
              sx={{ 
                mb: 3, 
                p: 2,
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                },
              }}
              onClick={() => setNewPostDialogOpen(true)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar 
                  src={currentUser?.photoURL || ''}
                  sx={{ width: 40, height: 40 }}
                >
                  {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Share your thoughts with the community..."
                  onClick={(e) => {
                    e.preventDefault();
                    setNewPostDialogOpen(true);
                  }}
                  InputProps={{
                    readOnly: true,
                    sx: {
                      borderRadius: 3,
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => setNewPostDialogOpen(true)}
                  sx={{
                    backgroundColor: '#FF7F50',
                    '&:hover': {
                      backgroundColor: '#FF6B3D',
                    },
                    borderRadius: '20px',
                    px: 2,
                    minWidth: 'auto',
                    textTransform: 'none',
                    fontWeight: 500,
                    display: { xs: 'none', sm: 'flex' }
                  }}
                >
                  Post
                </Button>
              </Box>
            </Paper>

            {/* Rest of the content */}
            <Paper sx={{ mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab icon={<WhatshotIcon />} label="Hot" />
                <Tab icon={<NewIcon />} label="New" />
                <Tab icon={<TopIcon />} label="Top" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                {postsLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : postsError ? (
                  <Alert severity="error" sx={{ mb: 2 }}>{postsError}</Alert>
                ) : sortedPosts.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="text.secondary">
                      No posts yet. Be the first to post!
                    </Typography>
                  </Box>
                ) : (
                  sortedPosts.map((post) => (
                    <Post
                      key={post.id}
                      post={post}
                      onComment={async (content) => {
                        setActivePostId(post.id);
                        await addComment(content);
                      }}
                    />
                  ))
                )}
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                {/* New posts content */}
                {sortedPosts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    onComment={async (content) => {
                      setActivePostId(post.id);
                      await addComment(content);
                    }}
                  />
                ))}
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                {/* Top posts content */}
                {sortedPosts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    onComment={async (content) => {
                      setActivePostId(post.id);
                      await addComment(content);
                    }}
                  />
                ))}
              </TabPanel>
            </Paper>
          </Grid>

          {/* Right Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUpIcon />
                Trending Topics
              </Typography>
              <List>
                {TRENDING_TOPICS.map((topic) => (
                  <ListItem
                    key={topic.title}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <TagIcon color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary={topic.title}
                      secondary={`${topic.posts} discussions`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Paper sx={{ p: 2 }}>
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
                        secondary={formatRelativeTime(notification.createdAt)}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Categories Dialog for Mobile */}
        <Dialog
          open={showAllCategories}
          onClose={() => setShowAllCategories(false)}
          fullWidth
          maxWidth="xs"
          PaperProps={{
            sx: {
              borderRadius: 2,
              m: 2
            }
          }}
        >
          <DialogTitle sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            px: 3,
            py: 2
          }}>
            All Categories
          </DialogTitle>
          <DialogContent sx={{ p: 2 }}>
            <List sx={{ py: 1 }}>
              {CATEGORIES.map((category) => (
                <ListItem 
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    backgroundColor: selectedCategory === category ? '#FF7F50' : 'transparent',
                    color: selectedCategory === category ? 'white' : 'inherit',
                    '&:hover': {
                      backgroundColor: selectedCategory === category 
                        ? '#FF6B3D'
                        : 'rgba(0, 0, 0, 0.04)',
                    },
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <ListItemText 
                    primary={category}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontWeight: selectedCategory === category ? 600 : 400,
                      }
                    }}
                  />
                  {selectedCategory === category && (
                    <Box sx={{ ml: 1, color: 'inherit' }}>
                      <CategoryIcon fontSize="small" />
                    </Box>
                  )}
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Button 
              onClick={() => setShowAllCategories(false)}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* New Post Dialog */}
        <Dialog
          open={newPostDialogOpen}
          onClose={() => setNewPostDialogOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
            },
          }}
        >
          <DialogTitle sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            px: 3,
            py: 2,
          }}>
            Create New Post
          </DialogTitle>
          <DialogContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
              <TextField
                label="Title"
                fullWidth
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
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
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              >
                {CATEGORIES.map((category) => (
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
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ 
            p: 3, 
            borderTop: 1, 
            borderColor: 'divider',
          }}>
            <Button 
              onClick={() => setNewPostDialogOpen(false)}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreatePost}
              variant="contained"
              color="primary"
              disabled={!newPost.title || !newPost.content || !newPost.category}
              sx={{
                backgroundColor: '#FF7F50',
                '&:hover': {
                  backgroundColor: '#FF6B3D',
                },
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(255, 127, 80, 0.5)',
                },
                borderRadius: 2,
                px: 3,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Create Post
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default CommunityHub; 