import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiDownload, FiBookOpen, FiCalendar, FiFileText } from 'react-icons/fi';

const sampleAssignment = {
  title: 'Algebra Homework Set 4',
  course: 'Mathematics',
  dueDate: '2024-06-30',
  description: 'Solve all the problems in Chapter 5 and show your work for each step. Make sure to review quadratic equations and submit your answers as a PDF.',
  fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
};

function StudentAssignmentDetails() {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    // Simulate API call with a timeout for demo
    setTimeout(() => {
      setAssignment(sampleAssignment);
    }, 500);
    // Uncomment for real API:
    // fetch(`/api/assignments/${assignmentId}`)
    //   .then(res => res.json())
    //   .then(data => setAssignment(data));
  }, [assignmentId]);

  if (!assignment) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <div className="flex items-center mb-6">
        <FiBookOpen className="text-blue-600 text-3xl mr-3" />
        <h2 className="text-3xl font-bold text-gray-900">{assignment.title}</h2>
      </div>
      <div className="flex items-center text-gray-600 mb-4">
        <FiFileText className="mr-2" />
        <span className="font-medium mr-6">{assignment.course}</span>
        <FiCalendar className="mr-2" />
        <span>Due: <span className="font-semibold text-red-500">{assignment.dueDate}</span></span>
      </div>
      <p className="text-lg text-gray-800 mb-6 leading-relaxed border-l-4 border-blue-200 pl-4 bg-blue-50 py-2">{assignment.description}</p>
      {assignment.fileUrl && (
        <a
          href={assignment.fileUrl}
          download
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          <FiDownload className="mr-2 text-xl" /> Download Assignment
        </a>
      )}
    </div>
  );
}

export default StudentAssignmentDetails; 