import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-blue-600 p-4 text-white text-center mt-8">
      <div className="container mx-auto">
        <p className="mb-2">Weather Forecast App © 2024</p>
        <p className="mb-2">Licensed under the MIT License</p>
        <a
          href="https://github.com/your-github-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline"
        >
          GitHub Repository
        </a>
      </div>
    </footer>
  );
};

export default Footer;
