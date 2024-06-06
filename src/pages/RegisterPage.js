import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/api';
import Layout from '../components/Layout';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ email, password });
      if (response && response.success) {
        navigate('/login');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('An error occurred during registration');
    }
  };

  return (
    <Layout> 
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        <div>
          <p>Have an Account? <Link to="/login">Login Now!</Link></p>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
