import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../contexts/MovieContext";
import Rating from "../components/Rating";
import { FaPlay } from "react-icons/fa"; // FontAwesome play icon

export default function Product() {
    const { mediaId } = useParams();
    const {
        selectedMovie,
        selectedTVShow,
        loadMovieDetails,
        loadTVShowDetails,
        toggleFavourite,
        favourites,
        cast,
    } = useContext(MovieContext);

    const isMovie = window.location.href.includes("movie");
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        if (isMovie) {
            loadMovieDetails(mediaId).then((details) => {
                if (details && details.videos) {
                    const trailer = details.videos.results.find(
                        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                    );
                    if (trailer) setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
                }
            });
        } else {
            loadTVShowDetails(mediaId).then((details) => {
                if (details && details.videos) {
                    const trailer = details.videos.results.find(
                        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                    );
                    if (trailer) setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
                }
            });
        }
    }, [mediaId, isMovie]);
    

    const media = isMovie ? selectedMovie : selectedTVShow;

    if (!media)
        return (
            <div className="text-center text-gray-400 text-xl py-20 animate-fadeIn">
                Loading...
            </div>
        );

    const isFavourited = favourites.some((fav) => fav.id === media.id);

    return (
        <div className="container mx-auto px-4 py-10 animate-fadeIn">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-center">
                {/* Poster */}
                <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-500 ease-in-out shadow-2xl">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                        alt={isMovie ? media.title : media.name}
                        className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-110"
                    />
                </div>

                {/* Media Details */}
                <div className="flex-grow text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-white mb-4 leading-tight transition-all duration-500 ease-in-out hover:text-yellow-500">
                        {isMovie ? media.title : media.name}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center justify-center lg:justify-start mb-6">
                        <Rating score={media.vote_average} />
                    </div>

                    <p className="text-gray-300 mt-4 mb-8 leading-relaxed tracking-wide text-lg transition-all duration-300 ease-in-out hover:text-gray-200">
                        {media.overview}
                    </p>

                    {/* Play Trailer Button */}
                    {trailerUrl && (
                        <button
                            onClick={() => window.open(trailerUrl, "_blank")}
                            className="flex items-center justify-center gap-2 py-2 px-8 mb-4 rounded-full font-semibold text-lg shadow-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-transform duration-300 transform hover:scale-110"
                        >
                            <FaPlay /> {/* Play Icon */}
                            Play Trailer
                        </button>
                    )}

                    {/* Add space between the buttons */}
                    <div className="mt-4"></div>

                    {/* Favourites Button */}
                    <button
                        onClick={() => toggleFavourite(media)}
                        className={`py-2 px-8 rounded-full font-semibold text-lg shadow-lg focus:outline-none transition-transform duration-300 transform hover:scale-110 ${
                            isFavourited
                                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                : "bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                        }`}
                    >
                        {isFavourited ? "Remove from Favourites" : "Add to Favourites"}
                    </button>

                    {/* Additional Details */}
                    <div className="mt-8 space-y-3 text-gray-300 text-lg leading-relaxed">
                        <p>
                            <span className="font-semibold text-yellow-500">
                                Release Date:
                            </span>{" "}
                            {isMovie ? media.release_date : media.first_air_date}
                        </p>
                        <p>
                            <span className="font-semibold text-yellow-500">
                                Genres:
                            </span>{" "}
                            {media.genres.map((genre) => genre.name).join(", ")}
                        </p>
                        <p>
                            <span className="font-semibold text-yellow-500">
                                Runtime:
                            </span>{" "}
                            {isMovie ? media.runtime : media.episode_run_time[0]} mins
                        </p>
                    </div>
                </div>
            </div>

            {/* Cast Section */}
            <div className="mt-14">
                <h2 className="text-3xl text-yellow-500 font-semibold mb-8 text-center lg:text-left animate-slideIn">
                    Cast
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {cast.slice(0, 12).map((actor) => (
                        <div
                            key={actor.id}
                            className="flex flex-col items-center text-center group transform hover:scale-105 transition-transform duration-500"
                        >
                            <div className="w-24 h-24 lg:w-28 lg:h-28 overflow-hidden rounded-full mb-3 shadow-lg transition-transform duration-500 ease-in-out group-hover:scale-110">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                                    alt={actor.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <p className="text-white text-sm font-medium group-hover:text-yellow-500 transition-colors duration-300 ease-in-out">
                                {actor.name}
                            </p>
                            <p className="text-gray-400 text-xs">
                                {actor.character}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
