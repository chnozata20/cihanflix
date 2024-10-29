import React, { useState, useEffect } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, onSearch]);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  return (
    <div className="relative w-[80%] mx-auto mb-8">
      <input
        type="text"
        placeholder="Search for a movie, series or person..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="w-full px-6 py-3 rounded-full bg-[#1A202C] text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
      />
      <button
        onClick={() => onSearch(searchQuery)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-red-500 text-white px-6 py-3 rounded-full shadow-lg transition-colors duration-300 hover:from-yellow-600 hover:to-red-600"
      >
        Search
      </button>
    </div>
  );
}
