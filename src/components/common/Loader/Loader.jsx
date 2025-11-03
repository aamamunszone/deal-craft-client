import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full rounded-full border-4 border-blue-200"></div>
        <div className="absolute w-full h-full rounded-full border-t-4 border-blue-600 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
