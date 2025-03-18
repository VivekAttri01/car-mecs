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
import { db } from '../firebase'; // Import Firestore database
import { doc, setDoc } from 'firebase/firestore'; // Firestore methods

function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '', // Added mobile number field
    carModel: '',
    carNumber: '',
    servicePeriod: '6', // Default to 6 months
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mobile number format
    const mobileNumberRegex = /^[6-9]\d{9}$/; // Indian mobile number validation
    if (!mobileNumberRegex.test(formData.mobileNumber)) {
      alert('Please enter a valid mobile number.');
      return;
    }

    // Calculate the price based on the service period
    const priceMapping = {
      '6': 3999,
      '12': 6999,
      '18': 10499,
    };
    const price = priceMapping[formData.servicePeriod];

    try {
      // Save car number and other details to Firestore
      await setDoc(doc(db, 'users', formData.email), {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        carModel: formData.carModel,
        carNumber: formData.carNumber.toUpperCase(), // Convert car number to uppercase
        servicePeriod: formData.servicePeriod,
        paymentStatus: 'Pending', // Default payment status
        validityEndDate: null, // Will be updated after payment
      });

      // Navigate to the Payment Page with details
      navigate('/payment', { state: { price, formData } });
    } catch (error) {
      console.error('Error saving user data:', error.message);
      alert('Failed to register your car. Please try again.');
    }
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
              type="email" // Added email validation type
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Mobile Number"
              name="mobileNumber"
              type="tel" // Added telephone input type for better validation
              value={formData.mobileNumber}
              onChange={handleChange}
              inputProps={{ maxLength: 10 }} // Limit input to 10 digits
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
              label="Car Number (e.g., HR26DK8337)"
              name="carNumber"
              value={formData.carNumber}
              onChange={(e) =>
                setFormData({ ...formData, carNumber: e.target.value.toUpperCase() })
              } // Automatically convert input to uppercase for consistency
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
            >
              <MenuItem value="6">6 Months</MenuItem>
              <MenuItem value="12">12 Months</MenuItem>
              <MenuItem value="18">18 Months</MenuItem>
            </TextField>
            <Box textAlign="center" mt={2}>
              <Button variant="contained" color="primary" type="submit">
                Proceed to Payment
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegistrationPage;
