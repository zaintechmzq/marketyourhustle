import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Story from './pages/Story';
import Category from './pages/Category';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import CommunityHub from './pages/community/CommunityHub';
import AuthRoute from './components/AuthRoute';
import Auth from './pages/Auth';
import MuslimOwnedBusinesses from './pages/learn/MuslimOwnedBusinesses';
import QahwahHouse from './pages/learn/articles/qahwah-house';
import Qamaria from './pages/learn/articles/Qamaria';
import HalalGuys from './pages/learn/articles/halal-guys';
import CarDetailingBusiness from './pages/learn/articles/car-detailing-business';
import LuxuryHomeCleaning from './pages/learn/articles/luxury-home-cleaning';
import PetGroomingVan from './pages/learn/articles/pet-grooming-van';
import LandscapingBusiness from './pages/learn/articles/landscaping-business';
import BalloonGarlandSetup from './pages/learn/articles/balloon-garland-setup';
import BusinessAutomationTools from './pages/learn/articles/business-automation-tools';
import DogWalkerSuccess from './pages/learn/articles/dog-walker-success';
import ProfilePage from './pages/profile/ProfilePage';
import LearningResources from './pages/learn/LearningResources';
import ResourceLibrary from './pages/learn/ResourceLibrary';
import BusinessTools from './pages/learn/BusinessTools';
import MessagesPage from './pages/Messages';
import PrivateRoute from './components/PrivateRoute';
import BasicRoute from './components/BasicRoute';

// Import tool components
import RevenueCalculator from './pages/tools/RevenueCalculator';
import PricingStrategy from './pages/tools/PricingStrategy';
import AppointmentScheduler from './pages/tools/AppointmentScheduler';
import BusinessAnalytics from './pages/tools/BusinessAnalytics';
import GrowthPlanner from './pages/tools/GrowthPlanner';
import CostCalculator from './pages/tools/CostCalculator';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FC8B59',
      light: '#FFA17A',
      dark: '#E67A4A',
    },
    secondary: {
      main: '#000000',
      light: '#333333',
      dark: '#000000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Basic Access Route */}
            <Route path="/home" element={
              <BasicRoute>
                <>
                  <Navbar />
                  <Home />
                </>
              </BasicRoute>
            } />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <Dashboard />
                </>
              </PrivateRoute>
            } />

            <Route path="/messages" element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <MessagesPage />
                </>
              </PrivateRoute>
            } />

            <Route path="/community" element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <CommunityHub />
                </>
              </PrivateRoute>
            } />

            <Route path="/profile/:userId" element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <ProfilePage />
                </>
              </PrivateRoute>
            } />

            {/* Learning Resources Routes */}
            <Route path="/learn/*" element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <Routes>
                    <Route index element={<LearningResources />} />
                    <Route path="muslim-owned-businesses" element={<MuslimOwnedBusinesses />} />
                    <Route path="articles/qahwah-house" element={<QahwahHouse />} />
                    <Route path="articles/qamaria" element={<Qamaria />} />
                    <Route path="articles/halal-guys" element={<HalalGuys />} />
                    <Route path="articles/car-detailing-business" element={<CarDetailingBusiness />} />
                    <Route path="articles/luxury-home-cleaning" element={<LuxuryHomeCleaning />} />
                    <Route path="articles/pet-grooming-van" element={<PetGroomingVan />} />
                    <Route path="articles/landscaping-business" element={<LandscapingBusiness />} />
                    <Route path="articles/balloon-garland-setup" element={<BalloonGarlandSetup />} />
                    <Route path="articles/business-automation-tools" element={<BusinessAutomationTools />} />
                    <Route path="articles/dog-walker-success" element={<DogWalkerSuccess />} />
                    <Route path="resource-library" element={<ResourceLibrary />} />
                    <Route path="tools" element={<BusinessTools />} />
                  </Routes>
                </>
              </PrivateRoute>
            } />

            {/* Tools Routes */}
            <Route path="/tools/*" element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <Routes>
                    <Route path="revenue-calculator" element={<RevenueCalculator />} />
                    <Route path="pricing-strategy" element={<PricingStrategy />} />
                    <Route path="appointment-scheduler" element={<AppointmentScheduler />} />
                    <Route path="business-analytics" element={<BusinessAnalytics />} />
                    <Route path="growth-planner" element={<GrowthPlanner />} />
                    <Route path="cost-calculator" element={<CostCalculator />} />
                  </Routes>
                </>
              </PrivateRoute>
            } />

            {/* Category and Story Routes */}
            <Route path="/category/:id" element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <Category />
                </>
              </PrivateRoute>
            } />
            <Route path="/story/:id" element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <Story />
                </>
              </PrivateRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
