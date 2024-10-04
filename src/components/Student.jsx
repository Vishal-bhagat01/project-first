
import React, { useContext, useState } from 'react';
import { StudentContext } from '../Context/studentContext';
import DynamicTable from './DynamicTable';

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
  const [gender, setGender] = useState('');
  const [filter, setFilter] = useState('');
  const { students, addStudent, deleteStudent, updateStudent } = useContext(StudentContext);

  const [department, setDepartment] = useState('');
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState('');
  const [branchId, setBranchId] = useState(false);

  const Dept = JSON.parse(localStorage.getItem('dept'));

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isDepartmentValid, setIsDepartmentValid] = useState(true);
  const [isBranchValid, setIsBranchValid] = useState(true);


  const validateForm = () => {
    let isValid = true;

    if (studentName.trim() === "") {
      setIsNameValid(false);
      isValid = false;
    } else {
      setIsNameValid(true);
    }

    if (studentEmail.trim() === "") {
      setIsEmailValid(false);
      isValid = false;
    } else {
      setIsEmailValid(true);
    }

    if (department.trim() === "") {
      setIsDepartmentValid(false);
      isValid = false;
    } else {
      setIsDepartmentValid(true);
    }

    if (branch.trim() === "") {
      setIsBranchValid(false);
      isValid = false;
    } else {
      setIsBranchValid(true);
    }

    return isValid;
  };


  const studentFields = [
    { key: 'id', label: 'STUDENT_ID' },
    { key: 'name', label: 'STUDENT_NAME' },
    { key: 'email', label: 'STUDENT_EMAIL' },
    { key: 'department', label: 'DEPARTMENT' },
    { key: 'gender', label: 'GENDER' },
  ];

  const handleAddStudent = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    const studentID = students.length + 1;
    addStudent({ id: studentID, name: studentName, email: studentEmail, dob, age, phoneNumber, department, branch, gender });
    setIsModalOpen(false);
    setBranchId(false);
    resetForm();
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
    setDepartment(student.department);
    setBranch(student.branch);
    setGender(student.gender);
    setIsEditModalOpen(true);
    
  };

  const handleUpdateStudent = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    updateStudent({
      id: selectedStudent.id,
      name: studentName,
      email: studentEmail,
      dob,
      age,
      phoneNumber,
      department,
      branch,
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
    setDepartment('');
    setBranch('');
    setGender('');
    setIsDepartmentValid(true);
    setIsBranchValid(true);
  };

  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    setDepartment(selectedDept);
    setBranchId(true);
    const selectedDeptData = Dept.find((dept) => dept.deptName === selectedDept);
    if (selectedDeptData) {
      setBranches(selectedDeptData.branches);
    } else {
      setBranches([]);
    }
  };

  return (
    <div className="container mx-auto p-6 border-x-fuchsia-600">
      <h1 className="text-4xl underline font-bold mb-4 text-center">Students List</h1>

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
          placeholder="Search name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Dynamic Table with student data */}
      <DynamicTable
        students={students}
        fields={studentFields}
        filter={filter}
        handleView={handleViewStudent}
        handleEdit={handleEditStudent}
        handleDelete={deleteStudent}
      />

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gradient-to-r from-blue-200 to-purple-200 hover:bg-purple-300 transition duration-200 rounded-lg shadow-lg p-8 w-2/4">
            <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
            <form className="flex flex-wrap gap-3" onSubmit={handleAddStudent}>

              <div className="mb-4">
                <label htmlFor="studentName" className="block text-gray-800 font-semibold">Student Name</label>
                <input
                  type="text"
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isNameValid ? 'focus:ring-indigo-500 border-gray-300' : 'border-red-500 focus:ring-red-500'
                    }`}
                  placeholder="Enter Student Name"
                />
                {!isNameValid && <p className="text-red-500 text-sm mt-1">Student Name is required</p>}
              </div>



              <div className="mb-4">
                <label htmlFor="studentEmail" className="block text-gray-800 font-semibold">Student Email</label>
                <input
                  type="email"
                  id="studentEmail"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isEmailValid ? 'focus:ring-indigo-500 border-gray-300' : 'border-red-500 focus:ring-red-500'
                    }`}
                  placeholder="Enter Student Email"
                />
                {!isEmailValid && <p className="text-red-500 text-sm mt-1"> Email is required</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-800 font-semibold">Phone Number</label>
                <input
                  type="tel" 
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setPhoneNumber(value);
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${phoneNumber.length === 10 ? 'focus:ring-indigo-500 border-gray-300' : ' focus:ring-red-500'}`}
                  placeholder="Enter Phone Number"
                  required
                />
                {phoneNumber.length !== 10 && phoneNumber.length > 0 && (
                  <p className="text-red-500 text-sm mt-1">Phone number must be 10 digits</p>
                )}
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
                <label className="block text-gray-800 font-semibold">Gender</label>
                <div className="flex items-center">
                  <label className="mr-4">
                    <input type="radio" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
                    Male
                  </label>
                  <label>
                    <input type="radio" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
                    Female
                  </label>
                </div>
              </div>


              <div className="mb-4">
                <label htmlFor="department" className="block text-gray-800 font-semibold">Department</label>
                <select
                  id="department"
                  value={department}
                  onChange={handleDepartmentChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isDepartmentValid ? 'focus:ring-indigo-500 border-gray-300' : 'border-red-500 focus:ring-red-500'
                    }`}
                >
                  <option value="">Select Department</option>
                  {Dept.map((dept) => (
                    <option key={dept.deptName} value={dept.deptName}>{dept.deptName}</option>
                  ))}
                </select>
                {!isDepartmentValid && <p className="text-red-500 text-sm mt-1">Department is required</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="branch" className="block text-gray-800 font-semibold">Branch</label>
                <select
                  id="branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isBranchValid ? 'focus:ring-indigo-500 border-gray-300' : 'border-red-500 focus:ring-red-500'
                    }`}
                  disabled={!branchId}
                >
                  <option value="">Select Branch</option>
                  {branches.map((branchName, index) => (
                    <option key={index} value={branchName}>{branchName}</option>
                  ))}
                </select>
                {!isBranchValid && <p className="text-red-500 text-sm mt-1">Branch is required</p>}
              </div>


              <div className="flex justify-between mt-14">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setBranchId(false);
                  }}
                  className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300 mr-5 ml-44"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Submit
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
              <strong>Department:</strong> {selectedStudent.department}
            </div>
            <div className="mb-4">
              <strong>Branch:</strong> {selectedStudent.branch}
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
                <label htmlFor="editStudentName" className="block text-gray-800 font-semibold">Student Name</label>
                <input
                  type="text"
                  id="editStudentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isNameValid ? 'focus:ring-indigo-500 border-gray-300' : 'border-red-500 focus:ring-red-500'}`}
                  placeholder="Enter Student Name"
                />
                {!isNameValid && <p className="text-red-500 text-sm mt-1">Student Name is required</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="editStudentEmail" className="block text-gray-800 font-semibold">Student Email</label>
                <input
                  type="email"
                  id="editStudentEmail"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isEmailValid ? 'focus:ring-indigo-500 border-gray-300' : 'border-red-500 focus:ring-red-500'}`}
                  placeholder="Enter Student Email"
                />
                {!isEmailValid && <p className="text-red-500 text-sm mt-1">Email is required</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="editPhoneNumber" className="block text-gray-800 font-semibold">Phone Number</label>
                <input
                  type="number" 
                  id="editPhoneNumber"
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setPhoneNumber(value);
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${phoneNumber.length === 10 ? 'focus:ring-indigo-500 border-gray-300' : 'focus:ring-red-500'}`}
                  placeholder="Enter Phone Number"
                  required
                />
                {phoneNumber.length !== 10 && phoneNumber.length > 0 && <p className="text-red-500 text-sm mt-1">Phone number must be 10 digits</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="editDob" className="block text-gray-800 font-semibold">Date of Birth</label>
                <input
                  type="date"
                  id="editDob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="editAge" className="block text-gray-800 font-semibold">Age</label>
                <input
                  type="number"
                  id="editAge"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="editDepartment" className="block text-gray-800 font-semibold">Department</label>
                <select
                  id="editDepartment"
                  value={department}
                  onChange={handleDepartmentChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isDepartmentValid ? 'focus:ring-indigo-500 border-gray-300' : 'border-red-500 focus:ring-red-500'}`}
                >
                  <option value="">Select Department</option>
                  {Dept.map((dept) => (
                    <option key={dept.id} value={dept.deptName}>
                      {dept.deptName}
                    </option>
                  ))}
                </select>
                {!isDepartmentValid && <p className="text-red-500 text-sm mt-1">Department is required</p>}
              </div>

              {branchId && (
                <div className="mb-4">
                  <label htmlFor="editBranch" className="block text-gray-800 font-semibold">Branch</label>
                  <select
                    id="editBranch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isBranchValid ? 'focus:ring-indigo-500 border-gray-300' : 'border-red-500 focus:ring-red-500'}`}
                  >
                    <option value="">Select Branch</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.branchName}>
                        {branch.branchName}
                      </option>
                    ))}
                  </select>
                  {!isBranchValid && <p className="text-red-500 text-sm mt-1">Branch is required</p>}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-800 font-semibold">Gender</label>
                <div className="flex items-center">
                  <label className="mr-4">
                    <input type="radio" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
                    Male
                  </label>
                  <label>
                    <input type="radio" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
                    Female
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-500 transition duration-300 mr-5 ml-44">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-500 transition duration-300">
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



