
import React, { useContext, useState } from 'react';
import { TeacherContext } from '../Context/TeacherContext';
import DynamicTable from './DynamicTable';


const Teacher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');
  const { teachers, addTeacher, deleteTeacher, updateTeacher } = useContext(TeacherContext);

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
    if (teacherName.trim() === "") {
      setIsNameValid(false);
      isValid = false;
    } else {
      setIsNameValid(true);
    }

    if (teacherEmail.trim() === "") {
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



  const teacherFields = [
    { key: 'id', label: 'TEACHER_ID' },
    { key: 'name', label: 'TEACHER_NAME' },
    { key: 'email', label: 'TEACHER_EMAIL' },
    { key: 'department', label: 'DEPARTMENT' },
  ];

  const handleAddTeacher = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    const teacherID = teachers.length + 1;
    addTeacher({ id: teacherID, name: teacherName, email: teacherEmail, department,branch, phoneNumber });
    setIsModalOpen(false);
    setBranchId(false);
    resetForm();

  };

  const handleViewTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setIsViewModalOpen(true);
  };

  const handleEditTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setTeacherName(teacher.name);
    setTeacherEmail(teacher.email);
    setDept(teacher.dept);
    setPhoneNumber(teacher.phoneNumber);
    setIsEditModalOpen(true);
  };

  const handleUpdateTeacher = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;
    updateTeacher({
      id: selectedTeacher.id,
      name: teacherName,
      email: teacherEmail,
      department,
      phoneNumber,
    });
    setIsEditModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTeacherName('');
    setTeacherEmail('');
    setPhoneNumber('');
    setDepartment('');
    setBranch('');
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
    <div className="container mx-auto p-6">
      <h1 className="text-4xl underline font-bold mb-4 text-center">Teachers List</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Add New Teacher
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

      <DynamicTable
        students={teachers}
        fields={teacherFields}
        filter={filter}
        handleView={handleViewTeacher}
        handleEdit={handleEditTeacher}
        handleDelete={deleteTeacher}
      />

      {/* Add, View, Edit modals for Teachers here */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gradient-to-r from-blue-200 to-purple-200 hover:bg-purple-300 transition duration-200 rounded-lg shadow-lg p-8 ml-14 w-2/4">
            <h2 className="text-2xl font-bold mb-4">Add New teacher</h2>
            <form className="flex flex-wrap gap-3" onSubmit={handleAddTeacher}>
              <div className="mb-4">
                <label htmlFor="Teacher_Name" className="block text-gray-800 font-semibold">Teacher Name</label>
                <input
                  type="text"
                  id="TeacherName"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-red-500"
                  placeholder="Enter Teacher Name"
                />
               {!isNameValid && <p className="text-red-500 text-sm mt-1 focus:ring-red-500">Student Name is required</p>}

              </div>
              <div className="mb-4">
                <label htmlFor="teacherEmail" className="block text-gray-800 font-semibold">Teacher Email</label>
                <input
                  type="email"
                  id="TeacherEmail"
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-red-500"
                  placeholder="Enter teacher Email"
                  
                />
             {!isEmailValid && <p className="text-red-500 text-sm mt-1"> Email is required</p>}

              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-800 font-semibold">Phone Number</label>
                <input
                  type="number" 
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

       {isViewModalOpen && selectedTeacher && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gradient-to-r from-blue-200 to-purple-200 hover:bg-purple-300 transition duration-200 rounded-lg shadow-lg p-8 w-96">
            <h2 className="text-2xl font-bold mb-4">Teacher Details</h2>
            <div className="mb-4">
              <strong>Teacher ID:</strong> {selectedTeacher.id}
            </div>
            <div className="mb-4">
              <strong>Name:</strong> {selectedTeacher.name}
            </div>
            <div className="mb-4">
              <strong>Email:</strong> {selectedTeacher.email}
            </div>
            <div className="mb-4">
              <strong>Phone Number:</strong> {selectedTeacher.phoneNumber}
            </div>
            <div className="mb-4">
              <strong>Department:</strong> {selectedTeacher.department}
            </div>
            <div className="mb-4">
              <strong>branch:</strong> {selectedTeacher.branch}
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

     {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gradient-to-r from-blue-200 to-purple-200 hover:bg-purple-300 transition duration-200 rounded-lg shadow-lg p-8 w-2/4">
            <h2 className="text-2xl font-bold mb-4">Edit Teacher</h2>
            <form className="flex flex-wrap gap-3" onSubmit={handleUpdateTeacher}>
              <div className="mb-4">
                <label htmlFor="teacherName" className="block text-gray-800 font-semibold">Teacher Name</label>
                <input
                  type="text"
                  id="teacherName"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Teacher Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="teacherEmail" className="block text-gray-800 font-semibold">Teacher Email</label>
                <input
                  type="email"
                  id="teacherEmail"
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Teacher Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-800 font-semibold">Phone Number</label>
                <input
                  type="Number"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Phone Number"
                  required
                />
              </div>
             
              <div className="mb-4">
                <label htmlFor="dept" className="block text-gray-800 font-semibold">Dept</label>
                <input
                  type="text"
                  id="dept"
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Dept."
                  required
                />
              </div>
             
              <div className="flex justify-between mt-14 ml-28">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-red-400 text-white px-2 py-1 rounded-lg hover:bg-red-500 transition duration-300 mr-5" >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 mr-2" >
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

export default Teacher;