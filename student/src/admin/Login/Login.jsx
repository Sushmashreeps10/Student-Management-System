import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Optional: include your styling here

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });

      const responseData = response.data;
      setMessage(responseData);

      // If backend sends "Login successful"
      if (responseData === 'Login successful') {
        // Optionally, store user info in localStorage
        localStorage.setItem('userEmail', email);

        // Navigate to Home page
        navigate('/admin/home'); // Adjust this path based on your routing setup
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
