import React from 'react';
import { motion } from 'framer-motion';

export default function Rating({ score }) {
    const stars = Array.from({ length: 5 }, (_, index) => {
        return index < score / 2 ? '★' : '☆';
    });

    return (
        <div className="flex items-center justify-around space-x-1 m-4 font-bold	">
            <motion.div 
                className="flex items-center space-x-1"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
            >
                {stars.map((star, index) => (
                    <motion.span 
                        key={index} 
                        className={`text-l transition duration-300 ${star === '★' ? 'text-yellow-500' : 'text-gray-300'}`}
                        whileHover={{ scale: 1.3, color: 'gold' }}
                    >
                        {star}
                    </motion.span>
                ))}
            </motion.div>
            <span className="text-gray-300 text-lg">
                {parseInt(score)} / 10
            </span>
        </div>
    );
}
