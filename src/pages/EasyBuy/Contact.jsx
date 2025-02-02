import React, { useState } from "react";
import "../../assets/css/Easybuy/contactUs.css"; // Updated CSS path
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify

const Contact = () => {
  // State for form data
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission logic
    const { name, email, message } = feedback;

    // Show success or error message based on form submission
    if (name && email && message) {
      toast.success("Message sent successfully!");
    } else {
      toast.error("Please fill out all fields.");
    }

    // Clear form after submission
    setFeedback({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-banner">
        <h1>Contact Us</h1>
      </div>
      {/* Main Content */}
      <div className="contact-container-main">
        {/* Left Side: Contact Details */}
        <div className="contact-details-container">
          <div className="contact-details">
            <h2>We’re Here to Help!</h2>
            <p>If you have any questions, concerns, or feedback, please don’t hesitate to reach out.</p>

            <h3>Email</h3>
            <p>sharinali321@gmail.com</p>

            <h3>Customer Service</h3>
            <p>Phone: 0324-1687082</p>
            <p>Monday to Saturday: 10:00 AM - 8:00 PM</p>

            <h3>Mailing Address</h3>
            <p>RandomAli</p>
            <p>Lahore, Punjab, Pakistan</p>

            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-heading">
              <h3>Contact Us</h3>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                id="name"
                placeholder=" "
                value={feedback.name}
                onChange={handleChange}
                required
                className="input-name"
              />
              <label htmlFor="name" className="label-input">
                Enter your name
              </label>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                value={feedback.email}
                onChange={handleChange}
                required
                className="input-email"
              />
              <label htmlFor="email" className="label-input">
                Email
              </label>
            </div>
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder=" "
                value={feedback.message}
                onChange={handleChange}
                required
              ></textarea>
              <label htmlFor="message" className="label-input">
                Enter your message
              </label>
            </div>
            <button type="submit" className="send-button">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Maps Iframe */}
      <div className="map-container">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6802.7251044938475!2d74.3457071!3d31.5142009!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190458505cf21b%3A0x41e671da20a40c8d!2sAl%20Lateef%20Center!5e0!3m2!1sen!2s!4v1731135194999!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Toast Notifications */}
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default Contact;
