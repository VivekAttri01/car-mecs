import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import Navbar from './Navbar';

function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        // Register the user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await userCredential.user.sendEmailVerification();
        alert('Registration successful! Please check your email for verification link.');
        setIsRegister(false); // Switch to login mode
      } else {
        // Login the user
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/home'); // Redirect to the homepage after login
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // Handle successful sign-in.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      navigate('/home'); // Redirect to the homepage after login
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      setError(errorMessage);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError('Password reset email sent successfully. Please check your inbox.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />

      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#e0e0e0">
        <Card sx={{ width: 400, padding: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#1a73e8', marginBottom: 3 }}>
              {isRegister ? 'Register' : 'Login'}
            </Typography>
            {error && <Typography color="error" align="center" sx={{ marginBottom: 2 }}>{error}</Typography>}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Box textAlign="center" mt={3}>
                <Button type="submit" variant="contained" color="primary" size="large" sx={{ textTransform: 'none' }}>
                  {isRegister ? 'Register' : 'Login'}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ textTransform: 'none', marginLeft: 2 }}
                  onClick={handleGoogleSignIn}
                >
                  Sign in with Google
                </Button>
              </Box>
            </form>
            <Typography align="center" sx={{ marginTop: 2 }}>
              {isRegister ? 'Already have an account? Login here.' : "Don't have an account? Register now."}
              <span style={{ cursor: 'pointer', color: '#1a73e8' }} onClick={() => setIsRegister(!isRegister)}>
                {' '}
                {isRegister ? 'Login' : 'Register'}
              </span>
            </Typography>
            <Typography align="center" sx={{ marginTop: 2 }}>
              <span style={{ cursor: 'pointer', color: '#1a73e8' }} onClick={handleForgotPassword}>
                Forgot Password?
              </span>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default AuthPage;