import React from 'react';

function StoreCard({ store, onRateChange, onRateSubmit }) {
  return (
    <div className="border p-4 mb-3 rounded-lg shadow">
      <h2 className="text-lg font-semibold">{store.name}</h2>
      <p className="text-sm">{store.address}</p>
      <p className="text-sm">Average Rating: {store.averageRating?.toFixed(1) || "N/A"}</p>
      <input
        type="number"
        min="1"
        max="5"
        className="border p-1 w-20 mt-2"
        onChange={e => onRateChange(e.target.value)}
      />
      <button
        className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
        onClick={onRateSubmit}
      >
        Rate
      </button>
    </div>
  );
}

export default StoreCard;
