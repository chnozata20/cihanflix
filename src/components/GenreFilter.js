import React from 'react'

export default function GenreFilter({ genres, setFilter }) {
  return (
    <select
        onChange={(e) => setFilter(e.target.value)}
        className="px-4 py-2 rounded-lg bg-[#2D3748] text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-lg transition duration-300"
    >
        <option value="">All Genres</option>
        {genres.map((genre) => (
            <option key={genre.id} value={genre.id} className="text-gray-900">
                {genre.name}
            </option>
        ))}
    </select>
  )
}
