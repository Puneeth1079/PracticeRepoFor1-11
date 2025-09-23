import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ManagerDashboard from '../pages/manager/ManagerDashboard';
import ManageRooms from '../pages/manager/ManageRooms';
import ViewBookings from '../pages/manager/ViewBookings';

export default function ManagerNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <div className="header">
        <div className="logo"><h3>🏨 HotelHub</h3></div>
        <h2>Welcome, {user.username} (Manager)</h2>
      </div>
      <div className="app-container">
        <div className="vertical-navbar">
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/manage-rooms">Manage Rooms</Link></li>
              <li><Link to="/view-bookings">View Bookings</Link></li>
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </ul>
          </nav>
        </div>
        <div className="content-area">
          <Routes>
            <Route path="/" element={<ManagerDashboard />} />
            <Route path="/manage-rooms" element={<ManageRooms />} />
            <Route path="/view-bookings" element={<ViewBookings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}