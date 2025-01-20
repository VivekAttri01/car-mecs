import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Grid, Stack } from '@mui/material';
import Navbar from './Navbar';
import image1 from '../assets/car1.jpg'; 
import dia from '../assets/Diagonistics.png'; 
import Dent from '../assets/Dent.png'; 
import Oil from '../assets/Oil.png'; 
import Suspension from '../assets/Suspension.png'; 
import Brakes from '../assets/Brakes.png'; 
import Detailing from '../assets/Detailing.png'; 

const quotes = [
    "Your Car's Health is Our Priority",
    "Expert Service, Exceptional Care",
    "Driving Excellence, One Service at a Time",
];

const WhyChooseUsSection = () => (
    <Box sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
            Why Choose Us
        </Typography>
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            We Offer Full Service Auto Repair & Maintenance
        </Typography>
        <Grid container spacing={4}>
            {[
                { img: dia, title: "Diagnostics", text: "If your car needs a mobile diagnostic check done at your home or office, let Car-Mecs come to you." },
                { img: Dent, title: "Dent & Paint", text: "Car-Mecs specializes in car dent repair and car painting services for a range of models." },
                { img: Oil, title: "Oil / Lube / Filters", text: "Car-Mecs proudly serves the Lube, Oil & Filter change needs of customers' vehicle performance while extending the life of your vehicle." },
                { img: Brakes, title: "Brakes", text: "The brake system consists of different parts that can be fixed individually. A detailed quote is given to you after we perform our systematic brake evaluation." },
                { img: Suspension, title: "Suspension", text: "The suspension system of your vehicle protects you from bouncing up and down due to the bad road conditions and bumps in the road." },
                { img: Detailing, title: "Detailing", text: "Car-Mecs offers professional car detail services at an affordable price. Our interior cleaning, detailing, and restoration services can help you recapture that new car look and feel." },
            ].map((service, index) => (
                <Grid key={index} item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={service.img} alt={service.title} />
                        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', mt: 2 }}>
                            {service.title}
                        </Typography>
                        <Typography align="center">{service.text}</Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    </Box>
);

function MainPage() {
    const navigate = useNavigate();
    const [currentQuote, setCurrentQuote] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
        }, 5000); // Change quote every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box sx={{ flexGrow: 1 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    minHeight: '90vh', // Ensures it doesn't occupy the full viewport height
                    backgroundImage: `url(${image1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {quotes[currentQuote]}
                </Typography>
                <Typography variant="h6" sx={{ mb: 4 }}>
                    Experience Professional Auto Care
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate('/auth')}
                        sx={{
                            backgroundColor: '#fff',
                            color: '#1a73e8',
                            '&:hover': { backgroundColor: '#f0f0f0' },
                        }}
                    >
                        Book Appointment
                    </Button>
                </Stack>
            </Box>

            {/* Services and Why Choose Us Sections */}
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
                    Our Services
                </Typography>
                <Grid container spacing={4}>
                    {[
                        { title: "Car Service Plans", text: "Choose from flexible service plans tailored to your needs." },
                        { title: "Seamless Payments", text: "Pay securely with Razorpay and get instant confirmations." },
                        { title: "Personalized Dashboard", text: "Track your payment status and service validity in real time." },
                    ].map((service, index) => (
                        <Grid key={index} item xs={12} sm={4}>
                            <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                                {service.title}
                            </Typography>
                            <Typography align="center">{service.text}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <WhyChooseUsSection />
        </Box>

        {/* Footer */}
        <Box sx={{ backgroundColor: '#1a73e8', color: '#ffffff', padding: 2, textAlign: 'center' }}>
            <Typography>
                &copy; {new Date().getFullYear()} Car-Mecs |
                <Button onClick={() => navigate('/about')} sx={{ color: '#ffffff', textTransform: 'none' }}>
                    About Us
                </Button>
                |
                <Button onClick={() => navigate('/contact')} sx={{ color: '#ffffff', textTransform: 'none' }}>
                    Contact Us
                </Button>
            </Typography>
        </Box>
    </Box>
);

}

export default MainPage;
