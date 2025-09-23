import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function Profile() {
    const { user, login } = useAuth(); // get login function to update context
    const [formData, setFormData] = useState({ ...user });
    const [message, setMessage] = useState('');

    useEffect(() => {
        setFormData({ ...user });
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await api.post('/customer/profile/update', formData);
            // Update the user in AuthContext and sessionStorage with the latest data from the server
            login({ ...response.data, role: user.role }); 
            setMessage("Profile updated successfully!");
        } catch (error) {
            setMessage("Failed to update profile.");
            console.error(error);
        }
    };

    return (
        <div className="management-container">
            <h1>My Profile</h1>
            {message && <p className="success-message">{message}</p>}
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Username (cannot be changed)</label>
                    <input type="text" name="username" value={formData.username} readOnly />
                </div>
                 <div className="form-group">
                    <label>Email (cannot be changed)</label>
                    <input type="email" name="email" value={formData.email} readOnly />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Contact</label>
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <button type="submit" className="submit-button">Save Changes</button>
            </form>
        </div>
    );
}