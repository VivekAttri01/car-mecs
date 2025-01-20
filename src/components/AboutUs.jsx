import React from 'react';
import './AboutUs.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function AboutUs() {
  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <div className="about-us-container">
      <h1 className="about-us-title">About Car-Mecs</h1>
      <p className="about-us-mission">
        Our mission is to enable premium quality care for your luxury car service at affordable pricing. 
        We ensure real-time updates for complete car care needs with a fair and transparent pricing mechanism.
      </p>
      <p className="about-us-details">
        Skilled technicians, working at our state-of-the-art German technology workshop, further ensure 
        that only genuine OEM parts are used for your car care needs. Customer satisfaction is at the core 
        of all initiatives at Car-Mecs.
      </p>
      <p className="about-us-details">
        Online appointment scheduling with doorstep, same-day pickup, and drop anywhere in Pune is our 
        constant endeavor to maximize customer convenience. Our commitment stands for reliability and 
        unequalled professionalism to provide dealer-quality auto-service at a fair price.
      </p>
      <div className="about-us-buttons">
        <button onClick={() => navigate('/auth')} className="about-us-button">
          Book an Appointment
        </button>
        <button onClick={() => navigate('/contact')} className="about-us-button">
          Contact Us
        </button>
      </div>
    </div>
    </>
  );
}

export default AboutUs;
