import React, { useState, useEffect } from 'react';

const DynamicTableTeacher = ({ teachers, fields, filter, handleView, handleEdit, handleDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = teachers
    .filter(row => row.name.toLowerCase().includes(filter.toLowerCase()))
    .slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(teachers.length / rowsPerPage);

  useEffect(() => {
    if (teachers.length <= rowsPerPage) {
      setCurrentPage(1);
    }
  }, [teachers.length]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <table className="min-w-full table-auto border-collapse border border-gray-500">
        <thead>
          <tr className="bg-gray-400 text-left">
            {fields.map((column) => (
              <th key={column.key} className="px-6 py-3 border">{column.label}</th>
            ))}
            <th className="px-6 py-3 border">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              {fields.map((column) => (
                <td key={column.key} className="px-6 py-4 border">{row[column.key]}</td>
              ))}
              <td className="px-6 py-4 border text-center">
                <button
                  className="bg-blue-400 text-white px-2 py-1 rounded-lg hover:bg-blue-500 transition duration-300 mr-2"
                  onClick={() => handleView(row)}
                >
                  View
                </button>
                <button
                  className="bg-green-400 text-white px-2 py-1 rounded-lg hover:bg-green-500 transition duration-300 mr-2"
                  onClick={() => handleEdit(row)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-400 text-white px-2 py-1 rounded-lg hover:bg-red-500 transition duration-300 mr-2"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {teachers.length > rowsPerPage && (
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Previous
          </button>

          <div className="mx-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
                className={`px-4 py-2 rounded-lg mx-1 ${
                  currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DynamicTableTeacher;





