import React, { useEffect, useState } from 'react';
import api from '../services/api';

function OwnerDashboard() {
  const [ratings, setRatings] = useState([]);

  const fetchRatings = async () => {
    try {
      const res = await api.get('/owner/ratings', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRatings(res.data);
    } catch {
      alert("Failed to fetch ratings.");
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const avg = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(2)
    : 'N/A';

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Store Owner Dashboard</h1>
      <p>Average Rating: {avg}</p>
      <h2 className="text-xl mt-4 mb-2">User Ratings</h2>
      <ul className="space-y-2">
        {ratings.map((r, i) => (
          <li key={i} className="border p-2 rounded shadow">
            <strong>{r.userName}</strong> rated <strong>{r.rating}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OwnerDashboard;
