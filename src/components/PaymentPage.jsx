import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Firebase Firestore

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { price, formData } = location.state || {};

  const handlePayment = () => {
    if (!price || !formData) {
      alert('Invalid payment details. Please try again.');
      navigate('/register');
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, // Replace with Razorpay Key ID
      amount: price * 100, // Amount in paise
      currency: 'INR',
      name: 'Car-Mecs',
      description: `${formData.servicePeriod || 'N/A'}-month service plan`,
      handler: async function (response) {
        try {
          alert(`Payment Successful! Transaction ID: ${response.razorpay_payment_id}`);

          // Calculate the validity end date
          const validityEndDate = new Date();
          validityEndDate.setMonth(validityEndDate.getMonth() + parseInt(formData.servicePeriod, 10));

          // Clean data to avoid undefined fields
          const cleanData = {
            name: formData.name || '',
            email: formData.email || '',
            contact: formData.contact || '', // Ensure contact is optional
            servicePeriod: formData.servicePeriod || '',
            paymentDate: new Date().toISOString(),
            validityEndDate: validityEndDate.toISOString(),
            paymentStatus: 'Success',
            transactionId: response.razorpay_payment_id,
          };

          // Save user details and payment status to Firestore
          await setDoc(doc(db, 'users', formData.email), cleanData);

          // Redirect to the home page with payment details
          navigate('/home', {
            state: {
              paymentStatus: 'Success',
              validityEndDate: validityEndDate.toISOString(),
              transactionId: response.razorpay_payment_id,
            },
          });
        } catch (error) {
          console.error('Error saving payment details:', error);
          alert('Payment successful, but an error occurred while saving your details. Please contact support.');
        }
      },
      prefill: {
        name: formData.name || '',
        email: formData.email || '',
        contact: formData.contact || '',
      },
      theme: {
        color: '#1a73e8',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
      flexDirection="column"
    >
      <Card
        sx={{
          width: 400,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1a73e8' }}
          >
            Payment Page
          </Typography>
          <Typography
            variant="body1"
            align="center"
            gutterBottom
            sx={{ marginBottom: 3, color: '#666' }}
          >
            You selected a {formData?.servicePeriod || 'N/A'}-month service plan.
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ color: '#333', marginBottom: 3 }}
          >
            Amount: ₹{price || 0}
          </Typography>
          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handlePayment}
              sx={{
                backgroundColor: '#1a73e8',
                '&:hover': { backgroundColor: '#166bbf' },
                textTransform: 'none',
              }}
            >
              Pay via Razorpay
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Footer with Links */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={4}
        bgcolor="#1a73e8"
        color="white"
        padding={2}
        width="100%"
      >
        <Typography variant="h6" gutterBottom>
          Quick Links
        </Typography>
        <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
          <li>
            <a
              href="./assets/pdf/Terms and Conditions.pdf"
              className="footer_link"
              download
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Terms & Conditions
            </a>
          </li>
          <li>
            <a
              href="./assets/pdf/Cancellation and Refund.pdf"
              className="footer_link"
              download
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Cancellation Policy
            </a>
          </li>
          <li>
            <a
              href="./assets/pdf/Shipping and Delivery.pdf"
              className="footer_link"
              download
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Shipping and Delivery
            </a>
          </li>
        </ul>
      </Box>
    </Box>
  );
}

export default PaymentPage;