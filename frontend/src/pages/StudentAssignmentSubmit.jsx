import React from 'react';
import { useParams } from 'react-router-dom';
import { FiUploadCloud } from 'react-icons/fi';

function StudentAssignmentSubmit() {
  const { assignmentId } = useParams();

  // Add your form logic here

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <div className="flex items-center mb-6">
        <FiUploadCloud className="text-green-600 text-3xl mr-3" />
        <h2 className="text-3xl font-bold text-gray-900">Submit Assignment</h2>
      </div>
      <form className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Upload your work:</label>
          <input type="file" className="block w-full text-gray-700 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors text-lg font-semibold"
        >
          <FiUploadCloud className="mr-2 text-xl" /> Submit Assignment
        </button>
      </form>
    </div>
  );
}

export default StudentAssignmentSubmit; 