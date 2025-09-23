import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageManagers from '../pages/admin/ManageManagers';
import ManageCustomers from '../pages/admin/ManageCustomers';

export default function AdminNavbar() {
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
        <h2>Welcome, {user.username} (Admin)</h2>
      </div>
      <div className="app-container">
        <div className="vertical-navbar">
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/managers">Manage Managers</Link></li>
              <li><Link to="/customers">Manage Customers</Link></li>
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </ul>
          </nav>
        </div>
        <div className="content-area">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/managers" element={<ManageManagers />} />
            <Route path="/customers" element={<ManageCustomers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}