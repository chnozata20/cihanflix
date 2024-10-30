import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";
import SearchBar from "../components/SearchBar";
import MediaPoster from "../components/MediaPoster";
import Pagination from "../components/Pagination";
import GenreFilter from "../components/GenreFilter";
import SortOrder from "../components/SortOrder";
import CategoryButtons from "../components/CategoryButtons";
import { useLocation } from "react-router-dom";

export default function Category() {
    const {
        filteredAndSortedMovies,
        filteredAndSortedTVShows,
        handleSearch,
        handleCategoryChange,
        selectedCategory,
        fetchBackgroundImage,
        backgroundImage,
        genres,
        setFilter,
        setSortOrder,
    } = useContext(MovieContext);

    const location = useLocation();
    const isMovie = location.pathname.includes("movies");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        // Fetch the background image initially
        fetchBackgroundImage();
    
        // Set an interval to fetch the background image every 20 seconds
        const interval = setInterval(() => {
            fetchBackgroundImage();
        }, 10000);
    
        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);
    

    const totalItems = isMovie ? filteredAndSortedMovies : filteredAndSortedTVShows;
    const totalPages = Math.ceil(totalItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentDisplayedItems = totalItems.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            <Header backgroundImage={backgroundImage} isMovie={isMovie} handleSearch={handleSearch} />
            
            {/* Filtering and Sorting Options */}
            <div className="flex justify-center my-4 space-x-4">
                <GenreFilter genres={genres} setFilter={setFilter} />
                <SortOrder setSortOrder={setSortOrder} />
            </div>

            {/* Category Buttons */}
            <CategoryButtons 
                isMovie={isMovie} 
                selectedCategory={selectedCategory} 
                handleCategoryChange={handleCategoryChange} 
            />

            {/* Media Grid */}
            <MediaGrid items={currentDisplayedItems} />

            {/* Pagination */}
            <Pagination 
                totalPages={totalPages} 
                changePage={setCurrentPage} 
                currentPage={currentPage} 
            />
        </div>
    );
}

// Header Component
const Header = ({ backgroundImage, isMovie, handleSearch }) => (
    <div
        className="bg-cover bg-center py-24 text-white transition-opacity duration-50000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImage})` }}
    >
        <h1 className="text-6xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500">
            Welcome to {isMovie ? "Movies" : "TV Shows"}!
        </h1>
        <p className="text-xl text-center mb-4 font-bold">
            Discover amazing {isMovie ? "movies" : "TV shows"}. Start exploring now.
        </p>
        <SearchBar onSearch={handleSearch} />
    </div>
);



const MediaGrid = ({ items }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center items-center">
        {items.map((item) => (
            <MediaPoster key={item.id} item={item} />
        ))}
    </div>
);
