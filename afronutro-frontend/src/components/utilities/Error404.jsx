import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-8xl font-bold text-afro-brown mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <p className="text-xl text-afro-brown mb-8">Did you take a wrong turn in cyberspace? Let's get you back on track! 🚀</p>


      <Link to="/" className="bg-afro-green text-white px-4 py-2 rounded-full hover:bg-afro-dark-green">
        Go Back Home
      </Link>
    </div>
  );
};

export default Error404;
