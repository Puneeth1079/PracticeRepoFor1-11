import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to HotelHub</h1>
        <p>Your one-stop solution for easy and efficient hotel bookings.</p>
        <Link to="/login" className="cta-button">Book Your Stay</Link>
      </div>
    </div>
  );
}