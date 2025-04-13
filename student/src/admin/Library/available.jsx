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

  useEffect(() => {
    localStorage.setItem('availableBooks', JSON.stringify(books));
  }, [books]);

  const handleAddOrUpdate = () => {
    if (!newBook.id || !newBook.name || !newBook.author || !newBook.quantity || !newBook.shelf) return;

    if (editingIndex !== null) {
      const updatedBooks = [...books];
      updatedBooks[editingIndex] = newBook;
      setBooks(updatedBooks);
      setEditingIndex(null);
    } else {
      setBooks([...books, newBook]);
    }

    setNewBook({ id: '', name: '', author: '', quantity: '', shelf: '' });
  };

  const handleEdit = (index) => {
    setNewBook(books[index]);
    setEditingIndex(index);
  };

  const handleRemove = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="available-container">
      <h2>Books Available</h2>

      <div className="available-form">
        <input type="text" placeholder="ID" value={newBook.id} onChange={(e) => setNewBook({ ...newBook, id: e.target.value })} />
        <input type="text" placeholder="Book Name" value={newBook.name} onChange={(e) => setNewBook({ ...newBook, name: e.target.value })} />
        <input type="text" placeholder="Author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
        <input type="number" placeholder="Available" value={newBook.quantity} onChange={(e) => setNewBook({ ...newBook, quantity: e.target.value })} />
        <input type="text" placeholder="Shelf Location" value={newBook.shelf} onChange={(e) => setNewBook({ ...newBook, shelf: e.target.value })} />
        <button onClick={handleAddOrUpdate}>{editingIndex !== null ? 'Update' : 'Add'}</button>
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
    </div>
  );
};

export default Available;
