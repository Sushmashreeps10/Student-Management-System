import React, { useState, useEffect } from 'react';
import './available.css';
import Navbar from '../../Components/NavBar';
import Footer from '../../Components/Footer';

const Available = () => {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    bookName: "",
    quantity: "",
    shelf: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // ✅ Backend URL (change if needed)
  const BASE_URL = "http://localhost:8080/available";

  useEffect(() => {
    fetch(`${BASE_URL}/getAllAvailable`)
      .then(res => res.json())
      .then(data => setAvailableBooks(data))
      .catch(err => console.error("Failed to fetch data", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      bookName: formData.bookName,
      quantity: formData.quantity,
      shelf: formData.shelf
    };

    try {
      if (isEditing) {
        await fetch(`${BASE_URL}/edit/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${BASE_URL}/addAvailable`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      // Refresh book list
      const updated = await fetch(`${BASE_URL}/getAllAvailable`).then(res => res.json());
      setAvailableBooks(updated);
      setFormData({ id: "", bookName: "", quantity: "", shelf: "" });
      setIsEditing(false);
    } catch (error) {
      console.error("Error in form submission", error);
    }
  };

  const handleEdit = (book) => {
    setFormData({
      id: book.id,
      bookName: book.bookName,
      quantity: book.quantity,
      shelf: book.shelf,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/delete/${id}`, {
        method: "DELETE",
      });
      const updated = await fetch(`${BASE_URL}/getAllAvailable`).then(res => res.json());
      setAvailableBooks(updated);
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  return (
    <div className="available-container">
      <Navbar />

      <div className="form-section">
        <h2>{isEditing ? "Update Available Book" : "Add Available Book"}</h2>
        <form onSubmit={handleSubmit}>
          {isEditing && (
            <input
              name="id"
              type="text"
              placeholder="ID (auto)"
              value={formData.id}
              readOnly
            />
          )}
          <input
            name="bookName"
            type="text"
            placeholder="Book Name"
            value={formData.bookName}
            onChange={handleChange}
            required
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
          <input
            name="shelf"
            type="text"
            placeholder="Shelf Location"
            value={formData.shelf}
            onChange={handleChange}
            required
          />
          <button type="submit">{isEditing ? "Update" : "Add"}</button>
        </form>
      </div>

      <div className="table-section">
        <h3>Available Books List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Book Name</th>
              <th>Quantity</th>
              <th>Shelf</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {availableBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.bookName}</td>
                <td>{book.quantity}</td>
                <td>{book.shelf}</td>
                <td>
                  <button onClick={() => handleEdit(book)}>Edit</button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default Available;
