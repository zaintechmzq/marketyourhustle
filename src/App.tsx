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
import ProtectedRoute from './components/ProtectedRoute';
import MuslimOwnedBusinesses from './pages/learn/MuslimOwnedBusinesses';
import QahwahHouse from './pages/learn/articles/qahwah-house';
import Qamaria from './pages/learn/articles/Qamaria';
import HalalGuys from './pages/learn/articles/halal-guys';
import CarDetailingBusiness from './pages/learn/articles/car-detailing-business';

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
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Home />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <CommunityHub />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Dashboard />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/story/:id"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Story />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:category"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Category />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn/muslim-owned-businesses"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <MuslimOwnedBusinesses />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn/articles/qahwah-house"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <QahwahHouse />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn/articles/qamaria"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Qamaria />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn/articles/halal-guys"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <HalalGuys />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn/articles/car-detailing-business"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <CarDetailingBusiness />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
