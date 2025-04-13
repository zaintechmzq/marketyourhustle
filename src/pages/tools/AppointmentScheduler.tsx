import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface Appointment {
  id: number;
  clientName: string;
  date: string;
  time: string;
  service: string;
  notes: string;
}

const AppointmentScheduler = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      clientName: "John Doe",
      date: "2024-03-15",
      time: "10:00",
      service: "Business Consultation",
      notes: "Initial meeting"
    }
  ]);

  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
    clientName: '',
    date: '',
    time: '',
    service: '',
    notes: ''
  });

  const handleInputChange = (field: keyof Omit<Appointment, 'id'>) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAppointment({
      ...newAppointment,
      [field]: event.target.value
    });
  };

  const handleAddAppointment = () => {
    if (newAppointment.clientName && newAppointment.date && newAppointment.time) {
      setAppointments([
        ...appointments,
        {
          ...newAppointment,
          id: appointments.length + 1
        }
      ]);
      setNewAppointment({
        clientName: '',
        date: '',
        time: '',
        service: '',
        notes: ''
      });
    }
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ScheduleIcon fontSize="large" color="primary" />
          Appointment Scheduler
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your service appointments and client bookings
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Add New Appointment */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Schedule New Appointment
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Client Name"
                value={newAppointment.clientName}
                onChange={handleInputChange('clientName')}
                fullWidth
              />
              <TextField
                label="Service"
                value={newAppointment.service}
                onChange={handleInputChange('service')}
                fullWidth
              />
              <TextField
                type="date"
                label="Date"
                value={newAppointment.date}
                onChange={handleInputChange('date')}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                type="time"
                label="Time"
                value={newAppointment.time}
                onChange={handleInputChange('time')}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Notes"
                value={newAppointment.notes}
                onChange={handleInputChange('notes')}
                multiline
                rows={3}
                fullWidth
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddAppointment}
                fullWidth
              >
                Add Appointment
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Appointments List */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Appointments
            </Typography>
            <List>
              {appointments
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((appointment) => (
                  <ListItem
                    key={appointment.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteAppointment(appointment.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1">
                          {appointment.clientName} - {appointment.service}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </Typography>
                          {appointment.notes && (
                            <Typography variant="body2" color="text.secondary">
                              Notes: {appointment.notes}
                            </Typography>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                ))}
            </List>
            {appointments.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                No appointments scheduled
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Alert severity="info" sx={{ mt: 2 }}>
        All appointments are stored locally. In a production environment, these would be synchronized with a backend server.
      </Alert>
    </Container>
  );
};

export default AppointmentScheduler; 