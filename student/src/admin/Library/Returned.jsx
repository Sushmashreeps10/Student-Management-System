import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Returned.css';
import Navbar from '../../Components/NavBar';
import Footer from '../../Components/Footer';

const Returned = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    bookName: '',
    studentName: '',
    rollNo: '',
    returnedDate: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const apiUrl = 'http://localhost:8080/returned';

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAllReturned`);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${apiUrl}/edit/${formData.id}`, formData);
      } else {
        await axios.post(`${apiUrl}/addReturned`, formData);
      }
      setFormData({ id: '', bookName: '', studentName: '', rollNo: '', returnedDate: '' });
      setIsEditing(false);
      fetchEntries();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleEdit = (entry) => {
    setFormData(entry);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/delete/${id}`);
      fetchEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div className="returned-container">
      <Navbar />

      <div className="form-container">
        <h2>{isEditing ? 'Edit Returned Book' : 'Add Returned Book'}</h2>
        <form onSubmit={handleSubmit} className="add-form">
          <input
            name="id"
            type="text"
            placeholder="ID"
            value={formData.id}
            onChange={handleChange}
            required
            disabled={isEditing}
          />
          <input
            name="bookName"
            type="text"
            placeholder="Book Name"
            value={formData.bookName}
            onChange={handleChange}
            required
          />
          <input
            name="studentName"
            type="text"
            placeholder="Student Name"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
          <input
            name="rollNo"
            type="text"
            placeholder="Roll No"
            value={formData.rollNo}
            onChange={handleChange}
            required
          />
          <input
            name="returnedDate"
            type="date"
            value={formData.returnedDate}
            onChange={handleChange}
            required
          />
          <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
        </form>
      </div>

      <div className="entries-container">
        {entries.length === 0 ? (
          <p className="empty-msg">No returned books yet.</p>
        ) : (
          <table className="entries-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Book Name</th>
                <th>Student Name</th>
                <th>Roll No</th>
                <th>Returned Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{entry.bookName}</td>
                  <td>{entry.studentName}</td>
                  <td>{entry.rollNo}</td>
                  <td>{entry.returnedDate}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(entry)}>Edit</button>
                    <button className="remove-btn" onClick={() => handleDelete(entry.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Returned;
