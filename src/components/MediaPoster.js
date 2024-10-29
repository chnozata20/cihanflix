import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../contexts/MovieContext";
import Rating from "./Rating";
import { motion } from "framer-motion";

export default function MediaPoster({ item }) {
    const navigate = useNavigate();
    const { toggleFavourite, favourites } = useContext(MovieContext);

    const isFavourited = favourites.some((fav) => fav.id === item.id);
    const isMovie = window.location.href.includes("movies"); // 'movies' yolundaysa isMovie true olacak.

    const handleClick = () => {
        const route = isMovie ? `/movie/${item.id}` : `/tvshow/${item.id}`;
        navigate(route);
    };

    return (
        <div className="w-min">
            <motion.div
                className="relative w-[220px] cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg overflow-hidden"
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
            >
                <motion.img
                    src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                    alt={isMovie ? item.title : item.name}
                    className="rounded-lg transition duration-300"
                    whileHover={{ opacity: 0.8, scale: 1.1 }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300" />
                <motion.button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavourite(item);
                    }}
                    className={`absolute top-2 right-2 bg-transparent border-none cursor-pointer text-2xl transition duration-300 ${
                        isFavourited
                            ? "text-yellow-500"
                            : "text-white hover:text-yellow-400"
                    }`}
                    whileHover={{ scale: 1.2 }}
                >
                    {isFavourited ? "★" : "☆"}
                </motion.button>
                <motion.div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-transparent to-transparent transition-all duration-300 opacity-0 hover:opacity-100">
                    <h3 className="text-white text-lg font-bold truncate">
                        {isMovie ? item.title : item.name}
                    </h3>
                    <p className="text-gray-300 text-sm">
                        {isMovie ? item.release_date : item.first_air_date}
                    </p>
                </motion.div>
            </motion.div>
            <Rating score={item.vote_average} />
        </div>
    );
}
