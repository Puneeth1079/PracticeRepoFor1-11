import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Register() {
    const [formData, setFormData] = useState({ name: '', username: '', password: '', dob: '', gender: '', email: '', contact: '', address: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await api.post('/customer/register', formData);
            setSuccess(response.data); // Set success message from backend
            alert("Registration successful! Redirecting to login page.");
            setTimeout(() => navigate('/login'), 2000); // Wait 2 seconds before redirecting
        } catch (err) {
            if (err.response) {
                setError(err.response.data); // Set error message from backend
            } else {
                setError("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className="form-background">
            <form onSubmit={handleSubmit} className="form-container registration-form">
                <h3>Create a Customer Account</h3>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <div className="form-grid">
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                    <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                    <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number" required />
                    <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
                    <input name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
}