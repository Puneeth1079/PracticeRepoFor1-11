import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Welcome, {user.name}!</h2>
      <p>Ready for your next adventure? Find and book the perfect room for your stay.</p>
      <div className="cards-container">
          <div className="stat-card">
              <h3>Explore Rooms</h3>
              <p>Find the best rooms with great amenities.</p>
              <Link to="/rooms" className="cta-button-small">Browse Rooms</Link>
          </div>
          <div className="stat-card">
              <h3>Your Bookings</h3>
              <p>View or manage your upcoming and past stays.</p>
              <Link to="/my-bookings" className="cta-button-small">View My Bookings</Link>
          </div>
      </div>
    </div>
  );
}