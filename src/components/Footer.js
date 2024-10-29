import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-8 mt-auto flex">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                {/* Logo veya Başlık */}
                <div className="text-white text-lg font-semibold mb-4 md:mb-0">
                    <Link to="/" className="hover:text-yellow-500 transition-colors duration-300">
                        CIHANFLIX
                    </Link>
                </div>

                {/* Menü Linkleri */}
                <div className="flex space-x-6 mb-4 md:mb-0">
                    <Link to="/movies" className="hover:text-yellow-500 transition-colors duration-300">
                        Movies
                    </Link>
                    <Link to="/tvshows" className="hover:text-yellow-500 transition-colors duration-300">
                        TV Shows
                    </Link>
                    <Link to="/about" className="hover:text-yellow-500 transition-colors duration-300">
                        About Us
                    </Link>
                    <Link to="/contact" className="hover:text-yellow-500 transition-colors duration-300">
                        Contact
                    </Link>
                </div>

                {/* Telif Hakkı ve Sosyal Medya */}
                <div className="flex flex-col items-center md:items-end">
                    <p className="text-sm mb-2">&copy; 2023 My React App. All rights reserved.</p>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
