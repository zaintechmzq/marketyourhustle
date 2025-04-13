import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  TextField,
  Chip,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

interface MarketingTask {
  id: number;
  title: string;
  description: string;
  date: string;
  type: string;
  status: 'planned' | 'in-progress' | 'completed';
}

const MarketingCalendar = () => {
  const [tasks, setTasks] = useState<MarketingTask[]>([
    {
      id: 1,
      title: 'Social Media Campaign',
      description: 'Launch Instagram promotion for new service',
      date: '2024-03-15',
      type: 'Social Media',
      status: 'planned'
    },
    {
      id: 2,
      title: 'Email Newsletter',
      description: 'Monthly newsletter to existing clients',
      date: '2024-03-20',
      type: 'Email',
      status: 'in-progress'
    }
  ]);

  const [newTask, setNewTask] = useState<Omit<MarketingTask, 'id'>>({
    title: '',
    description: '',
    date: '',
    type: '',
    status: 'planned'
  });

  const handleAddTask = () => {
    if (newTask.title && newTask.date) {
      setTasks([
        ...tasks,
        {
          ...newTask,
          id: tasks.length + 1
        }
      ]);
      setNewTask({
        title: '',
        description: '',
        date: '',
        type: '',
        status: 'planned'
      });
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleStatusChange = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const statusMap = {
          'planned': 'in-progress',
          'in-progress': 'completed',
          'completed': 'planned'
        } as const;
        return { ...task, status: statusMap[task.status] };
      }
      return task;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned':
        return 'default';
      case 'in-progress':
        return 'primary';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CampaignIcon fontSize="large" color="primary" />
          Marketing Calendar
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Plan and track your marketing activities
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Add New Task */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Add New Marketing Task
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Type"
                  value={newTask.type}
                  onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  value={newTask.date}
                  onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddTask}
                  sx={{ height: '100%' }}
                >
                  Add Task
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={2}
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Task List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Marketing Tasks
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {tasks.map((task) => (
                <Paper
                  key={task.id}
                  elevation={1}
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {task.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {task.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Chip label={task.type} size="small" />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography variant="body2">
                        {new Date(task.date).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Chip
                        label={task.status}
                        color={getStatusColor(task.status)}
                        onClick={() => handleStatusChange(task.id)}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Alert severity="info" sx={{ mt: 2 }}>
        Click on a task's status chip to update its progress.
      </Alert>
    </Container>
  );
};

export default MarketingCalendar; 