import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "http://localhost:3001/students";

function AddStudent() {
  const [rollNumber, setRollNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentMobile, setStudentMobile] = useState("");
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleRollNumberChange = (event) => setRollNumber(event.target.value);
  const handleStudentNameChange = (event) => setStudentName(event.target.value);
  const handleEmailChange = (event) => setStudentEmail(event.target.value);
  const handleMobileChange = (event) => setStudentMobile(event.target.value);

  const validateFields = () => {
    if (!rollNumber || !studentName || !studentEmail || !studentMobile) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddStudent = async () => {
    if (!validateFields()) return;
    const newStudent = { rollNumber, name: studentName, email: studentEmail, mobile: studentMobile };
    try {
      await axios.post(API_URL, newStudent);
      setRollNumber("");
      setStudentName("");
      setStudentEmail("");
      setStudentMobile("");
      fetchStudents(); // Fetch students to update the list
      toast.success("Student added successfully!");
    } catch (error) {
      console.error("Error adding student:", error);
      setError("Error adding student.");
      toast.error("Error adding student.");
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data.map(student => ({
        ...student,
        checkinTime: student.checkinTime || "",
        checkinDate: student.checkinDate || "",
        checkoutTime: student.checkoutTime || "",
        checkoutDate: student.checkoutDate || ""
      })));
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Failed to fetch students.");
      toast.error("Failed to fetch students.");
    }
  };

  const handleCheckin = async (rollNumber) => {
    const studentToUpdate = students.find(student => student.rollNumber === rollNumber);
    if (studentToUpdate) {
      studentToUpdate.checkinTime = new Date().toLocaleTimeString();
      studentToUpdate.checkinDate = new Date().toLocaleDateString();
      try {
        await axios.put(`${API_URL}/${studentToUpdate.id}`, studentToUpdate);
        fetchStudents(); // Refresh the list after updating
        toast.success("Student checked in successfully!");
      } catch (error) {
        console.error("Error updating check-in time:", error);
        setError("Error updating check-in time.");
        toast.error("Error updating check-in time.");
      }
    }
  };

  const handleCheckout = async (rollNumber) => {
    const studentToUpdate = students.find(student => student.rollNumber === rollNumber);
    if (studentToUpdate) {
      studentToUpdate.checkoutTime = new Date().toLocaleTimeString();
      studentToUpdate.checkoutDate = new Date().toLocaleDateString();
      try {
        await axios.put(`${API_URL}/${studentToUpdate.id}`, studentToUpdate);
        fetchStudents(); // Refresh the list after updating
        toast.success("Student checked out successfully!");
      } catch (error) {
        console.error("Error updating checkout time:", error);
        setError("Error updating checkout time.");
        toast.error("Error updating checkout time.");
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Add Student</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="rollNumber">Roll Number</label>
        <input className="input" id="rollNumber" type="number" value={rollNumber} onChange={handleRollNumberChange} required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="studentName">Student Name</label>
        <input className="input" id="studentName" type="text" value={studentName} onChange={handleStudentNameChange} required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="studentEmail">Email-Id</label>
        <input className="input" id="studentEmail" type="text" value={studentEmail} onChange={handleEmailChange} required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="studentMobile">Mobile Number</label>
        <input className="input" id="studentMobile" type="number" value={studentMobile} onChange={handleMobileChange} required />
      </div>
      <button className="button" onClick={handleAddStudent}>Add Student</button>
      <h2 className="text-xl font-bold mt-8 mb-4">Manage Student Check-ins</h2>
      <ul>
        {students.map(student => (
          <li key={student.rollNumber} className="flex items-center mb-4">
            <div className="flex-grow">
              {student.name} (Checked In: {student.checkinDate ? `${student.checkinDate} ${student.checkinTime}` : "Not checked in"}; Checked Out: {student.checkoutDate ? `${student.checkoutDate} ${student.checkoutTime}` : "Not checked out"})
            </div>
            <div className="flex">
              {!student.checkinTime && (
                <button className="button-green" onClick={() => handleCheckin(student.rollNumber)}>Check In</button>
              )}
              {student.checkinTime && !student.checkoutTime && (
                <button className="button-red" onClick={() => handleCheckout(student.rollNumber)}>Check Out</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddStudent;
