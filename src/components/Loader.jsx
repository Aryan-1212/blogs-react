import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-8 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-4 w-80 animate-pulse">
        {/* Image Placeholder */}
        <div className="flex items-center mb-4">
          <div className="bg-gray-300 rounded-full h-12 w-12"></div>
          <div className="ml-4 w-2/3">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>

        {/* Title Placeholder */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>

        {/* Content Lines Placeholder */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
