import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For linking to other routes (login, dashboard, etc.)
import './Borrowed.css';

const Borrowed = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('borrowedBooks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newEntry, setNewEntry] = useState({
    id: '',
    bookName: '',
    studentName: '',
    rollNo: '',
    borrowedDate: ''
  });

  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('borrowedBooks', JSON.stringify(entries));
  }, [entries]);

  const handleAddOrUpdate = () => {
    const { id, bookName, studentName, rollNo, borrowedDate } = newEntry;

    if (!id || !bookName || !studentName || !rollNo || !borrowedDate) {
      setError('All fields are required');
      return;
    }

    const isDuplicate = entries.some(entry => entry.id === id);
    if (isDuplicate && editId === null) {
      setError('ID must be unique');
      return;
    }

    if (editId !== null) {
      const updatedEntries = entries.map(entry =>
        entry.id === editId ? newEntry : entry
      );
      setEntries(updatedEntries);
      setEditId(null);
    } else {
      setEntries([...entries, newEntry]);
    }

    setNewEntry({
      id: '',
      bookName: '',
      studentName: '',
      rollNo: '',
      borrowedDate: ''
    });
    setError('');
  };

  const handleRemove = (id) => {
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
    if (editId === id) {
      setEditId(null);
      setNewEntry({
        id: '',
        bookName: '',
        studentName: '',
        rollNo: '',
        borrowedDate: ''
      });
    }
  };

  const handleEdit = (id) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    if (entryToEdit) {
      setNewEntry(entryToEdit);
      setEditId(id);
    }
  };

  return (
    <div className="borrowed-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>Library System</h1>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admin/login">Log-out</Link></li>
        </ul>
      </nav>

      <h2>Books Borrowed</h2>

      {error && <p className="error-msg">{error}</p>}

      <div className="add-form">
        <input
          type="text"
          placeholder="ID"
          value={newEntry.id}
          onChange={(e) => setNewEntry({ ...newEntry, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Book Name"
          value={newEntry.bookName}
          onChange={(e) => setNewEntry({ ...newEntry, bookName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Student Name"
          value={newEntry.studentName}
          onChange={(e) => setNewEntry({ ...newEntry, studentName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Roll No"
          value={newEntry.rollNo}
          onChange={(e) => setNewEntry({ ...newEntry, rollNo: e.target.value })}
        />
        <input
          type="date"
          value={newEntry.borrowedDate}
          onChange={(e) => setNewEntry({ ...newEntry, borrowedDate: e.target.value })}
        />
        <button onClick={handleAddOrUpdate}>
          {editId !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <div className="borrowed-list">
        {entries.map((entry) => (
          <div key={entry.id} className="entry-item">
            <span>{entry.id}</span>
            <span>{entry.bookName}</span>
            <span>{entry.studentName}</span>
            <span>{entry.rollNo}</span>
            <span>{entry.borrowedDate}</span>
            <div className="buttons-group">
              <button className="edit-btn" onClick={() => handleEdit(entry.id)}>Edit</button>
              <button className="remove-btn" onClick={() => handleRemove(entry.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Library System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Borrowed;
