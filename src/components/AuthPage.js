import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import Navbar from './Navbar';

function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        // Register the user
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Registration successful! Please log in.');
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
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                size="large" 
                sx={{ textTransform: 'none' }}
              >
                {isRegister ? 'Register' : 'Login'}
              </Button>
            </Box>
          </form>
          <Typography 
            align="center" 
            sx={{ marginTop: 2, cursor: 'pointer', color: '#1a73e8' }} 
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Already have an account? Login here.' : "Don't have an account? Register now."}
          </Typography>
        </CardContent>
      </Card>
    </Box>
    </>
  );
}

export default AuthPage;