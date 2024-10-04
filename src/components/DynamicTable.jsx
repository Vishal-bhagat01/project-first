
import React, { useState, useEffect } from 'react';

const DynamicTable = ({ students, fields, filter, handleView, handleEdit, handleDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = students
    .filter((row) => row.name.toLowerCase().includes(filter.toLowerCase()))
    .slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(students.length / rowsPerPage);

  useEffect(() => {
    if (students.length <= rowsPerPage) {
      setCurrentPage(1);
    }
  }, [students.length]);

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
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse shadow-lg rounded-lg overflow-hidden bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-purple-600 transition duration-200 text-white ">
            {fields.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border-b border-gray-300"
              >
                {column.label}
              </th>
            ))}
            <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border-b border-gray-300">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentRows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition duration-150">
              {fields.map((column) => (
                <td
                  key={column.key}
                  className={`px-6 py-4 font-semibold text-gray-800 text-center border-b border-gray-300 ${
                    ['studentid', 'studentname', 'email', 'dept'].includes(column.key)
                      ? 'hover:text-blue-500 transition duration-150 cursor-pointer'
                      : ''
                  }`}
                >
                  {row[column.key]}
                </td>
              ))}
              <td className="px-6 py-4 border-b border-gray-300 text-center space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-full shadow-md hover:bg-blue-600 transition duration-200"
                  onClick={() => handleView(row)}
                >
                  View
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded-full shadow-md hover:bg-green-600 transition duration-200"
                  onClick={() => handleEdit(row)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-full shadow-md hover:bg-red-600 transition duration-200"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {students.length > rowsPerPage && (
        <div className="flex items-center justify-center mt-6 space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 disabled:opacity-50 transition"
          >
            Previous
          </button>

          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
                className={`px-4 py-2 rounded-full shadow-md ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                } transition duration-150`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 disabled:opacity-50 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;




