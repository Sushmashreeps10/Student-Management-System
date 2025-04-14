import React, { useState } from 'react';
import './Search.css';

const Search = () => {
  const [selectedBranch, setSelectedBranch] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [allStudents] = useState([
    { id: 1, name: 'Aarav', roll: '21CS101', branch: 'CSE', year: 2 },
    { id: 2, name: 'Divya', roll: '21EC105', branch: 'ECE', year: 1 },
    { id: 3, name: 'Kiran', roll: '21ME202', branch: 'MEC', year: 3 },
    { id: 4, name: 'Sneha', roll: '21CS109', branch: 'CSE', year: 4 },
    { id: 5, name: 'Ankit', roll: '21CV101', branch: 'CIVIL', year: 2 },
  ]);

  const branches = ['CSE', 'ECE', 'MEC', 'CIVIL', 'Allied CSE'];

  const handleSearch = () => {
    const filtered = allStudents.filter(student => student.branch === selectedBranch);
    setFilteredStudents(filtered);
  };

  return (
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
                <td>{student.roll}</td>
                <td>{student.branch}</td>
                <td>{student.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedBranch && filteredStudents.length === 0 && (
        <p className="no-results">No students found in {selectedBranch}.</p>
      )}
    </div>
  );
};

export default Search;
