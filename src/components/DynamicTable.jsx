
import React, { useState, useEffect } from 'react';

const DynamicTable = ({ students, fields, filter, handleView, handleEdit, handleDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = students
    .filter(row => row.name.toLowerCase().includes(filter.toLowerCase()))
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
      <table className="min-w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            {fields.map((column) => (
              <th key={column.key} className="px-6 py-3 border-b-2 border-gray-300 text-gray-700 font-semibold text-center">
                {column.label}
              </th>
            ))}
            <th className="px-6 py-3 border-b-2 border-gray-300 text-gray-700 font-semibold text-center">ACTION</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {currentRows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition">
              {fields.map((column) => (
                <td key={column.key} className="px-6 py-4 border-b border-gray-200 text-center">
                  {row[column.key]}
                </td>
              ))}
              <td className="px-6 py-4 border-b border-gray-200 text-center">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition duration-200 mr-2"
                  onClick={() => handleView(row)}
                >
                  View
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition duration-200 mr-2"
                  onClick={() => handleEdit(row)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition duration-200"
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
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
          >
            Previous
          </button>

          <div className="mx-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
                className={`px-4 py-2 rounded-full mx-1 ${
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
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;










