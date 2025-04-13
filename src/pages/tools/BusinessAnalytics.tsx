import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShowChartIcon from '@mui/icons-material/ShowChart';

// Sample data
const revenueData = [
  { month: 'Jan', revenue: 45000, customers: 120 },
  { month: 'Feb', revenue: 52000, customers: 145 },
  { month: 'Mar', revenue: 48000, customers: 135 },
  { month: 'Apr', revenue: 61000, customers: 150 },
  { month: 'May', revenue: 55000, customers: 140 },
  { month: 'Jun', revenue: 67000, customers: 160 },
];

const customerSegments = [
  { name: 'New', value: 30 },
  { name: 'Returning', value: 45 },
  { name: 'Loyal', value: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const MetricCard = ({ title, value, icon, trend }: { title: string; value: string; icon: React.ReactNode; trend: string }) => (
  <Paper
    sx={{
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 3,
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      {icon}
      <Typography variant="h6" color="primary">
        {trend}
      </Typography>
    </Box>
    <Typography variant="h4" component="div" sx={{ mb: 1 }}>
      {value}
    </Typography>
    <Typography color="text.secondary" variant="subtitle1">
      {title}
    </Typography>
  </Paper>
);

const BusinessAnalytics: React.FC = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Business Analytics
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Track your business performance metrics and insights
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="1m">Last Month</MenuItem>
            <MenuItem value="3m">Last 3 Months</MenuItem>
            <MenuItem value="6m">Last 6 Months</MenuItem>
            <MenuItem value="1y">Last Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Revenue"
            value="$328,000"
            icon={<TrendingUpIcon color="primary" sx={{ fontSize: 40 }} />}
            trend="+15.3%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Customers"
            value="850"
            icon={<PeopleIcon color="primary" sx={{ fontSize: 40 }} />}
            trend="+12.5%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Average Order Value"
            value="$386"
            icon={<ShoppingCartIcon color="primary" sx={{ fontSize: 40 }} />}
            trend="+8.2%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Growth Rate"
            value="18.4%"
            icon={<ShowChartIcon color="primary" sx={{ fontSize: 40 }} />}
            trend="+2.1%"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Overview
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke={theme.palette.secondary.main}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Customer Segments
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BusinessAnalytics; 