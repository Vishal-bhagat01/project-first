

import React, { useContext, useState } from 'react';
import { StudentContext } from '../Context/studentContext';
import StudentTable from './StudentTable';

const Student = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [stream, setStream] = useState('');
  const [gender, setGender] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedColumns, setSelectedColumns] = useState(['id', 'name', 'email', 'stream', 'gender']);
  const { students, addStudent, deleteStudent, updateStudent } = useContext(StudentContext);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const totalPages = Math.ceil(students.length / studentsPerPage);

  const getNextStudentID = () => {
    const maxId = students.reduce((max, student) => Math.max(max, student.id), 0);
    return maxId + 1;
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const studentID = getNextStudentID();
    addStudent({ id: studentID, name: studentName, email: studentEmail, dob, age, phoneNumber, stream, gender });
    setIsModalOpen(false);
    resetForm();
    setCurrentPage(1);
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setStudentName(student.name);
    setStudentEmail(student.email);
    setDob(student.dob);
    setAge(student.age);
    setPhoneNumber(student.phoneNumber);
    setStream(student.stream);
    setGender(student.gender);
    setIsEditModalOpen(true);
  };

  const handleUpdateStudent = (e) => {
    e.preventDefault();
    updateStudent({
      id: selectedStudent.id,
      name: studentName,
      email: studentEmail,
      dob,
      age,
      phoneNumber,
      stream,
      gender,
    });
    setIsEditModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setStudentName('');
    setStudentEmail('');
    setDob('');
    setAge('');
    setPhoneNumber('');
    setStream('');
    setGender('');
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleColumnToggle = (column) => {
    setSelectedColumns(prevColumns =>
      prevColumns.includes(column) ? prevColumns.filter(col => col !== column) : [...prevColumns, column]
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl underline underline-offset-8 font-bold mb-4 text-center">Students List</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Add New Student
        </button>
      </div>

      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

       {/* Column Selection */}
       {/* <div className="mb-4">
        <h3 className="font-semibold mb-2">Select Columns to Display:</h3>
        <div className="flex flex-wrap gap-4">
          {['id', 'name', 'email', 'stream', 'gender'].map(column => (
            <label key={column} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedColumns.includes(column)}
                onChange={() => handleColumnToggle(column)}
                className="mr-2"
              />
              {column.charAt(0).toUpperCase() + column.slice(1)}
            </label>
          ))}
        </div> */}
      {/* </div>   */}

      {/* Student Table */}
      <StudentTable
        students={students}
        filter={filter}
        selectedColumns={selectedColumns}
        handleViewStudent={handleViewStudent}
        handleEditStudent={handleEditStudent}
        deleteStudent={deleteStudent}
        currentPage={currentPage}
        studentsPerPage={studentsPerPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />

      {/* Modal Components (Add, View, Edit) */}
      {/* Add Student Modal */}
    
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gradient-to-r from-blue-200 to-purple-200 hover:bg-purple-300 transition duration-200 rounded-lg shadow-lg p-8 ml-14 w-2/4">
            <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
            <form className="flex flex-wrap gap-3" onSubmit={handleAddStudent}>
              <div className="mb-4">
                <label htmlFor="studentName" className="block text-gray-800 font-semibold">Student Name</label>
                <input
                  type="text"
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Student Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="studentEmail" className="block text-gray-800 font-semibold">Student Email</label>
                <input
                  type="email"
                  id="studentEmail"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Student Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dob" className="block text-gray-800 font-semibold">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-gray-800 font-semibold">Age</label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Age"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-800 font-semibold">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Phone Number"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="stream" className="block text-gray-800 font-semibold">Stream</label>
                <input
                  type="text"
                  id="stream"
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Stream"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-800 font-semibold">Gender</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex justify-between mt-14 ml-28">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-400 text-white px-2 py-1 rounded-lg hover:bg-red-500 transition duration-300 mr-5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 mr-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* View Student Modal */}
      {isViewModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gradient-to-r from-blue-200 to-purple-200 hover:bg-purple-300 transition duration-200 rounded-lg shadow-lg p-8 w-96">
            <h2 className="text-2xl font-bold mb-4">Student Details</h2>
            <div className="mb-4">
              <strong>Student ID:</strong> {selectedStudent.id}
            </div>
            <div className="mb-4">
              <strong>Name:</strong> {selectedStudent.name}
            </div>
            <div className="mb-4">
              <strong>Email:</strong> {selectedStudent.email}
            </div>
            <div className="mb-4">
              <strong>DOB:</strong> {selectedStudent.dob}
            </div>
            <div className="mb-4">
              <strong>Age:</strong> {selectedStudent.age}
            </div>
            <div className="mb-4">
              <strong>Phone Number:</strong> {selectedStudent.phoneNumber}
            </div>
            <div className="mb-4">
              <strong>Stream:</strong> {selectedStudent.stream}
            </div>
            <div className="mb-4">
              <strong>Gender:</strong> {selectedStudent.gender}
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => setIsViewModalOpen(false)}
                className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    

      {/* Edit Student Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gradient-to-r from-blue-200 to-purple-200 hover:bg-purple-300 transition duration-200 rounded-lg shadow-lg p-8 w-2/4">
            <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
            <form className="flex flex-wrap gap-3" onSubmit={handleUpdateStudent}>
              <div className="mb-4">
                <label htmlFor="studentName" className="block text-gray-800 font-semibold">Student Name</label>
                <input
                  type="text"
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Student Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="studentEmail" className="block text-gray-800 font-semibold">Student Email</label>
                <input
                  type="email"
                  id="studentEmail"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Student Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dob" className="block text-gray-800 font-semibold">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-gray-800 font-semibold">Age</label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Age"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-800 font-semibold">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Phone Number"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="stream" className="block text-gray-800 font-semibold">Stream</label>
                <input
                  type="text"
                  id="stream"
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Stream"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-800 font-semibold">Gender</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex justify-between mt-14 ml-28">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-red-400 text-white px-2 py-1 rounded-lg hover:bg-red-500 transition duration-300 mr-5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 mr-2"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Student;


































