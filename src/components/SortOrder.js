import React from 'react'

export default function SortOrder({ setSortOrder }) {
  return (
    <select
    onChange={(e) => setSortOrder(e.target.value)}
    className="px-4 py-2 rounded-lg bg-[#2D3748] text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-lg transition duration-300"
>
    <option value="asc">Sort A-Z</option>
    <option value="desc">Sort Z-A</option>
</select>
  )
}
