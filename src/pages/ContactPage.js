import React, { useState } from 'react';
import { sendContactEmail } from '../api/api';
import Layout from '../components/Layout.js';

const ContactPage = () => {
  const [contactForm, setContactForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    description: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactEmail(contactForm);
      setSuccessMessage('Email sent successfully');
      setContactForm({
        email: '',
        firstName: '',
        lastName: '',
        description: '',
      });
    } catch (error) {
      console.error('Error sending contact email:', error);
      alert('Failed to send email');
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={contactForm.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={contactForm.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={contactForm.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {successMessage && (
              <div className="alert alert-success mt-3" role="alert">
                {successMessage}
              </div>
            )}
          </div>
          <div className="col-md-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.7803560182737!2d21.15507831523495!3d42.66291467916883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ec47d30e8d1%3A0x353ba0b88c64da4a!2sPrishtina!5e0!3m2!1sen!2s!4v1596636630405!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Prishtina Map"
            ></iframe>
            <p>Prishtina 20000</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
