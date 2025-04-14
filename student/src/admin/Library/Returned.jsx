import React, { useState, useEffect } from 'react';
import './Returned.css';

const Returned = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('returnedBooks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newEntry, setNewEntry] = useState({
    id: '',
    bookName: '',
    studentName: '',
    rollNo: '',
    returnedDate: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    localStorage.setItem('returnedBooks', JSON.stringify(entries));
  }, [entries]);

  const handleAddOrUpdate = () => {
    const { id, bookName, studentName, rollNo, returnedDate } = newEntry;

    if (!id || !bookName || !studentName || !rollNo || !returnedDate) {
      setErrorMsg('All fields are required.');
      return;
    }

    const isDuplicate = entries.some(
      (entry) => entry.id === id && id !== editingId
    );

    if (isDuplicate) {
      setErrorMsg('ID must be unique!');
      return;
    }

    if (editingId !== null) {
      setEntries(
        entries.map((entry) =>
          entry.id === editingId ? { ...newEntry } : entry
        )
      );
      setEditingId(null);
    } else {
      setEntries([...entries, newEntry]);
    }

    setNewEntry({
      id: '',
      bookName: '',
      studentName: '',
      rollNo: '',
      returnedDate: ''
    });
    setErrorMsg('');
  };

  const handleEdit = (id) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    if (entryToEdit) {
      setNewEntry(entryToEdit);
      setEditingId(id);
      setErrorMsg('');
    }
  };

  const handleRemove = (id) => {
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
    if (editingId === id) {
      setEditingId(null);
      setNewEntry({
        id: '',
        bookName: '',
        studentName: '',
        rollNo: '',
        returnedDate: ''
      });
    }
  };

  return (
    <div className="returned-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>Book Return</h1>
        </div>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="Borrowed">Borrowed Books</a></li>
        </ul>
      </nav>

      <div className="form-container">
        <h2>Books Returned</h2>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

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
            value={newEntry.returnedDate}
            onChange={(e) => setNewEntry({ ...newEntry, returnedDate: e.target.value })}
          />
          <button onClick={handleAddOrUpdate}>
            {editingId ? 'Update' : 'Add'}
          </button>
        </div>
      </div>

      <div className="entries-container">
        {entries.length === 0 ? (
          <p className="empty-msg">No returned books yet.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="entry-item">
              <span>{entry.id}</span>
              <span>{entry.bookName}</span>
              <span>{entry.studentName}</span>
              <span>{entry.rollNo}</span>
              <span>{entry.returnedDate}</span>
              <div className="entry-buttons">
                <button className="edit-btn" onClick={() => handleEdit(entry.id)}>Edit</button>
                <button className="remove-btn" onClick={() => handleRemove(entry.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Book Return System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Returned;
