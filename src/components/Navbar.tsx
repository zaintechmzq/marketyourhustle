import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  ListSubheader,
  Badge,
  Avatar
} from '@mui/material';
import {
  Menu as MenuIcon,
  Category as CategoryIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Restaurant as RestaurantIcon,
  Celebration as CelebrationIcon,
  Brush as BrushIcon,
  Camera as CameraIcon,
  Spa as SpaIcon,
  Event as EventIcon,
  Group as GroupIcon,
  Mosque as MosqueIcon,
  School as SchoolIcon,
  ChevronRight as ChevronRightIcon,
  Description as DescriptionIcon,
  Build as BuildIcon,
  Message as MessageIcon,
  NotificationsNone as NotificationsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import { User } from 'firebase/auth';

const categories = [
  { name: 'Wedding Services', icon: <CelebrationIcon /> },
  { name: 'Food & Beverage', icon: <RestaurantIcon /> },
  { name: 'Creative Services', icon: <BrushIcon /> },
  { name: 'Photography', icon: <CameraIcon /> },
  { name: 'Beauty & Wellness', icon: <SpaIcon /> },
  { name: 'Event Planning', icon: <EventIcon /> },
  { name: 'Business Services', icon: <BusinessIcon /> }
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth() as { currentUser: User | null };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesDialogOpen, setCategoriesDialogOpen] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleCategoryClick = (category: string) => {
    const formattedCategory = category.toLowerCase().replace(/\s+&\s+/g, '-and-').replace(/\s+/g, '-');
    navigate(`/category/${formattedCategory}`);
    handleClose();
    setMobileOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setMobileOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLogoClick = () => {
    if (currentUser) {
      navigate('/home');
    } else {
      navigate('/');
    }
  };

  const handleCategoriesClick = () => {
    setMobileOpen(false);
    setCategoriesDialogOpen(true);
  };

  const handleCategorySelect = (category: string) => {
    handleCategoryClick(category);
    setCategoriesDialogOpen(false);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const handleAuthNavigation = (isSignUp: boolean) => {
    navigate('/auth', { state: { isSignUp } });
    setMobileOpen(false);
  };

  const categoriesDialog = (
    <Dialog 
      open={categoriesDialogOpen} 
      onClose={() => setCategoriesDialogOpen(false)}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': {
          margin: 0,
          width: '100%',
          maxHeight: '80vh',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider',
        pb: 1
      }}>
        <Typography variant="h6">Categories</Typography>
        <IconButton onClick={() => setCategoriesDialogOpen(false)} edge="end">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {categories.map((category) => (
            <Grid item xs={12} key={category.name}>
              <ListItem 
                button 
                onClick={() => handleCategorySelect(category.name)}
                sx={{
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
              >
                <ListItemIcon>{category.icon}</ListItemIcon>
                <ListItemText primary={category.name} />
                <ChevronRightIcon color="action" />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );

  const drawer = (
    <Box sx={{ width: 250, height: '100%', backgroundColor: theme.palette.background.paper }}>
      {currentUser && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Avatar src={currentUser.photoURL || undefined} alt={currentUser.displayName || 'User'}>
              {currentUser.displayName?.[0] || currentUser.email?.[0] || 'U'}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" noWrap>
                {currentUser.displayName || currentUser.email}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                View Profile
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      <List 
        subheader={
          <ListSubheader sx={{ backgroundColor: 'inherit', fontWeight: 600 }}>
            Main Navigation
          </ListSubheader>
        }
      >
        <ListItem 
          button 
          onClick={() => handleNavigation('/home')}
          selected={isActiveRoute('/home')}
          sx={{
            borderRadius: 1,
            mx: 1,
            mb: 0.5,
            '&.Mui-selected': {
              backgroundColor: theme.palette.primary.main + '20',
              '&:hover': {
                backgroundColor: theme.palette.primary.main + '30',
              }
            }
          }}
        >
          <ListItemIcon><HomeIcon color={isActiveRoute('/home') ? 'primary' : 'inherit'} /></ListItemIcon>
          <ListItemText 
            primary="Home" 
            primaryTypographyProps={{
              color: isActiveRoute('/home') ? 'primary' : 'inherit',
              fontWeight: isActiveRoute('/home') ? 600 : 400
            }}
          />
        </ListItem>

        {currentUser && (
          <>
            <ListItem 
              button 
              onClick={() => handleNavigation('/dashboard')}
              selected={isActiveRoute('/dashboard')}
              sx={{
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main + '20',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main + '30',
                  }
                }
              }}
            >
              <ListItemIcon>
                <DashboardIcon color={isActiveRoute('/dashboard') ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText 
                primary="Dashboard"
                primaryTypographyProps={{
                  color: isActiveRoute('/dashboard') ? 'primary' : 'inherit',
                  fontWeight: isActiveRoute('/dashboard') ? 600 : 400
                }}
              />
            </ListItem>

            <ListItem 
              button 
              onClick={() => handleNavigation('/messages')}
              selected={isActiveRoute('/messages')}
              sx={{
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main + '20',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main + '30',
                  }
                }
              }}
            >
              <ListItemIcon>
                <Badge color="error" variant="dot">
                  <MessageIcon color={isActiveRoute('/messages') ? 'primary' : 'inherit'} />
                </Badge>
              </ListItemIcon>
              <ListItemText 
                primary="Messages"
                primaryTypographyProps={{
                  color: isActiveRoute('/messages') ? 'primary' : 'inherit',
                  fontWeight: isActiveRoute('/messages') ? 600 : 400
                }}
              />
            </ListItem>
          </>
        )}
      </List>

      <Divider sx={{ my: 1 }} />
      
      <List subheader={<ListSubheader>Getting Started</ListSubheader>}>
        <ListItem button onClick={() => handleNavigation('/learn')}>
          <ListItemIcon><SchoolIcon /></ListItemIcon>
          <ListItemText primary="Learning Hub" />
        </ListItem>
        <ListItem button onClick={handleCategoriesClick}>
          <ListItemIcon><CategoryIcon /></ListItemIcon>
          <ListItemText primary="Business Categories" />
          <ChevronRightIcon color="action" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/learn/muslim-owned-businesses')}>
          <ListItemIcon><MosqueIcon /></ListItemIcon>
          <ListItemText primary="Success Stories" />
        </ListItem>
      </List>

      <Divider />

      <List subheader={<ListSubheader>Community & Resources</ListSubheader>}>
        <ListItem button onClick={() => handleNavigation('/community')}>
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary="Community Hub" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/learn/resources')}>
          <ListItemIcon><DescriptionIcon /></ListItemIcon>
          <ListItemText primary="Resource Library" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/learn/tools')}>
          <ListItemIcon><BuildIcon /></ListItemIcon>
          <ListItemText primary="Business Tools" />
        </ListItem>
      </List>

      <Divider />

      <List subheader={<ListSubheader>Account</ListSubheader>}>
        {currentUser ? (
          <>
            <ListItem button onClick={() => handleNavigation(`/profile/${currentUser.uid}`)}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={handleSignOut}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => handleAuthNavigation(false)}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItem>
            <ListItem 
              button 
              onClick={() => handleAuthNavigation(true)}
              sx={{
                backgroundColor: theme.palette.primary.main + '20',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main + '30',
                },
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
              }}
            >
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Sign Up" 
                primaryTypographyProps={{
                  color: 'primary',
                  fontWeight: 600
                }}
              />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={1}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' },
              color: theme.palette.text.primary
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1, 
              cursor: 'pointer',
              fontWeight: 700,
              color: theme.palette.primary.main,
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
            onClick={handleLogoClick}
          >
            MarketYourHustle
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                color="inherit"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/home')}
              >
                Home
              </Button>
              {currentUser && (
                <Button
                  color="inherit"
                  startIcon={<MessageIcon />}
                  onClick={() => navigate('/messages')}
                >
                  Messages
                </Button>
              )}
              <Button
                color="inherit"
                startIcon={<SchoolIcon />}
                onClick={() => navigate('/learn')}
              >
                Getting Started
              </Button>
              <Button
                color="inherit"
                startIcon={<CategoryIcon />}
                onClick={handleMenu}
              >
                Categories
              </Button>
              <Button
                color="inherit"
                startIcon={<MosqueIcon />}
                onClick={() => navigate('/learn/muslim-owned-businesses')}
              >
                Success Stories
              </Button>
              <Button
                color="inherit"
                startIcon={<GroupIcon />}
                onClick={() => navigate('/community')}
              >
                Community
              </Button>
              <Button
                color="inherit"
                startIcon={<BuildIcon />}
                onClick={() => navigate('/learn/tools')}
              >
                Tools
              </Button>
              {currentUser && (
                <Button
                  color="inherit"
                  startIcon={<PersonIcon />}
                  onClick={() => navigate(`/profile/${currentUser.uid}`)}
                >
                  Profile
                </Button>
              )}
              {currentUser ? (
                <Button
                  color="inherit"
                  startIcon={<ExitToAppIcon />}
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button
                    color="inherit"
                    onClick={() => handleAuthNavigation(false)}
                    sx={{ fontWeight: 500 }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAuthNavigation(true)}
                    sx={{ 
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          )}

          {isMobile && currentUser && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => navigate('/messages')}
              >
                <Badge color="error" variant="dot">
                  <MessageIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => navigate('/notifications')}
              >
                <Badge color="error" variant="dot">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Box>
          )}
        </Toolbar>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              maxHeight: 400,
              width: 250,
            },
          }}
        >
          {categories.map((category) => (
            <MenuItem 
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
            >
              <ListItemIcon>{category.icon}</ListItemIcon>
              <ListItemText primary={category.name} />
            </MenuItem>
          ))}
        </Menu>

        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 250,
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
      {categoriesDialog}
    </>
  );
};

export default Navbar; 