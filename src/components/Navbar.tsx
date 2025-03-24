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
  Divider
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
  Mosque as MosqueIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const handleLogoClick = () => {
    if (userEmail) {
      navigate('/home');
    } else {
      navigate('/');
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category.toLowerCase().replace(/\s+/g, '-')}`);
    handleClose();
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItem button onClick={() => navigate('/home')}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => navigate('/community')}>
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary="Community" />
        </ListItem>
        <ListItem button onClick={() => navigate('/dashboard')}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => navigate('/learn/muslim-owned-businesses')}>
          <ListItemIcon><MosqueIcon /></ListItemIcon>
          <ListItemText primary="Muslim-Owned Businesses" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon><CategoryIcon /></ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        {categories.map((category) => (
          <ListItem 
            button 
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
          >
            <ListItemIcon>{category.icon}</ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
        <Divider />
        <ListItem button onClick={handleSignOut}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => isMobile ? setMobileOpen(true) : handleMenu}
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
              startIcon={<GroupIcon />}
              onClick={() => navigate('/community')}
            >
              Community
            </Button>
            <Button
              color="inherit"
              startIcon={<MosqueIcon />}
              onClick={() => navigate('/learn/muslim-owned-businesses')}
            >
              Muslim-Owned
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
              startIcon={<DashboardIcon />}
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
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
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 