import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1a73e8' }}>
      <Toolbar>
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="logo" 
          onClick={() => navigate('/mainpage')} // Navigate to /mainpage when the icon is clicked
        >
          <DirectionsCarIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }} 
          onClick={() => navigate('/')} // Navigate to /mainpage when the text is clicked
        >
          Car-Mecs
        </Typography>
        <Button color="inherit" onClick={() => navigate('/about')}>About Us</Button>
        <Button color="inherit" onClick={() => navigate('/contact')}>Contact Us</Button>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;