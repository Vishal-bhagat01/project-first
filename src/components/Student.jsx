

import React, { useContext, useState } from 'react';
import { StudentContext } from '../Context/studentContext';

const Student = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentID, setStudentID] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [stream, setStream] = useState('');
  const [gender, setGender] = useState('');

  const { students, addStudent, deleteStudent } = useContext(StudentContext);

  const handleAddStudent = (e) => {
    e.preventDefault();
    addStudent({ id: studentID, name: studentName, email: studentEmail, dob, age, phoneNumber, stream, gender });
    setIsModalOpen(false);

   
    setStudentID('');
    setStudentName('');
    setStudentEmail('');
    setDob('');
    setAge('');
    setPhoneNumber('');
    setStream('');
    setGender('');
  };

  
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
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

      <table className="min-w-full table-auto border-collapse border border-gray-500">
        <thead>
          <tr className="bg-gray-400 text-left">
            <th className="px-6 py-2 border">STUDENT_ID</th>
            <th className="px-6 py-3 border">STUDENT_NAME</th>
            <th className="px-6 py-3 border">STUDENT_EMAIL</th>
            <th className="px-6 py-3 border">STREAM</th>
            <th className="px-4 py-2 border">GENDER</th>
            <th className="px-6 py-3 border">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 border">{student.id}</td>
              <td className="px-6 py-4 border">{student.name}</td>
              <td className="px-6 py-4 border">{student.email}</td>
              <td className="px-6 py-4 border">{student.stream}</td>
              <td className="px-6 py-4 border">{student.gender}</td>
              <td className="px-6 py-4 border text-center">
                <button
                  className="bg-blue-400 text-white px-2 py-1 rounded-lg hover:bg-blue-500 transition duration-300 mr-2"
                  onClick={() => handleViewStudent(student)}
                >
                  View
                </button>
                <button className="bg-green-400 text-white px-2 py-1 rounded-lg hover:bg-green-500 transition duration-300 mr-2">
                  Edit
                </button>
                <button
                  className="bg-red-400 text-white px-2 py-1 rounded-lg hover:bg-red-500 transition duration-300 mr-2"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gradient-to-r from-blue-200 to-purple-200 hover:bg-purple-300 transition duration-200 rounded-lg shadow-lg p-8 ml-14 w-2/4">
            <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
            <form className="flex flex-wrap gap-3" onSubmit={handleAddStudent}>
              <div className="mb-4">
                <label htmlFor="studentID" className="block text-gray-800 font-semibold">Student ID</label>
                <input
                  type="number"
                  id="studentID"
                  value={studentID}
                  onChange={(e) => setStudentID(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Student ID"
                  required
                />
              </div>
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
    </div>
  );
};

export default Student;










