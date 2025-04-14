import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

const Search = () => {
  const [selectedBranch, setSelectedBranch] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const branches = ['CSE', 'ECE', 'MEC', 'CIVIL', 'Allied CSE'];

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/student/branch/${selectedBranch}`);
      setFilteredStudents(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching students:', error);
      setFilteredStudents([]);
      setErrorMessage('Something went wrong while fetching students.');
    }
  };

  return (
    <div className="search-wrapper">
      {/* Navbar */}
      <div className="navbar">
        <h1 className="navbar-title">StudentDB</h1>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="StudentDB">Add Student</a>
          <a href="/admin/Login">Log-out</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="search-container">
        <h2 className="search-header">Search Student Data</h2>

        <div className="search-controls">
          <select
            className="branch-spinner"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">-- Select Branch --</option>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        {filteredStudents.length > 0 && (
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Branch</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.rollNo}</td> {/* ✅ Corrected here */}
                  <td>{student.branch}</td>
                  <td>{student.year}</td>
                </tr>
              ))}
            </tbody>

          </table>
        )}

        {selectedBranch && filteredStudents.length === 0 && !errorMessage && (
          <p className="no-results">No students found in {selectedBranch}.</p>
        )}

        {errorMessage && <p className="no-results">{errorMessage}</p>}
      </div>

      {/* Footer */}
      <div className="footer">
        <p>© 2025 StudentDB. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Search;
