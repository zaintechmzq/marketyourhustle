import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Avatar,
  IconButton,
  Grid,
  Typography,
  Chip,
  InputAdornment,
} from '@mui/material';
import {
  PhotoCamera as PhotoCameraIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Language as WebsiteIcon,
} from '@mui/icons-material';
import { User } from '../types/community';
import { updateUserProfile } from '../utils/userProfile';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  profile: User;
  onUpdate: () => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  open,
  onClose,
  profile,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    displayName: profile.displayName || '',
    bio: profile.bio || '',
    businessType: profile.businessType || '',
    website: profile.website || '',
    social: {
      linkedin: profile.social?.linkedin || '',
      twitter: profile.social?.twitter || '',
      instagram: profile.social?.instagram || '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData({
      displayName: profile.displayName || '',
      bio: profile.bio || '',
      businessType: profile.businessType || '',
      website: profile.website || '',
      social: {
        linkedin: profile.social?.linkedin || '',
        twitter: profile.social?.twitter || '',
        instagram: profile.social?.instagram || '',
      },
    });
  }, [profile]);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setError(null);

      // Create a reference to the storage location
      const storageRef = ref(storage, `profile-photos/${profile.uid}`);
      
      // Upload the file
      await uploadBytes(storageRef, file);
      
      // Get the download URL
      const photoURL = await getDownloadURL(storageRef);
      
      // Update the user profile with the new photo URL
      await updateUserProfile(profile.uid, { photoURL });
      onUpdate();
    } catch (err) {
      setError('Failed to upload photo. Please try again.');
      console.error('Error uploading photo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      await updateUserProfile(profile.uid, {
        ...formData,
        updatedAt: new Date(),
      });

      onUpdate();
      onClose();
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
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
        py: 2
      }}>
        Edit Profile
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={profile.photoURL}
              sx={{ width: 100, height: 100, mb: 1 }}
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="photo-upload"
              type="file"
              onChange={handlePhotoUpload}
            />
            <label htmlFor="photo-upload">
              <IconButton
                component="span"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'background.paper',
                  boxShadow: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <PhotoCameraIcon />
              </IconButton>
            </label>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Click the camera icon to change your profile photo
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Display Name"
              fullWidth
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bio"
              fullWidth
              multiline
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              variant="outlined"
              helperText="Tell us about yourself and your business"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Business Type"
              fullWidth
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Website"
              fullWidth
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WebsiteIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Social Media Links
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={formData.social.linkedin}
                  onChange={(e) => setFormData({
                    ...formData,
                    social: { ...formData.social, linkedin: e.target.value }
                  })}
                  variant="outlined"
                  placeholder="LinkedIn Profile URL"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedInIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={formData.social.twitter}
                  onChange={(e) => setFormData({
                    ...formData,
                    social: { ...formData.social, twitter: e.target.value }
                  })}
                  variant="outlined"
                  placeholder="Twitter Profile URL"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TwitterIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={formData.social.instagram}
                  onChange={(e) => setFormData({
                    ...formData,
                    social: { ...formData.social, instagram: e.target.value }
                  })}
                  variant="outlined"
                  placeholder="Instagram Profile URL"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InstagramIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {error && (
          <Box sx={{ mt: 2 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ 
        p: 3, 
        borderTop: 1, 
        borderColor: 'divider',
      }}>
        <Button 
          onClick={onClose}
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
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: '#FF7F50',
            '&:hover': {
              backgroundColor: '#FF6B3D',
            },
            borderRadius: 2,
            px: 3,
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog; 