import React from 'react';

export default function ManagerDashboard() {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Manager Dashboard</h2>
      <p>Welcome to your dashboard. Here you can manage your hotel's rooms and view all customer bookings.</p>
      <div className="cards-container">
        <div className="stat-card">
          <h3>Manage Your Rooms</h3>
          <p>Add, edit, or remove rooms to keep your listings up to date.</p>
        </div>
        <div className="stat-card">
          <h3>View Bookings</h3>
          <p>See all active and past bookings for your hotel.</p>
        </div>
      </div>
    </div>
  );
}