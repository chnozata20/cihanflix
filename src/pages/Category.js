import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";
import SearchBar from "../components/SearchBar";
import MediaPoster from "../components/MediaPoster";
import { useLocation } from "react-router-dom"; 

export default function Category() {
    const {
        displayedMovies,
        displayedTVShows,
        handleSearch,
        handleCategoryChange,
        selectedCategory,
        fetchBackgroundImage,
        backgroundImage,
    } = useContext(MovieContext);

    const location = useLocation(); 
    const isMovie = location.pathname.includes("movies");

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchBackgroundImage();
    }, []);

    // Pagination logic
    const totalMovies = displayedMovies.length;
    const totalTVShows = displayedTVShows.length;

    const totalPagesMovies = Math.ceil(totalMovies / itemsPerPage);
    const totalPagesTVShows = Math.ceil(totalTVShows / itemsPerPage);

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentDisplayedMovies = displayedMovies.slice(startIndex, endIndex);
    const currentDisplayedTVShows = displayedTVShows.slice(startIndex, endIndex);

    return (
        <div>
            <div
                className="bg-cover bg-center py-24 text-white"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                }}
            >
                <h1 className="text-6xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500">
                    Welcome to {isMovie ? "Movies" : "TV Shows"}!
                </h1>
                <p className="text-xl text-center mb-4 font-bold">
                    Discover amazing {isMovie ? "movies" : "TV shows"}. Start exploring now.
                </p>
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className="flex justify-center my-8">
                <div className="flex bg-[#1A202C] rounded-full p-1 shadow-lg">
                    <button
                        onClick={() => handleCategoryChange("popular")}
                        className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                            selectedCategory === "popular"
                                ? "bg-gradient-to-r from-yellow-500 to-red-500 text-white"
                                : "text-gray-300"
                        }`}
                    >
                        {isMovie ? "Popular Movies" : "Popular TV Shows"}
                    </button>
                    <button
                        onClick={() => handleCategoryChange("top_rated")}
                        className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                            selectedCategory === "top_rated"
                                ? "bg-gradient-to-r from-yellow-500 to-red-500 text-white"
                                : "text-gray-300"
                        }`}
                    >
                        {isMovie ? "Top-Rated Movies" : "Top-Rated TV Shows"}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center items-center">
                {(isMovie ? currentDisplayedMovies : currentDisplayedTVShows).map((item) => (
                    <MediaPoster key={item.id} item={item} />
                ))}
            </div>

            <Pagination
                totalPages={isMovie ? totalPagesMovies : totalPagesTVShows}
                changePage={changePage}
                currentPage={currentPage}
            />
        </div>
    );
}
const Pagination = ({ totalPages, changePage, currentPage }) => {
    return (
        <div className="flex justify-center space-x-2 my-4">
            <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-3 rounded-full transition-colors duration-300 
                    ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-600 text-white"}`}
            >
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => changePage(index + 1)}
                    className={`p-3 rounded-full transition-colors duration-300 
                        ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                >
                    {index + 1}
                </button>
            ))}
            <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-3 rounded-full transition-colors duration-300 
                    ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-600 text-white"}`}
            >
                Next
            </button>
        </div>
    );
};
