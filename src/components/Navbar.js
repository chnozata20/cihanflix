import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex bg-gradient-to-r from-[#0D253F] to-[#3B4B91] text-white py-4 flex justify-between items-center pl-8 shadow-lg">
            <div className="flex items-center space-x-6">
                <Link to="/" className="hover:text-yellow-400 transition duration-200">
                    <span className="text-[#7bb7d5] font-extrabold text-2xl">
                        CIHANFLIX
                    </span>
                </Link>
                <div className="flex space-x-4">
                    <Link to="/movies" className="hover:text-yellow-400 transition duration-200">
                        Movies
                    </Link>
                    <Link to="/tvshows" className="hover:text-yellow-400 transition duration-200">
                        TV Shows
                    </Link>
                </div>
            </div>
        </nav>
    );
}
