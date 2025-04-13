import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/home"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <Home />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/learn"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <LearningResources />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/learn/muslim-owned-businesses"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <MuslimOwnedBusinesses />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/learn/articles/qahwah-house"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <QahwahHouse />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/learn/articles/qamaria"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <Qamaria />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/learn/articles/halal-guys"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <HalalGuys />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/learn/articles/car-detailing-business"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <CarDetailingBusiness />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/learn/articles/luxury-home-cleaning"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <LuxuryHomeCleaning />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/learn/articles/pet-grooming-van"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <PetGroomingVan />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/learn/articles/landscaping-business"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <LandscapingBusiness />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/learn/articles/balloon-garland-setup"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <BalloonGarlandSetup />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/learn/articles/business-automation-tools"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <BusinessAutomationTools />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/learn/articles/dog-walker-success"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <DogWalkerSuccess />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/community"
            element={
              <AuthRoute requireFirebaseAuth>
                <>
                  <Navbar />
                  <CommunityHub />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthRoute requireFirebaseAuth>
                <>
                  <Navbar />
                  <Dashboard />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/story/:id"
            element={
              <AuthRoute requireFirebaseAuth>
                <>
                  <Navbar />
                  <Story />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/category/:category"
            element={
              <AuthRoute requireFirebaseAuth>
                <>
                  <Navbar />
                  <Category />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/profile/:userId?"
            element={
              <AuthRoute requireFirebaseAuth>
                <>
                  <Navbar />
                  <ProfilePage />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/learn/resources"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <ResourceLibrary />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/learn/tools"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <BusinessTools />
                </>
              </AuthRoute>
            }
          />
          {/* Tool Routes */}
          <Route
            path="/tools/RevenueCalculator"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <RevenueCalculator />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/tools/PricingStrategy"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <PricingStrategy />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/tools/AppointmentScheduler"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <AppointmentScheduler />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/tools/BusinessAnalytics"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <BusinessAnalytics />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/tools/GrowthPlanner"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <GrowthPlanner />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/tools/CostCalculator"
            element={
              <AuthRoute>
                <>
                  <Navbar />
                  <CostCalculator />
                </>
              </AuthRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
