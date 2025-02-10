import React from 'react';

export const Loading = ({ size = "8", color = "blue-500", message = "Loading..." }) => {
    return (
        <div className="flex flex-col justify-center items-center space-y-2">
            {/* Spinner */}
            <div
                className={`animate-spin rounded-full h-${size} w-${size} border-t-4 border-${color} border-opacity-50`}
            ></div>
            {/* Loading Message */}
            <span className="text-sm font-medium text-gray-600">{message}</span>
        </div>
    );
};
