

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from './Navbar';


function HomePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  const isLoggedIn = userData !== null;
  useEffect(() => {
    const fetchUserData = async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.email));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
      setLoading(false);
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
      } else {
        navigate('/');
      }
    });
  }, [auth, navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate('/'))
      .catch((err) => console.error('Error during logout:', err));
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  // Check if user has an active plan or payment
  const isSubscriptionActive = userData?.validityEndDate
    ? new Date(userData.validityEndDate) > new Date()
    : false;

  return (
    <>
    <Navbar isLoggedIn={isLoggedIn} />
    
      <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>

      {/* Main Content */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor="#e3f2fd"
      >
        <Card sx={{ width: 500, padding: 2, boxShadow: 3 }}>
          <CardContent>
            {userData ? (
              <>
                {isSubscriptionActive ? (
                  <>
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{ color: '#1a73e8', marginBottom: 2 }}
                    >
                      Welcome back, {userData.name}!
                    </Typography>
                    <Typography align="center" sx={{ color: '#666', marginBottom: 2 }}>
                      Payment Status: {userData.paymentStatus}
                    </Typography>
                    <Typography align="center" sx={{ color: '#666', marginBottom: 2 }}>
                      Validity Ends: {new Date(userData.validityEndDate).toDateString()}
                    </Typography>
                    <Typography align="center" sx={{ color: '#444', marginBottom: 4 }}>
                      Thank you for using Car-Mecs, your one-stop solution for car servicing and maintenance!
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{ color: '#ff0000', marginBottom: 2 }}
                    >
                      No payment record found. Please register and make a payment.
                    </Typography>
                    <Box textAlign="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/register')}
                      >
                        Register Now
                      </Button>
                    </Box>
                  </>
                )}
              </>
            ) : (
              <>
                <Typography
                  align="center"
                  sx={{ color: '#ff0000', marginBottom: 2 }}
                >
                  No user data found. Please register and make a payment.
                </Typography>
                <Box textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/register')}
                  >
                    Register Now
                  </Button>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Footer */}
      <Box bgcolor="#1a73e8" py={4} color="white">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Contact Me
          </Typography>
          <Typography variant="subtitle1" sx={{ marginBottom: 3 }}>
            Want to connect? My inbox is always open!
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            <a href="mailto:atrivivek001@gmail.com" target="_blank" rel="noopener noreferrer">
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="body1">📧 Email: atravivek001@gmail.com</Typography>
              </Box>
            </a>
            <a href="https://twitter.com/VKsharma_24" target="_blank" rel="noopener noreferrer">
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="body1">🐦 Twitter: @VKsharma_24</Typography>
              </Box>
            </a>
            <a href="https://www.google.com/maps/d/u/0/viewer?mid=1WXXwERCPzow0i8MfXzxYuMtblEc&hl=en&ll=28.37891291246342%2C77.01771151524352&z=12" target="_blank" rel="noopener noreferrer">
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="body1">📍 Location: kharkhari, Manesar, Gurugram, 122503</Typography>
              </Box>
            </a>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;