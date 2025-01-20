import React from 'react';
import './Contact.css';
import Navbar from './Navbar';

function Contact() {
  return (
    <>
    <Navbar/>
    <div className="contact-section" id="contact">
      <h1 className="section-title">Contact Me</h1>
      <span className="section-subtitle">
        Want to connect? My inbox is always open!
      </span>

      <div className="contact-container">
        <div className="contact-links">
          <a href="mailto:atrivivek001@gmail.com" target="_blank" rel="noopener noreferrer">
            <div className="contact-info">
              <i className="uil uil-envelope-alt contact-icon"></i>
              <div>
                <h3 className="contact-title">Email</h3>
                <span className="contact-subtitle">atrivivek001@gmail.com</span>
              </div>
            </div>
          </a>

          <a href="https://twitter.com/VKsharma_24" target="_blank" rel="noopener noreferrer">
            <div className="contact-info">
              <i className="uil uil-twitter-alt contact-icon"></i>
              <div>
                <h3 className="contact-title">Twitter</h3>
                <span className="contact-subtitle">@VKsharma_24</span>
              </div>
            </div>
          </a>

          <a
            href="https://www.google.com/maps/d/u/0/viewer?mid=1WXXwERCPzow0i8MfXzxYuMtblEc&hl=en&ll=28.37891291246342%2C77.01771151524352&z=12"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="contact-info">
              <i className="uil uil-location-point contact-icon"></i>
              <div>
                <h3 className="contact-title">Location</h3>
                <span className="contact-subtitle">
                  Kharkhari, Manesar, Gurugram, 122503
                </span>
              </div>
            </div>
          </a>
        </div>

        <form
          action="https://formspree.io/f/xyzgyzry"
          className="contact-form"
          id="contact-form"
          method="POST"
        >
          <div className="alert-style" id="alert"></div>
          <div className="contact-inputs">
            <div className="contact-content">
              <label className="contact-label">Name</label>
              <input type="text" name="name" className="contact-input" required />
            </div>
            <div className="contact-content">
              <label className="contact-label">Email</label>
              <input type="email" name="email" className="contact-input" required />
            </div>
          </div>
          <div className="contact-content">
            <label className="contact-label">Subject</label>
            <input type="text" name="subject" className="contact-input" required />
          </div>
          <div className="contact-content">
            <label className="contact-label">Message</label>
            <textarea
              name="message"
              className="contact-input message"
              rows="7"
              required
            ></textarea>
          </div>
          <button type="submit" className="button">
            Send Message <i className="uil uil-message button-icon"></i>
          </button>
        </form>
      </div>
    </div></>
  );
}

export default Contact;
