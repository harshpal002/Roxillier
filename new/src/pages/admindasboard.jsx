import React, { useEffect, useState } from 'react';
import api from '../services/api';

function AdminDashboard() {
  const [data, setData] = useState({ users: [], stores: [], ratings: [] });
  const [filter, setFilter] = useState('');

  const fetchData = async () => {
    try {
      const res = await api.get('/admin/dashboard', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setData(res.data);
    } catch {
      alert("Failed to load admin data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredUsers = data.users.filter(u =>
    u.name.includes(filter) || u.email.includes(filter) || u.address.includes(filter)
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Total Users: {data.users.length}</p>
      <p>Total Stores: {data.stores.length}</p>
      <p>Total Ratings: {data.ratings.length}</p>

      <input
        placeholder="Filter users/stores"
        className="border p-2 w-full my-4"
        onChange={(e) => setFilter(e.target.value)}
      />

      <h2 className="text-xl font-semibold mt-4">Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th><th>Email</th><th>Address</th><th>Role</th><th>Rating (if Owner)</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u, i) => (
            <tr key={i} className="text-center">
              <td>{u.name}</td><td>{u.email}</td><td>{u.address}</td><td>{u.role}</td>
              <td>{u.role === 'owner' ? u.rating?.toFixed(1) : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-6">Stores</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th><th>Email</th><th>Address</th><th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.stores.map((s, i) => (
            <tr key={i} className="text-center">
              <td>{s.name}</td><td>{s.email}</td><td>{s.address}</td><td>{s.averageRating?.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
