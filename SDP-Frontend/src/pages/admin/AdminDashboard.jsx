import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import api from '../../services/api'; // 👈 Updated import
// admin manages both managers and customers
export default function AdminDashboard() {
  const [counts, setCounts] = useState({ customers: 0, managers: 0 });
  
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [customersRes, managersRes] = await Promise.all([
          api.get('/admin/customerscount'), // 👈 Updated
          api.get('/admin/managerscount'),   // 👈 Updated
        ]);
        setCounts({
          customers: customersRes.data,
          managers: managersRes.data,
        });
      } catch (err) {
        console.error("Failed to fetch counts", err);
      }
    };
    fetchCounts();
  }, []);
  
  // ... rest of the component is the same ...
  const data = [
    { name: 'Customers', value: counts.customers },
    { name: 'Managers', value: counts.managers },
  ];
  const COLORS = ['#8884d8', '#82ca9d'];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Admin Dashboard</h2>
      <div className="cards-container">
        <div className="stat-card">
          <h3>Total Customers</h3>
          <p>{counts.customers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Managers</h3>
          <p>{counts.managers}</p>
        </div>
      </div>
      <div className="chart-container">
        <h3>User Overview</h3>
        <PieChart width={400} height={300}>
          <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}