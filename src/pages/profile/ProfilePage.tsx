import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Chip,
  CircularProgress,
  Button,
  IconButton,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  Badge,
  Tooltip,
  TextField,
} from '@mui/material';
import {
  Edit as EditIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Language as WebsiteIcon,
  Message as MessageIcon,
  Business as BusinessIcon,
  Star as StarIcon,
  EmojiEvents as BadgeIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import EditProfileDialog from '../../components/EditProfileDialog';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: any; // Changed to handle both Date and Firestore Timestamp
  updatedAt: any; // Changed to handle both Date and Firestore Timestamp
  bio: string;
  businessType: string;
  reputation: number;
  badges: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  website?: string;
  expertise: string[];
  location: string;
  businessDetails: {
    founded: string;
    size: string;
    industry: string;
    specialties: string[];
  };
  achievements: {
    title: string;
    description: string;
    date: string;
  }[];
  testimonials: {
    userId: string;
    text: string;
    rating: number;
    date: string;
  }[];
  connections: string[];
  posts: string[];
  events: string[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [achievements, setAchievements] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Handle auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user?.uid);
      setCurrentUser(user);
      setIsAuthChecking(false);

      if (!user) {
        navigate('/');
        return;
      }

      if (!userId) {
        navigate(`/profile/${user.uid}`);
      }
    });

    return () => unsubscribe();
  }, [userId, navigate]);

  const createNewUserProfile = (user: any): Omit<UserProfile, 'createdAt' | 'updatedAt'> => ({
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || 'Anonymous User',
    photoURL: user.photoURL || '',
    bio: '',
    businessType: '',
    reputation: 0,
    badges: [],
    social: {},
    expertise: [],
    location: '',
    businessDetails: {
      founded: '',
      size: '',
      industry: '',
      specialties: [],
    },
    achievements: [],
    testimonials: [],
    connections: [],
    posts: [],
    events: [],
  });

  const fetchProfile = async () => {
    if (isAuthChecking || !currentUser) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const targetUserId = userId || currentUser.uid;
      console.log("Fetching profile for:", targetUserId);

      const userRef = doc(db, 'users', targetUserId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Found user data:", userData);
        
        // Create a new profile object with all fields
        const profileData: UserProfile = {
          uid: targetUserId,
          email: userData.email || '',
          displayName: userData.displayName || 'Anonymous User',
          photoURL: userData.photoURL || '',
          bio: userData.bio || '',
          businessType: userData.businessType || '',
          reputation: userData.reputation || 0,
          badges: userData.badges || [],
          social: userData.social || {},
          website: userData.website || '',
          expertise: userData.expertise || [],
          location: userData.location || '',
          businessDetails: userData.businessDetails || {
            founded: '',
            size: '',
            industry: '',
            specialties: [],
          },
          achievements: userData.achievements || [],
          testimonials: userData.testimonials || [],
          connections: userData.connections || [],
          posts: userData.posts || [],
          events: userData.events || [],
          createdAt: userData.createdAt || new Date(),
          updatedAt: userData.updatedAt || new Date()
        };
        
        setProfile(profileData);
        setAchievements(profileData.achievements);
        setTestimonials(profileData.testimonials);
      } else {
        console.log("No existing profile, creating new one");
        if (targetUserId === currentUser.uid) {
          const newUserProfile = createNewUserProfile(currentUser);
          const profileWithTimestamps = {
            ...newUserProfile,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          };
          
          await setDoc(userRef, profileWithTimestamps);
          
          setProfile({
            ...newUserProfile,
            createdAt: new Date(),
            updatedAt: new Date()
          } as UserProfile);
          setAchievements(newUserProfile.achievements);
          setTestimonials(newUserProfile.testimonials);
        } else {
          setError('User profile not found');
        }
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Error loading profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile data
  useEffect(() => {
    fetchProfile();
  }, [userId, currentUser, isAuthChecking]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSignIn = () => {
    navigate('/', { state: { from: '/profile' } });
  };

  const handleCloseAuthDialog = () => {
    navigate('/');
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Not available';
    
    try {
      // Handle Firestore Timestamp
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString();
      }
      // Handle regular Date object
      if (timestamp instanceof Date) {
        return timestamp.toLocaleDateString();
      }
      // Handle string or number
      return new Date(timestamp).toLocaleDateString();
    } catch (err) {
      return 'Invalid date';
    }
  };

  const handleEditProfile = () => {
    setEditDialogOpen(true);
  };

  const handleProfileUpdate = () => {
    // Refresh profile data
    fetchProfile();
  };

  const handleSendMessage = async () => {
    if (!currentUser || !profile || !messageText.trim()) return;
    
    try {
      const messageRef = doc(db, 'messages', `${currentUser.uid}_${profile.uid}`);
      await setDoc(messageRef, {
        senderId: currentUser.uid,
        receiverId: profile.uid,
        text: messageText,
        timestamp: serverTimestamp(),
        read: false
      });
      
      setMessageText('');
      setShowMessageDialog(false);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading || isAuthChecking) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!currentUser) {
    return (
      <Dialog open={true} onClose={() => navigate('/')}>
        <DialogTitle>Authentication Required</DialogTitle>
        <DialogContent>
          <Typography>
            Please sign in to view profiles.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/')}>Go to Sign In</Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography color="error" gutterBottom>{error}</Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/home')}
            sx={{ mt: 2 }}
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const isOwnProfile = currentUser?.uid === userId;

  const renderProfileHeader = () => (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              src={profile?.photoURL}
              sx={{ width: 150, height: 150, mb: 2 }}
            />
            {currentUser?.uid === profile?.uid && (
              <IconButton
                onClick={() => setEditDialogOpen(true)}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'background.paper',
                  '&:hover': { backgroundColor: 'action.hover' }
                }}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>
          {currentUser?.uid !== profile?.uid && (
            <Button
              variant="contained"
              startIcon={<MessageIcon />}
              onClick={() => setShowMessageDialog(true)}
              sx={{ mt: 2 }}
            >
              Send Message
            </Button>
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {profile?.displayName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {profile?.businessType}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {profile?.expertise?.map((skill, index) => (
              <Chip key={index} label={skill} size="small" />
            ))}
          </Box>
          <Typography variant="body1" paragraph>
            {profile?.bio}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {profile?.social?.linkedin && (
              <IconButton href={profile.social.linkedin} target="_blank">
                <LinkedInIcon />
              </IconButton>
            )}
            {profile?.social?.twitter && (
              <IconButton href={profile.social.twitter} target="_blank">
                <TwitterIcon />
              </IconButton>
            )}
            {profile?.social?.instagram && (
              <IconButton href={profile.social.instagram} target="_blank">
                <InstagramIcon />
              </IconButton>
            )}
            {profile?.website && (
              <IconButton href={profile.website} target="_blank">
                <WebsiteIcon />
              </IconButton>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const renderBusinessDetails = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        <BusinessIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Business Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Founded
          </Typography>
          <Typography variant="body1">
            {profile?.businessDetails?.founded || 'Not specified'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Company Size
          </Typography>
          <Typography variant="body1">
            {profile?.businessDetails?.size || 'Not specified'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="text.secondary">
            Specialties
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {profile?.businessDetails?.specialties?.map((specialty, index) => (
              <Chip key={index} label={specialty} size="small" />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderAchievements = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        <BadgeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Achievements
      </Typography>
      <Grid container spacing={2}>
        {profile?.achievements?.map((achievement, index) => (
          <Grid item xs={12} key={index}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1">{achievement.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {achievement.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(achievement.date).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );

  const renderTestimonials = () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        <StarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Testimonials
      </Typography>
      <Grid container spacing={2}>
        {profile?.testimonials?.map((testimonial, index) => (
          <Grid item xs={12} key={index}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="subtitle2">
                    {testimonial.userId}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(testimonial.date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2">{testimonial.text}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    sx={{
                      color: i < testimonial.rating ? 'primary.main' : 'action.disabled',
                      fontSize: 16
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : profile ? (
        <>
          {renderProfileHeader()}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Overview" />
              <Tab label="Business" />
              <Tab label="Achievements" />
              <Tab label="Testimonials" />
              <Tab label="Timeline" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            {renderBusinessDetails()}
            {renderAchievements()}
            {renderTestimonials()}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {/* Business tab content */}
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            {/* Achievements tab content */}
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            {/* Testimonials tab content */}
          </TabPanel>
          <TabPanel value={tabValue} index={4}>
            {/* Timeline tab content */}
          </TabPanel>
        </>
      ) : null}

      {/* Message Dialog */}
      <Dialog
        open={showMessageDialog}
        onClose={() => setShowMessageDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Send Message to {profile?.displayName}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowMessageDialog(false)}>Cancel</Button>
          <Button onClick={handleSendMessage} variant="contained">
            Send
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        profile={profile}
        onUpdate={fetchProfile}
      />
    </Container>
  );
};

export default ProfilePage; 