import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 hover:bg-purple-600 transition duration-600">
      <div className="container mx-auto flex justify-between items-center">

        <div className="flex items-center space-x-2">
          <img 
            src="public/logo.png" 
            alt="Student Portal Logo" 
            className="h-16 w-20 rounded-xl"
             />
          <span className="text-black font-bold text-5xl">Student Portal</span>
        </div>

        <ul className="flex space-x-4">

           <NavLink  className={(e)=>{return e.isActive ? " bg-blue-600  ": ""}}  to="/" ><li className='list-none p-4 color-white text-2xl hover:bg-purple-600 transition duration-200 '>Home</li></NavLink>      
           <NavLink  className={(e)=>{return e.isActive ? " bg-blue-600 ": ""}}  to="/student" ><li className='list-none p-4 color-white  text-2xl hover:bg-purple-600 transition duration-200'>Student</li></NavLink>
           <NavLink  className={(e)=>{return e.isActive ? " bg-blue-600 ": ""}}  to="/teacher" ><li className='list-none p-4 color-white text-2xl hover:bg-purple-600 transition duration-200'>Teacher</li></NavLink>
           <NavLink  className={(e)=>{return e.isActive ? " bg-blue-600 ": ""}}  to="/about" ><li className='list-none p-4 color-white text-2xl hover:bg-purple-600 transition duration-200'>About</li></NavLink>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
