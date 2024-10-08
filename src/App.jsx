

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Teacher from './components/Teacher';
import Result from './components/Result';
import Student from './components/Student';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast'; 
import { StudentProvider } from './Context/studentContext';
import { TeacherProvider } from './Context/TeacherContext';

function App() {

  useEffect(() => {
    const Department = localStorage.getItem('department');
  
    if (!Department) {
      const defaultDepartment = [
        {
          id: 1,
          departmentName: "CSE",
          branches: ["Software Engineering", "AI", "Data Science"]
        },
        {
          id: 2,
          departmentName: "EE",
          branches: ["Thermodynamics", "Mechanics", "Automotive"]
        },

      ];
  
      localStorage.setItem('department', JSON.stringify(defaultDepartment));
      console.log('Department key not found, setting default departments.');
    } else {
      console.log('Department key found:', JSON.parse(Department));
    }
  }, []);
  


  return (
    <AuthProvider>
      <Toaster position="top-right" /> 
      <Main />
    </AuthProvider>
  );
}

const Main = () => {
  const { isAuthenticated } = useAuth(); 

  return (
    <BrowserRouter>
      <StudentProvider>
        <TeacherProvider>

          {isAuthenticated && <Navbar />}
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              {isAuthenticated ? (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/student" element={<Student />} />
                  <Route path="/teacher" element={<Teacher />} />
                  <Route path="/result" element={<Result />} />
                </>
              ) : (
                <Route path="*" element={<Navigate to="/login" />} />
              )}
            </Routes>
          </div>
        </TeacherProvider>
      </StudentProvider>
    </BrowserRouter>
  );
};

export default App;