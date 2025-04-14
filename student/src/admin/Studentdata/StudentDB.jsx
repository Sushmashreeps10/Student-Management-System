import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentDB.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">🎓 StudentDB</div>
    <ul className="navbar-links">
      <li><a href="/">Home</a></li>
      <li><a href="#add">Add Student</a></li>
    </ul>
  </nav>
);

const Footer = () => (
  <footer className="footer">
    <p>&copy; {new Date().getFullYear()} StudentDB — Powered by Sushmashree 💼</p>
  </footer>
);

const StudentDB = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '', rollNo: '', branch: '', year: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const fetchAllStudents = async () => {
    const res = await axios.get("http://localhost:8080/student/getAllStudents");
    setStudents(res.data);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:8080/student/edit/${editId}`, formData);
    } else {
      await axios.post("http://localhost:8080/student/addStudent", formData);
    }
    setFormData({ name: '', rollNo: '', branch: '', year: '' });
    setEditId(null);
    fetchAllStudents();
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:8080/student/delete/${id}`);
    fetchAllStudents();
  };

  const handleEdit = student => {
    setEditId(student.id);
    setFormData({
      name: student.name,
      rollNo: student.rollNo,
      branch: student.branch,
      year: student.year
    });
  };

  return (
    <>
      <Navbar />
      <div className="student-db-container">
        <h1 className="header" id="add">Student Database Form</h1>

        <div className="student-form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input className="input-field" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
              <input className="input-field" placeholder="Roll No" name="rollNo" value={formData.rollNo} onChange={handleChange} required />
              <select className="input-field" name="branch" value={formData.branch} onChange={handleChange} required>
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="MEC">MEC</option>
                <option value="CIVIL">CIVIL</option>
              </select>
              <input className="input-field" placeholder="Year" name="year" type="number" value={formData.year} min="1" max="4" onChange={handleChange} required />
              <button type="submit" className="add-btn">{editId ? "Update" : "Add Student"}</button>
            </div>
          </form>
        </div>

        <div className="student-table">
          <h2>Student List</h2>
          <p>Total Students: {students.length}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Roll No</th><th>Branch</th><th>Year</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.rollNo}</td>
                  <td>{student.branch}</td>
                  <td>{student.year}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(student)}>Edit</button>
                    <button className="remove-btn" onClick={() => handleDelete(student.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentDB;
