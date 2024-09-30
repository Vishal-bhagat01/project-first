import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();
  //   navigate('/login');
  // };
  const handleLogout = () => {
    const { logout } = useAuth();
  
    return (
      <button onClick={logout} className="text-red-600">
        Logout
      </button>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img
            src="public/logo.png"
            alt="Student Portal Logo"
            className="h-14 w-14 rounded-full border-2 border-white shadow-md"
          />
          <span className="text-white font-extrabold text-3xl tracking-wide">Student Portal</span>
        </div>

        <ul className="flex space-x-6">
          <NavLink
            className={(e) =>
              e.isActive
                ? "bg-white text-purple-700 px-4 py-2 rounded-md font-semibold shadow-md transition duration-300"
                : "text-white px-4 py-2 rounded-md font-semibold hover:bg-white hover:text-purple-700 transition duration-300"
            }
            to="/"
          >
            <li className="list-none text-xl">Home</li>
          </NavLink>
          <NavLink
            className={(e) =>
              e.isActive
                ? "bg-white text-purple-700 px-4 py-2 rounded-md font-semibold shadow-md transition duration-300"
                : "text-white px-4 py-2 rounded-md font-semibold hover:bg-white hover:text-purple-700 transition duration-300"
            }
            to="/student"
          >
            <li className="list-none text-xl">Student</li>
          </NavLink>
          <NavLink
            className={(e) =>
              e.isActive
                ? "bg-white text-purple-700 px-4 py-2 rounded-md font-semibold shadow-md transition duration-300"
                : "text-white px-4 py-2 rounded-md font-semibold hover:bg-white hover:text-purple-700 transition duration-300"
            }
            to="/teacher"
          >
            <li className="list-none text-xl">Teacher</li>
          </NavLink>
          <NavLink
            className={(e) =>
              e.isActive
                ? "bg-white text-purple-700 px-4 py-2 rounded-md font-semibold shadow-md transition duration-300"
                : "text-white px-4 py-2 rounded-md font-semibold hover:bg-white hover:text-purple-700 transition duration-300"
            }
            to="/result"
          >
            <li className="list-none text-xl">Result</li>
          </NavLink>

          <li
            className="list-none text-xl text-white px-4 py-2 bg-red-500 rounded-md cursor-pointer font-semibold hover:bg-red-600 transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;