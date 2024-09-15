import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import AddStudent from './AddStudent';
import DisplayStudents from './DisplayStudents';
import './index.css'; // Import the CSS file here

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/display-students" element={<DisplayStudents />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:id" element={<AddStudent />} /> {/* Add this line */}
        <Route path="/" element={
          <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Student Attendance System</h1>
            <p>Select an option from the navbar to manage students.</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
