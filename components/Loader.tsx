import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-8">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h3 className="text-lg font-semibold text-gray-300">Generating Content...</h3>
      <p className="mt-1">Please wait while the AI crafts your assets.</p>
    </div>
  );
};

export default Loader;