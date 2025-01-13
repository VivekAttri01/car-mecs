import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    carModel: '',
    carNumber: '',
    servicePeriod: '6', // Default to 6 months
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate the price based on the service period
    const priceMapping = {
      '6': 3999,
      '12':6999,
      '18': 10499,
    };
    const price = priceMapping[formData.servicePeriod];

    // Navigate to the Payment Page with details
    navigate('/payment', { state: { price, formData } });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ width: 400, padding: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            align="center"
            sx={{ fontWeight: 'bold', color: '#1a73e8' }}
          >
            Register Your Car
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Car Model"
              name="carModel"
              value={formData.carModel}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Car Number"
              name="carNumber"
              value={formData.carNumber}
              onChange={handleChange}
              required
            />
            <TextField
              select
              fullWidth
              margin="normal"
              label="Service Period"
              name="servicePeriod"
              value={formData.servicePeriod}
              onChange={handleChange}
              required
            >
              <MenuItem value="6">6 Months</MenuItem>
              <MenuItem value="12">12 Months</MenuItem>
              <MenuItem value="18">18 Months</MenuItem>
            </TextField>
            <Box textAlign="center" mt={2}>
              <Button variant="contained" color="primary" type="submit">
                Proceed
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegistrationPage;
