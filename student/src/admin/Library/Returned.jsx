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
    returnedDate: '',
    borrowedDate: ''
  });

  useEffect(() => {
    localStorage.setItem('returnedBooks', JSON.stringify(entries));
  }, [entries]);

  const handleAdd = () => {
    if (
      newEntry.id &&
      newEntry.bookName &&
      newEntry.studentName &&
      newEntry.rollNo &&
      newEntry.returnedDate &&
      newEntry.borrowedDate
    ) {
      setEntries([...entries, newEntry]);
      setNewEntry({
        id: '',
        bookName: '',
        studentName: '',
        rollNo: '',
        returnedDate: '',
        borrowedDate: ''
      });
    }
  };

  const handleRemove = (id) => {
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
  };

  const handleEdit = (id) => {
    const entryToEdit = entries.find(entry => entry.id === id);
    if (entryToEdit) {
      setNewEntry(entryToEdit);
      handleRemove(id);
    }
  };

  return (
    <div className="returned-container">
      <h2>Books Returned</h2>

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
          placeholder="Returned Date"
          value={newEntry.returnedDate}
          onChange={(e) => setNewEntry({ ...newEntry, returnedDate: e.target.value })}
        />
        <input
          type="date"
          placeholder="Borrowed Date"
          value={newEntry.borrowedDate}
          onChange={(e) => setNewEntry({ ...newEntry, borrowedDate: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="returned-list">
        {entries.map((entry) => (
          <div key={entry.id} className="entry-item">
            <span>{entry.id}</span>
            <span>{entry.bookName}</span>
            <span>{entry.studentName}</span>
            <span>{entry.rollNo}</span>
            <span>{entry.returnedDate}</span>
            <span>{entry.borrowedDate}</span>
            <button className="edit-btn" onClick={() => handleEdit(entry.id)}>
              Edit
            </button>
            <button className="remove-btn" onClick={() => handleRemove(entry.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Returned;
