import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Howl } from 'howler';

const clickSound = new Howl({
  src: ['/starterSound.wav'],
});

export default function Home() {
  const navigate = useNavigate();
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
        );
        const images = response.data.results
          .map((item) => `https://image.tmdb.org/t/p/original${item.backdrop_path}`)
          .filter((url) => url !== 'https://image.tmdb.org/t/p/originalnull');
        setBackgroundImages(images);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages]);

  const handleSelection = (choice) => {
    clickSound.play();
    navigate(`/${choice}`);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <motion.div
            className="loader"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="animate-spin h-20 w-20 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
            </svg>
          </motion.div>
        </div>
      ) : (
        <AnimatePresence>
          {backgroundImages.length > 0 && (
            <motion.img
              key={currentIndex}
              src={backgroundImages[currentIndex]}
              alt="Background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 object-cover w-full h-full"
              style={{
                transform: `translateX(${window.innerWidth * 0.005}px) translateY(${window.innerHeight * 0.005}px)`,
              }}
            />
          )}
        </AnimatePresence>
      )}

      {/* Duman Efekti */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-50"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror' }}
      />

      <div className="relative flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-center">
        <div>
          <motion.h1
            className="text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 animate-pulse"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            Welcome to CIHANFLIX!
          </motion.h1>
          <p className="text-2xl mb-6">Choose your journey:</p>
          <div className="flex gap-8 justify-center">
            <motion.button
              onClick={() => handleSelection('movies')}
              whileHover={{ scale: 1.1, boxShadow: '0px 0px 8px rgba(255, 215, 0, 1)' }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 text-lg font-semibold bg-gradient-to-br from-yellow-500 to-red-500 rounded-full shadow-lg border-2 border-yellow-400 text-white hover:text-yellow-100 transition-transform transform"
            >
              Movies
              <span className="absolute inset-0 rounded-full bg-yellow-400 opacity-20 blur-lg"></span>
            </motion.button>
            <motion.button
              onClick={() => handleSelection('tvshows')}
              whileHover={{ scale: 1.1, boxShadow: '0px 0px 8px rgba(50, 205, 50, 1)' }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 text-lg font-semibold bg-gradient-to-br from-green-500 to-blue-500 rounded-full shadow-lg border-2 border-green-400 text-white hover:text-green-100 transition-transform transform"
            >
              TV Shows
              <span className="absolute inset-0 rounded-full bg-green-400 opacity-20 blur-lg"></span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
