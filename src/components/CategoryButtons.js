import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CategoryButtons({ isMovie, handleCategoryChange }) {
    const navigate = useNavigate();
    const location = useLocation();

    // URL'den parametreleri almak
    const params = new URLSearchParams(location.search);
    const selectedCategory = params.get('category') || 'popular'; // Varsayılan olarak 'popular'

    // URL parametreleri değiştiğinde kategori değişikliğini güncelle
    useEffect(() => {
        handleCategoryChange(selectedCategory);
    }, [selectedCategory, handleCategoryChange]);

    const updateCategory = (category) => {
        // URL'yi güncelle
        params.set('category', category);
        navigate({ search: params.toString() });
        handleCategoryChange(category);
    };

    return (
        <div className="flex justify-center my-8">
            <div className="flex bg-[#1A202C] rounded-full p-1 shadow-lg">
                <button
                    onClick={() => updateCategory("popular")}
                    className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                        selectedCategory === "popular" ? "bg-gradient-to-r from-yellow-500 to-red-500 text-white" : "text-gray-300"
                    }`}
                >
                    {isMovie ? "Popular Movies" : "Popular TV Shows"}
                </button>
                <button
                    onClick={() => updateCategory("top_rated")}
                    className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                        selectedCategory === "top_rated" ? "bg-gradient-to-r from-yellow-500 to-red-500 text-white" : "text-gray-300"
                    }`}
                >
                    {isMovie ? "Top-Rated Movies" : "Top-Rated TV Shows"}
                </button>
            </div>
        </div>
    );
}
