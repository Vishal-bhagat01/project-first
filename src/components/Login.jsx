
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'password') {
      login(); 
      navigate('/'); 
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-sky-500/50  p-8 rounded-3xl shadow-xl w-full max-w-lg transform transition duration-500 hover:scale-105 backdrop-blur-lg">
        <div className="text-center mb-6">
          <img 
            src="public/logo.png" 
            alt="Student Portal Logo" 
            className="mx-auto rounded-full mt-1 items-center justify-center w-40 h-40"
          />
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-800 font-semibold mb-2">Username</label>
            <input 
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-800 font-semibold mb-2">Password</label>
            <input 
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
              placeholder="Enter your password"
              required
            />
          </div>
          <button 
            type="submit"
            className="text-1xl ml-24 font-bold w-72 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-500 text-white py-2 px-6 rounded-xl hover:bg-gradient-to-l hover:from-red-500 hover:to-purple-500 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;



















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = ({ setIsAuthenticated }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (username === 'admin' && password === 'password') {
//       setIsAuthenticated(true);
//       navigate('/');
//     } else {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center ">
//       <div className="bg-gradient-to-r from-purple-300 via-pink-200 to-red-200 bg-opacity-95 p-8 rounded-3xl shadow-xl w-full max-w-lg transform transition duration-500 hover:scale-105 backdrop-blur-lg">
//         <div className="text-center mb-6">
//           <img 
//             src="public/logo.png" 
//             alt="Student Portal Logo" 
//             className="mx-auto rounded-full mt-1 items-center justify-center w-40 h- "
//           />
//           {/* <h2 className="text-3xl font-bold ">Student Portal</h2> */}
//         </div>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-gray-800 font-semibold mb-2">Username</label>
//             <input 
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
//               placeholder="Enter your username"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-800 font-semibold mb-2">Password</label>
//             <input 
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button 
//             type="submit"
//             className=" text-1xl font-bold w-full bg-gradient-to-r from-blue-500  to-blue-300 text-white py-2 px-6 rounded-xl hover:bg-gradient-to-l hover:from-red-500 hover:to-purple-500 transition duration-300"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


















