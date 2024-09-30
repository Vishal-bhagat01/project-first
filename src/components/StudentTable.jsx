
import React from 'react';

const StudentTable = ({ students, filter, selectedColumns, handleViewStudent, handleEditStudent, deleteStudent, currentPage, studentsPerPage, totalPages, handlePrevPage, handleNextPage }) => {
  
    const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent).filter(student => 
    student.name.toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <div>
      <table className="min-w-full table-auto border-collapse border border-gray-500">  
        <thead>
          <tr className="bg-gray-400 text-left">
            {selectedColumns.includes('id') && <th className="px-6 py-3 border">STUDENT_ID</th>}
            {selectedColumns.includes('name') && <th className="px-6 py-3 border">STUDENT_NAME</th>}
            {selectedColumns.includes('email') && <th className="px-6 py-3 border">STUDENT_EMAIL</th>}
            {selectedColumns.includes('stream') && <th className="px-6 py-3 border">STREAM</th>}
            {selectedColumns.includes('gender') && <th className="px-4 py-3 border">GENDER</th>}
            <th className="px-6 py-3 border">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id} className="hover:bg-gray-100">
              {selectedColumns.includes('id') && <td className="px-6 py-4 border">{student.id}</td>}
              {selectedColumns.includes('name') && <td className="px-6 py-4 border">{student.name}</td>}
              {selectedColumns.includes('email') && <td className="px-6 py-4 border">{student.email}</td>}
              {selectedColumns.includes('stream') && <td className="px-6 py-4 border">{student.stream}</td>}
              {selectedColumns.includes('gender') && <td className="px-6 py-4 border">{student.gender}</td>}
              <td className="px-6 py-4 border text-center">
                <button
                  className="bg-blue-400 text-white px-2 py-1 rounded-lg hover:bg-blue-500 transition duration-300 mr-2"
                  onClick={() => handleViewStudent(student)}
                >
                  View
                </button>
                <button
                  className="bg-green-400 text-white px-2 py-1 rounded-lg hover:bg-green-500 transition duration-300 mr-2"
                  onClick={() => handleEditStudent(student)}
                >
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

      {/* Pagination Controls */}
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-4 px-4 py-2 bg-gray-100 rounded-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentTable;
