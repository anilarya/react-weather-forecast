import React from 'react';

const Header = () => {
  return (
    <header className="w-full p-4 text-white sticky top-0 z-50 bg-gradient-to-r from-[black] to-[grey]">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Weather Forecast App</h1>
      </div>
    </header>
  );
};

export default Header;
