import React from 'react'

export default function Pagination({ totalPages, changePage, currentPage }) {
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
}
