import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import ViewAllRooms from '../pages/customer/ViewAllRooms';
import MyBookings from '../pages/customer/MyBookings';
import Profile from '../pages/customer/Profile'; // 👈 Import Profile

export default function CustomerNavbar() {
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
        <h2>Welcome, {user.username}</h2>
      </div>
      <div className="app-container">
        <div className="vertical-navbar">
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/rooms">View & Book Rooms</Link></li>
              <li><Link to="/my-bookings">My Bookings</Link></li>
              <li><Link to="/profile">My Profile</Link></li> {/* 👈 Add Profile Link */}
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </ul>
          </nav>
        </div>
        <div className="content-area">
          <Routes>
            <Route path="/" element={<CustomerDashboard />} />
            <Route path="/rooms" element={<ViewAllRooms />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/profile" element={<Profile />} /> {/* 👈 Add Profile Route */}
          </Routes>
        </div>
      </div>
    </div>
  );
}