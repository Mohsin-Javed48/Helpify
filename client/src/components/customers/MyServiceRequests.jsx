import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';

const MyServiceRequests = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [serviceRequests, setServiceRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtering and sorting
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/service-requests/customer', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setServiceRequests(response.data.data);
        setFilteredRequests(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching service requests:', err);
        setError(
          err.response?.data?.message ||
            'Failed to load service requests. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServiceRequests();
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let results = [...serviceRequests];

    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter((request) => request.status === statusFilter);
    }

    // Apply search query (search in services array)
    if (searchQuery) {
      results = results.filter((request) => {
        const servicesMatch = request.services.some((service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const addressMatch = Object.values(request.address)
          .join(' ')
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        return servicesMatch || addressMatch;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'date-asc':
        results.sort(
          (a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate)
        );
        break;
      case 'date-desc':
        results.sort(
          (a, b) => new Date(b.scheduledDate) - new Date(a.scheduledDate)
        );
        break;
      case 'status':
        results.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'price-asc':
        results.sort((a, b) => getTotal(a) - getTotal(b));
        break;
      case 'price-desc':
        results.sort((a, b) => getTotal(b) - getTotal(a));
        break;
      default:
        break;
    }

    setFilteredRequests(results);
  }, [statusFilter, sortBy, searchQuery, serviceRequests]);

  const getTotal = (request) => {
    return request.services.reduce(
      (sum, service) => sum + service.price * service.quantity,
      0
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'accepted':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleCreateNew = () => {
    navigate('/new-service-request');
  };

  const handleViewDetails = (requestId) => {
    navigate(`/service-requests/${requestId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 3,
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1">
          My Service Requests
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
        >
          New Request
        </Button>
      </Box>

      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
        }}
      >
        <TextField
          label="Search services or address"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flexGrow: 1 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
            startAdornment={<FilterListIcon fontSize="small" sx={{ mr: 1 }} />}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by"
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
            startAdornment={<SortIcon fontSize="small" sx={{ mr: 1 }} />}
          >
            <MenuItem value="date-desc">Date (Newest)</MenuItem>
            <MenuItem value="date-asc">Date (Oldest)</MenuItem>
            <MenuItem value="status">Status</MenuItem>
            <MenuItem value="price-desc">Price (High to Low)</MenuItem>
            <MenuItem value="price-asc">Price (Low to High)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredRequests.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" gutterBottom>
            No service requests found
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {statusFilter !== 'all'
              ? `You don't have any ${statusFilter} service requests.`
              : "You haven't created any service requests yet."}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateNew}
            sx={{ mt: 2 }}
          >
            Create Your First Request
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredRequests.map((request) => (
            <Grid item xs={12} md={6} lg={4} key={request.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                    cursor: 'pointer',
                  },
                }}
                onClick={() => handleViewDetails(request.id)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Chip
                      label={request.status.toUpperCase()}
                      color={getStatusColor(request.status)}
                      size="small"
                    />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Services:
                    </Typography>
                    {request.services.map((service, idx) => (
                      <Typography variant="body2" key={idx}>
                        • {service.name} x{service.quantity}
                      </Typography>
                    ))}
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Date:</strong>{' '}
                    {new Date(request.scheduledDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Time:</strong> {request.scheduledTime}
                  </Typography>
                  <Typography variant="body2" noWrap>
                    <strong>Address:</strong> {request.address.street},{' '}
                    {request.address.city}
                  </Typography>

                  <Box
                    sx={{
                      mt: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      ${getTotal(request).toFixed(2)}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(request.id);
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyServiceRequests;
