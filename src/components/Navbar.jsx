import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 

const Navbar = () => {
  const { logout } = useAuth(); 
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <nav className="bg-gradient-to-r from-blue-300 to-purple-300 p-2 hover:bg-purple-300 transition duration-200">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src="public/logo.png"
            alt="Student Portal Logo"
            className="h-12 w-12 rounded-full"
          />
          <span className="text-black font-bold text-3xl">Student Portal</span>
        </div>

        <ul className="flex space-x-4">
          <NavLink className={(e) => (e.isActive ? " bg-blue-300 " : "")} to="/">
            <li className='list-none p-4 color-white text-2xl hover:bg-purple-300 transition duration-200'>Home</li>
          </NavLink>
          <NavLink className={(e) => (e.isActive ? " bg-blue-300 " : "")} to="/student">
            <li className='list-none p-4 color-white text-2xl hover:bg-purple-300 transition duration-200'>Student</li>
          </NavLink>
          <NavLink className={(e) => (e.isActive ? " bg-blue-300 " : "")} to="/teacher">
            <li className='list-none p-4 color-white text-2xl hover:bg-purple-300 transition duration-200'>Teacher</li>
          </NavLink>
          <NavLink className={(e) => (e.isActive ? " bg-blue-300 " : "")} to="/result">
            <li className='list-none p-4 color-white text-2xl hover:bg-purple-300 transition duration-200'>Result</li>
          </NavLink>
          <li className="list-none p-4 color-white text-2xl cursor-pointer bg-red-400 hover:bg-red-500 transition duration-200" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

















