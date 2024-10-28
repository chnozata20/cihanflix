import React from "react";

export default function BigSearchBar() {
    return (
        <div
            className="relative bg-cover bg-center bg-no-repeat h-screen"
            style={{ backgroundImage: 'url("path/to/your/image.jpg")' }}
        >
            <div className="absolute inset-0 bg-[#0D253F] opacity-80"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Welcome.
                </h1>
                <p className="text-lg md:text-xl mb-8">
                    Millions of movies, TV shows and people to discover. Explore
                    now.
                </p>
                <div className="flex items-center bg-white rounded-full overflow-hidden max-w-md w-full shadow-lg">
                    <input
                        type="text"
                        placeholder="Search for a movie, tv show, person..."
                        className="w-full px-4 py-2 text-gray-800 focus:outline-none"
                    />
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}
