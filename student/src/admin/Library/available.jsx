import React, { useState, useEffect } from 'react';
import './available.css';

const Available = () => {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('availableBooks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newBook, setNewBook] = useState({
    id: '',
    name: '',
    author: '',
    quantity: '',
    shelf: ''
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    localStorage.setItem('availableBooks', JSON.stringify(books));
  }, [books]);

  const handleAddOrUpdate = () => {
    const { id, name, author, quantity, shelf } = newBook;

    if (!id || !name || !author || !quantity || !shelf) {
      setErrorMsg('All fields are required.');
      return;
    }

    const isDuplicateId = books.some((book, index) => book.id === id && index !== editingIndex);
    if (isDuplicateId) {
      setErrorMsg('ID must be unique!');
      return;
    }

    if (editingIndex !== null) {
      const updatedBooks = [...books];
      updatedBooks[editingIndex] = newBook;
      setBooks(updatedBooks);
    } else {
      setBooks([...books, newBook]);
    }

    setNewBook({ id: '', name: '', author: '', quantity: '', shelf: '' });
    setEditingIndex(null);
    setErrorMsg('');
  };

  const handleEdit = (index) => {
    setNewBook(books[index]);
    setEditingIndex(index);
    setErrorMsg('');
  };

  const handleRemove = (id) => {
    setBooks(books.filter((book) => book.id !== id));
    if (editingIndex !== null && books[editingIndex].id === id) {
      setEditingIndex(null);
      setNewBook({ id: '', name: '', author: '', quantity: '', shelf: '' });
    }
  };

  return (
    <div className="available-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-logo">
          <h1>Book Manager</h1>
        </div>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="Returned">Returned Books</a></li>
          <li><a href="Borrowed">Borrowed Books</a></li>
        </ul>
      </div>

      <h2>Books Available</h2>

      {errorMsg && <p className="error-msg">{errorMsg}</p>}

      <div className="available-form">
        <input
          type="text"
          placeholder="ID"
          value={newBook.id}
          onChange={(e) => setNewBook({ ...newBook, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Book Name"
          value={newBook.name}
          onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="number"
          placeholder="Available"
          value={newBook.quantity}
          onChange={(e) => setNewBook({ ...newBook, quantity: e.target.value })}
        />
        <input
          type="text"
          placeholder="Shelf Location"
          value={newBook.shelf}
          onChange={(e) => setNewBook({ ...newBook, shelf: e.target.value })}
        />
        <button onClick={handleAddOrUpdate}>
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <div className="available-list">
        {books.map((book, index) => (
          <div key={book.id} className="book-item">
            <span>{book.id}</span>
            <span>{book.name}</span>
            <span>{book.author}</span>
            <span>{book.quantity}</span>
            <span>{book.shelf}</span>
            <div className="action-buttons">
              <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
              <button className="remove-btn" onClick={() => handleRemove(book.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="footer">
        <p>© 2025 Book Manager. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Available;
