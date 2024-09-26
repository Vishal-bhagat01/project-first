
import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    toast.success('Login successful!');
  };

  const logout = () => {
    setIsAuthenticated(false);
    toast.success('You have logged out.');
  };
//   const invalidUser = () => {
//     setIsAuthenticated(false);
//     toast.success('You have logged out.');
//   };


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
