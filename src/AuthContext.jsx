
import React, { createContext, useContext, useState  } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); 
    toast.success('Login successful!');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    toast.success('User is logged out.');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
