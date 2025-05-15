import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Home() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  const fetchStores = async () => {
    try {
      const res = await api.get('/stores', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setStores(res.data);
    } catch (err) {
      alert('Failed to fetch stores');
    }
  };

  const submitRating = async (storeId, rating) => {
    try {
      await api.post(`/stores/${storeId}/rate`, { rating }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchStores();
    } catch (err) {
      alert('Rating failed');
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const filtered = stores.filter(store =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Store Listings</h1>
      <input
        placeholder="Search by Name or Address"
        className="border p-2 w-full mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.map((store) => (
        <div key={store.id} className="border p-4 mb-3 rounded-lg shadow">
          <h2 className="text-lg font-semibold">{store.name}</h2>
          <p className="text-sm">{store.address}</p>
          <p className="text-sm">Average Rating: {store.averageRating?.toFixed(1) || "N/A"}</p>
          <input
            type="number"
            min="1"
            max="5"
            className="border p-1 w-20 mt-2"
            onChange={(e) => store.userRating = e.target.value}
          />
          <button
            className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => submitRating(store.id, store.userRating)}
          >
            Rate
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
