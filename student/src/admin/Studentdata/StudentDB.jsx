import React, { useState, useEffect } from 'react';
import './StudentDB.css'; // Ensure this file contains the updated styles

const StudentDB = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    rollNo: '',
    branch: '',
    year: '',
  });
  const [error, setError] = useState('');

  // Load students from Local Storage on component mount
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  // Save students to Local Storage whenever the students array changes
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for unique ID and rollNo
    const isIdTaken = students.some(student => student.id === formData.id);
    const isRollNoTaken = students.some(student => student.rollNo === formData.rollNo);

    if (isIdTaken) {
      setError('ID already exists');
      return;
    }

    if (isRollNoTaken) {
      setError('Roll No already exists');
      return;
    }

    // If no errors, add the student to the list
    setStudents([...students, formData]);
    setError(''); // Reset error message
    setFormData({
      id: '',
      name: '',
      rollNo: '',
      branch: '',
      year: '',
    });
  };

  return (
    <div className="student-db-container">
      <h1 className="header">Student Database Form</h1>

      <div className="student-form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              className="input-field"
              placeholder="ID"
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
            <input
              className="input-field"
              placeholder="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="input-field"
              placeholder="Roll No"
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
            />
            <select
              className="input-field"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MEC">MEC</option>
              <option value="CIVIL">CIVIL</option>
            </select>
            <input
              className="input-field"
              placeholder="Year"
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1"
              max="4"
            />
            <button type="submit" className="add-btn">
              Add Student
            </button>
          </div>
        </form>

        {/* Display error message if ID or Roll No is not unique */}
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* Table for displaying student data */}
      <div className="student-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.rollNo}</td>
                <td>{student.branch}</td>
                <td>{student.year}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button
                    className="remove-btn"
                    onClick={() => {
                      const updatedStudents = students.filter((_, i) => i !== index);
                      setStudents(updatedStudents);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDB;
