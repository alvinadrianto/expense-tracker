import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-customBlack border border-customYellow p-4 flex justify-around w-11/12 max-w-lg rounded-lg shadow-lg">
      <Link to="/" className={`p-2 ${location.pathname === '/' ? 'bg-customYellow' : 'text-customYellow'}`}>
        Home
      </Link>
      <Link to="/input" className={`p-2 ${location.pathname === '/input' ? 'bg-customYellow' : 'text-customYellow'}`}>
        Input
      </Link>
      <Link to="/history" className={`p-2 ${location.pathname === '/history' ? 'bg-customYellow' : 'text-customYellow'}`}>
        History
      </Link>
    </nav>
  );
};

export default Navbar;
