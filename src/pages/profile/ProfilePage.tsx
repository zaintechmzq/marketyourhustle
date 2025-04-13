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
} from '@mui/material';
import {
  Edit as EditIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Language as WebsiteIcon,
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
    social: {}
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
          createdAt: userData.createdAt || new Date(),
          updatedAt: userData.updatedAt || new Date()
        };
        
        setProfile(profileData);
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

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                position: 'relative'
              }}>
                <Avatar
                  src={profile?.photoURL}
                  sx={{ 
                    width: 150, 
                    height: 150, 
                    mb: 2,
                    boxShadow: 2
                  }}
                />
                {isOwnProfile && (
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={handleEditProfile}
                    sx={{ 
                      mb: 2,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 500 }}>
                  {profile?.displayName}
                </Typography>
              </Box>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                paragraph
                sx={{
                  whiteSpace: 'pre-wrap',
                  mb: 3
                }}
              >
                {profile?.bio || 'No bio provided'}
              </Typography>
              <Box sx={{ mb: 3 }}>
                {profile?.businessType && (
                  <Chip
                    label={profile.businessType}
                    sx={{ 
                      mr: 1, 
                      mb: 1,
                      backgroundColor: '#FF7F50',
                      color: 'white',
                      fontWeight: 500
                    }}
                  />
                )}
                {profile?.reputation && (
                  <Chip
                    label={`${profile.reputation} reputation`}
                    color="primary"
                    sx={{ mr: 1, mb: 1 }}
                  />
                )}
                {profile?.badges?.map((badge) => (
                  <Chip
                    key={badge}
                    label={badge}
                    variant="outlined"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {profile?.website && (
                  <IconButton
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: 'action.hover',
                      '&:hover': {
                        backgroundColor: 'action.selected',
                      },
                    }}
                  >
                    <WebsiteIcon />
                  </IconButton>
                )}
                {profile?.social?.linkedin && (
                  <IconButton
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: 'action.hover',
                      '&:hover': {
                        backgroundColor: 'action.selected',
                      },
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                )}
                {profile?.social?.twitter && (
                  <IconButton
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: 'action.hover',
                      '&:hover': {
                        backgroundColor: 'action.selected',
                      },
                    }}
                  >
                    <TwitterIcon />
                  </IconButton>
                )}
                {profile?.social?.instagram && (
                  <IconButton
                    href={profile.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: 'action.hover',
                      '&:hover': {
                        backgroundColor: 'action.selected',
                      },
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                minWidth: 100,
              },
            }}
          >
            <Tab label="Posts" />
            <Tab label="Activity" />
            <Tab label="About" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" sx={{ mb: 2 }}>Posts</Typography>
          {/* Add posts content */}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 2 }}>Activity</Typography>
          {/* Add activity content */}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>Business Details</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Business Type
                  </Typography>
                  <Typography>
                    {profile?.businessType || 'Not specified'}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Website
                  </Typography>
                  <Typography>
                    {profile?.website ? (
                      <Link 
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {profile.website}
                      </Link>
                    ) : 'Not specified'}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>Account Info</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Member since
                  </Typography>
                  <Typography>
                    {formatDate(profile?.createdAt)}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Last updated
                  </Typography>
                  <Typography>
                    {formatDate(profile?.updatedAt)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>

      {profile && (
        <EditProfileDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          profile={profile}
          onUpdate={handleProfileUpdate}
        />
      )}
    </Container>
  );
};

export default ProfilePage; 