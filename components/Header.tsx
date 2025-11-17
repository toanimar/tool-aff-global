import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/80 backdrop-blur-md p-4 sticky top-0 z-20 border-b border-gray-700">
      <div className="container mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          SEO Affiliate Content Generator - TOANIMAR
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Instantly create high-conversion, SEO-optimized articles from raw promotional text.
        </p>
      </div>
    </header>
  );
};

export default Header;