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
  ListSubheader
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
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import CloseIcon from '@mui/icons-material/Close';

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
  const userEmail = localStorage.getItem('userEmail');
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

  const handleSignOut = () => {
    localStorage.removeItem('userEmail');
    setMobileOpen(false);
    navigate('/');
  };

  const handleLogoClick = () => {
    if (userEmail) {
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
    <Box sx={{ width: 250 }}>
      <List subheader={<ListSubheader>Main Navigation</ListSubheader>}>
        <ListItem button onClick={() => handleNavigation('/home')}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/dashboard')}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>

      <Divider />
      
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
        {userEmail && (
          <ListItem button onClick={() => handleNavigation(`/profile/${auth.currentUser?.uid}`)}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        )}
        <ListItem button onClick={handleSignOut}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
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
              color: theme.palette.primary.main
            }}
            onClick={handleLogoClick}
          >
            MarketYourHustle
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                color="inherit"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/home')}
              >
                Home
              </Button>
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
              {userEmail && (
                <Button
                  color="inherit"
                  startIcon={<PersonIcon />}
                  onClick={() => navigate(`/profile/${auth.currentUser?.uid}`)}
                >
                  Profile
                </Button>
              )}
              {userEmail ? (
                <Button
                  color="inherit"
                  startIcon={<ExitToAppIcon />}
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  color="inherit"
                  startIcon={<PersonIcon />}
                  onClick={() => navigate('/')}
                >
                  Sign Up
                </Button>
              )}
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