import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5500/login', credentials);
      if (response.data.userId) {
        // Login successful
        login(response.data.userId);
        navigate('/');
      } else {
        // Alert user if login failed due to incorrect email or password
        alert('Login unsuccessful. Please check your email and password.');
      }
    } catch (error) {
      // Handle server errors or network issues
      console.error('Login failed', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className='text-center'>
      <br /><br />
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Email" required /><br /><br />
        <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" required /><br /><br />
        <button type="submit" className='btn btn-primary'>Login</button><br /><br />
        <Link to="/signup">Don't have an account? Sign up</Link>
        <br/>
        <Link to="/forgotPassword">Forgot Password? Click here</Link>
      </form>
    </div>
  );
};

export default Login;
