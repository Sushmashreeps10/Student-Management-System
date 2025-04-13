import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    localStorage.setItem('borrowedBooks', JSON.stringify(entries));
  }, [entries]);

  const handleAdd = () => {
    if (
      newEntry.id &&
      newEntry.bookName &&
      newEntry.studentName &&
      newEntry.rollNo &&
      newEntry.borrowedDate
    ) {
      setEntries([...entries, newEntry]);
      setNewEntry({
        id: '',
        bookName: '',
        studentName: '',
        rollNo: '',
        borrowedDate: ''
      });
    }
  };

  const handleRemove = (id) => {
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
  };

  return (
    <div className="borrowed-container">
      <h2>Books Borrowed</h2>

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
          placeholder="Borrowed Date"
          value={newEntry.borrowedDate}
          onChange={(e) => setNewEntry({ ...newEntry, borrowedDate: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="borrowed-list">
        {entries.map((entry) => (
          <div key={entry.id} className="entry-item">
            <span>{entry.id}</span>
            <span>{entry.bookName}</span>
            <span>{entry.studentName}</span>
            <span>{entry.rollNo}</span>
            <span>{entry.borrowedDate}</span>
            <button className="remove-btn" onClick={() => handleRemove(entry.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Borrowed;
