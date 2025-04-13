import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', {
        name,
        email,
        password,
        role,
      });
      console.log(response);
      setMessage('Registration successful. Please login.');
      navigate('/admin/login'); // ✅ Correct path
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="title">Create Account</h2>
        <form onSubmit={handleRegister} className="form-container">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-field select-field"
          >
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit" className="submit-btn">Register</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Register;
