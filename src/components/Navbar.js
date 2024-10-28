import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-[#0D253F] text-white py-4 flex justify-between items-center pl-8">
            <div className="flex items-center space-x-6">
                <Link to="/" className="hover:text-blue-400">
                    <span className="text-[#7bb7d5] font-bold text-xl">
                        CIHANFLIX
                    </span>
                </Link>
                <div className="flex space-x-4">
                    <Link to="/movies" className="hover:text-blue-400">
                        Movies
                    </Link>
                    <Link to="/tvshows" className="hover:text-blue-400">
                        TV Shows
                    </Link>
                </div>
            </div>
        </nav>
    );
}
