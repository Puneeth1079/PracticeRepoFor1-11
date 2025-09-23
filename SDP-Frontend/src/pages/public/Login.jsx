import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api'; // 👈 Updated import

export default function Login() {
  const [role, setRole] = useState('CUSTOMER');
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    let url, userRole, navigateTo;
    if (role === 'CUSTOMER') {
      url = '/customer/checkcustomerlogin';
      userRole = 'CUSTOMER';
      navigateTo = '/';
    } else if (role === 'MANAGER') {
      url = '/manager/checkmanagerlogin';
      userRole = 'MANAGER';
      navigateTo = '/';
    } else {
      url = '/admin/checkadminlogin';
      userRole = 'ADMIN';
      navigateTo = '/';
    }

    try {
      // 👇 Updated to use 'api' instance
      const response = await api.post(url, formData);
      if (response.data) {
        const userData = { ...response.data, role: userRole };
        login(userData);
        navigate(navigateTo);
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="form-background">
      <div className="form-container">
        <h3>Login to Your Account</h3>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Login As:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="CUSTOMER">Customer</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
}