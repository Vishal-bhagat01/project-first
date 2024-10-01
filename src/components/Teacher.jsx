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
  const [dept, setDept] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');
  const { teachers, addTeacher, deleteTeacher, updateTeacher } = useContext(TeacherContext);

  const teacherFields = [
    { key: 'id', label: 'TEACHER_ID' },
    { key: 'name', label: 'TEACHER_NAME' },
    { key: 'email', label: 'TEACHER_EMAIL' },
    { key: 'dept', label: 'DEPT' },
  ];

  const handleAddTeacher = (e) => {
    e.preventDefault();
    const teacherID = teachers.length + 1;
    addTeacher({ id: teacherID, name: teacherName, email: teacherEmail, dept, phoneNumber });
    setIsModalOpen(false);
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
    updateTeacher({
      id: selectedTeacher.id,
      name: teacherName,
      email: teacherEmail,
      subject,
      phoneNumber,
    });
    setIsEditModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTeacherName('');
    setTeacherEmail('');
    setDept('');
    setPhoneNumber('');
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
      
    </div>
  );
};

export default Teacher;
