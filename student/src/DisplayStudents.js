import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './index.css';

const API_URL = "http://localhost:3001/students";

function DisplayStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDataFetched, setIsDataFetched] = useState(false); // New state to check if data is fetched
  const itemsPerPage = 1; // Number of students per page

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
      setIsDataFetched(true); // Set the flag to true when data is fetched
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Failed to fetch students. Please try again later.");
    }
  };

  const handleDelete = async (rollNumber) => {
    const studentToDelete = students.find(student => student.rollNumber === rollNumber);
    if (studentToDelete) {
      try {
        await axios.delete(`${API_URL}/${studentToDelete.id}`);
        setStudents(students.filter(student => student.rollNumber !== rollNumber));
      } catch (error) {
        console.error("Error deleting student:", error);
        setError("Failed to delete student. Please try again later.");
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const checkedOutStudents = students.filter(student => student.checkoutTime !== undefined);
  const indexOfLastStudent = currentPage * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudents = checkedOutStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(checkedOutStudents.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="headings">Attendance</h1>
      <button 
        className="button-green mb-4" 
        onClick={fetchStudents} 
        disabled={isDataFetched} // Disable the button after data is fetched
      >
        Display Students
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {isDataFetched && (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Checked In</th>
                <th>Checked Out</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map(student => (
                <tr key={student.rollNumber}>
                  <td>{student.rollNumber}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.mobile}</td>
                  <td>{student.checkinDate} {student.checkinTime}</td>
                  <td>{student.checkoutDate} {student.checkoutTime}</td>
                  <td>
                    <Link to={`/edit-student/${student.id}`}>
                      <button className="button-blue">Edit</button>
                    </Link>
                    <button
                      className="button-red"
                      onClick={() => handleDelete(student.rollNumber)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2"
            >
              Previous
            </button>
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`mx-1 ${currentPage === number ? "font-bold" : ""}`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
              className="ml-2"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DisplayStudents;
