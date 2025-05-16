import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock assignments data for demonstration
const allAssignments = [
  { id: 1, courseId: '1', title: 'Algebra Homework Set 4', dueDate: '2024-06-30', status: 'in-progress' },
  { id: 2, courseId: '1', title: 'Quadratic Equations Quiz', dueDate: '2024-07-05', status: 'not-started' },
  { id: 3, courseId: '2', title: 'Physics Lab Report', dueDate: '2024-07-02', status: 'complete' },
];

function StudentCourseAssignments() {
  const { courseId } = useParams();
  const assignments = allAssignments.filter(a => a.courseId === courseId);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold mb-4">Assignments for Course {courseId}</h2>
      {assignments.length === 0 ? (
        <p className="text-gray-600">No assignments found for this course.</p>
      ) : (
        <ul>
          {assignments.map(a => (
            <li key={a.id} className="mb-4 border-b pb-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{a.title}</span>
                <span className="text-sm text-gray-500">Due: {a.dueDate}</span>
              </div>
              <div className="mt-2 flex gap-4">
                <Link to={`/student/assignments/${a.id}`} className="text-blue-600 hover:underline">View Details</Link>
                <Link to={`/student/assignments/${a.id}/submit`} className="text-green-600 hover:underline">Submit</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentCourseAssignments; 