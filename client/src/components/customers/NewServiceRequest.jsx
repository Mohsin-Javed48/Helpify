import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SocketContext from '../../context/SocketContext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  CircularProgress,
  Autocomplete,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from '@mui/x-date-pickers';

const timeSlots = [
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
  '06:00 PM - 08:00 PM',
];

const NewServiceRequest = () => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { user } = useSelector((state) => state.auth);

  const [services, setServices] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    selectedServices: [],
    scheduledDate: null,
    scheduledTime: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'USA',
    },
    notes: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/v1/services');
        setAvailableServices(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load available services. Please try again later.');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    // Setup socket event listeners
    if (socket) {
      socket.on('service-request-confirmation', (data) => {
        console.log('Service request confirmed:', data);
        navigate(`/service-requests/${data.requestId}`);
      });

      socket.on('service-request-error', (data) => {
        console.error('Service request error:', data);
        setError(
          data.message || 'Failed to submit service request. Please try again.'
        );
        setSubmitting(false);
      });

      // Cleanup function
      return () => {
        socket.off('service-request-confirmation');
        socket.off('service-request-error');
      };
    }
  }, [socket, navigate]);

  const validateForm = () => {
    const errors = {};

    if (formData.selectedServices.length === 0) {
      errors.selectedServices = 'Please select at least one service';
    }

    if (!formData.scheduledDate) {
      errors.scheduledDate = 'Please select a date';
    }

    if (!formData.scheduledTime) {
      errors.scheduledTime = 'Please select a time slot';
    }

    if (!formData.address.street) {
      errors.street = 'Street address is required';
    }

    if (!formData.address.city) {
      errors.city = 'City is required';
    }

    if (!formData.address.state) {
      errors.state = 'State is required';
    }

    if (!formData.address.zip) {
      errors.zip = 'ZIP code is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleServiceChange = (event, values) => {
    setFormData({
      ...formData,
      selectedServices: values.map((service) => ({
        serviceId: service._id,
        name: service.name,
        price: service.price,
        quantity: 1,
      })),
    });
  };

  const handleServiceQuantityChange = (index, newQuantity) => {
    const updatedServices = [...formData.selectedServices];
    updatedServices[index].quantity = Math.max(1, newQuantity);
    setFormData({
      ...formData,
      selectedServices: updatedServices,
    });
  };

  const handleRemoveService = (index) => {
    const updatedServices = [...formData.selectedServices];
    updatedServices.splice(index, 1);
    setFormData({
      ...formData,
      selectedServices: updatedServices,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      scheduledDate: date,
    });
  };

  const handleTimeChange = (event) => {
    setFormData({
      ...formData,
      scheduledTime: event.target.value,
    });
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handleNotesChange = (event) => {
    setFormData({
      ...formData,
      notes: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      // Use socket to emit service request
      socket.emit('service-request', {
        services: formData.selectedServices,
        scheduledDate: formData.scheduledDate,
        scheduledTime: formData.scheduledTime,
        address: formData.address,
        notes: formData.notes,
      });

      // Note: We don't set submitting to false here because
      // we'll navigate away on success via the socket event handler
    } catch (err) {
      console.error('Error submitting service request:', err);
      setError('Failed to submit service request. Please try again later.');
      setSubmitting(false);
    }
  };

  const calculateTotal = () => {
    return formData.selectedServices.reduce((total, service) => {
      return total + service.price * service.quantity;
    }, 0);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/service-requests')}
        sx={{ mb: 3 }}
      >
        Back to Service Requests
      </Button>

      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        New Service Request
      </Typography>

      {error && (
        <Box sx={{ mb: 3 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                1. Select Services
              </Typography>
              <Autocomplete
                multiple
                options={availableServices}
                getOptionLabel={(option) => option.name}
                onChange={handleServiceChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Services"
                    error={!!formErrors.selectedServices}
                    helperText={formErrors.selectedServices}
                  />
                )}
              />
            </Grid>

            {formData.selectedServices.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Selected Services:
                </Typography>
                {formData.selectedServices.map((service, index) => (
                  <Card key={index} sx={{ mb: 1 }}>
                    <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs>
                          <Typography variant="body1">
                            {service.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ${service.price} per unit
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                              size="small"
                              onClick={() =>
                                handleServiceQuantityChange(
                                  index,
                                  service.quantity - 1
                                )
                              }
                              disabled={service.quantity <= 1}
                            >
                              -
                            </Button>
                            <Typography sx={{ mx: 1 }}>
                              {service.quantity}
                            </Typography>
                            <Button
                              size="small"
                              onClick={() =>
                                handleServiceQuantityChange(
                                  index,
                                  service.quantity + 1
                                )
                              }
                            >
                              +
                            </Button>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 'bold',
                              minWidth: '80px',
                              textAlign: 'right',
                            }}
                          >
                            ${(service.price * service.quantity).toFixed(2)}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleRemoveService(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: 'primary.light',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    Estimated Total: ${calculateTotal().toFixed(2)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', mt: 0.5 }}>
                    *Final price may vary based on service provider bids
                  </Typography>
                </Box>
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                2. Schedule Service
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ mb: 2 }}>
                  <DatePicker
                    label="Service Date"
                    value={formData.scheduledDate}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!formErrors.scheduledDate}
                        helperText={formErrors.scheduledDate}
                      />
                    )}
                    disablePast
                    minDate={new Date()}
                  />
                </Box>
              </LocalizationProvider>

              <FormControl fullWidth error={!!formErrors.scheduledTime}>
                <InputLabel>Preferred Time Slot</InputLabel>
                <Select
                  value={formData.scheduledTime}
                  onChange={handleTimeChange}
                  label="Preferred Time Slot"
                >
                  {timeSlots.map((slot) => (
                    <MenuItem key={slot} value={slot}>
                      {slot}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.scheduledTime && (
                  <FormHelperText>{formErrors.scheduledTime}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                3. Service Location
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Street Address"
                    name="street"
                    value={formData.address.street}
                    onChange={handleAddressChange}
                    fullWidth
                    error={!!formErrors.street}
                    helperText={formErrors.street}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    name="city"
                    value={formData.address.city}
                    onChange={handleAddressChange}
                    fullWidth
                    error={!!formErrors.city}
                    helperText={formErrors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="State"
                    name="state"
                    value={formData.address.state}
                    onChange={handleAddressChange}
                    fullWidth
                    error={!!formErrors.state}
                    helperText={formErrors.state}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="ZIP Code"
                    name="zip"
                    value={formData.address.zip}
                    onChange={handleAddressChange}
                    fullWidth
                    error={!!formErrors.zip}
                    helperText={formErrors.zip}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Country"
                    name="country"
                    value={formData.address.country}
                    onChange={handleAddressChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                4. Additional Notes (Optional)
              </Typography>
              <TextField
                label="Describe any specific details about your request"
                name="notes"
                value={formData.notes}
                onChange={handleNotesChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  type="button"
                  sx={{ mr: 2 }}
                  onClick={() => navigate('/service-requests')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={submitting}
                  startIcon={submitting ? <CircularProgress size={20} /> : null}
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default NewServiceRequest;
