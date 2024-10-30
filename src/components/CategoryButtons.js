import React from 'react'

export default function CategoryButtons({ isMovie, selectedCategory, handleCategoryChange }) {
  return (
    <div className="flex justify-center my-8">
    <div className="flex bg-[#1A202C] rounded-full p-1 shadow-lg">
        <button
            onClick={() => handleCategoryChange("popular")}
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                selectedCategory === "popular" ? "bg-gradient-to-r from-yellow-500 to-red-500 text-white" : "text-gray-300"
            }`}
        >
            {isMovie ? "Popular Movies" : "Popular TV Shows"}
        </button>
        <button
            onClick={() => handleCategoryChange("top_rated")}
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                selectedCategory === "top_rated" ? "bg-gradient-to-r from-yellow-500 to-red-500 text-white" : "text-gray-300"
            }`}
        >
            {isMovie ? "Top-Rated Movies" : "Top-Rated TV Shows"}
        </button>
    </div>
</div>
  )
}
