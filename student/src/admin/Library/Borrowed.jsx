import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Borrowed.css"; // Optional: your custom styles
import Navbar from '../../Components/NavBar';
import Footer from '../../Components/Footer';


const Borrowed = () => {
  const [borrowedList, setBorrowedList] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    bookName: "",
    studentName: "",
    rollNo: "",
    borrowedDate: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/borrowed/getAllBorrowed");
      setBorrowedList(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
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
        await axios.put(`http://localhost:8080/borrowed/edit/${formData.id}`, formData);
      } else {
        await axios.post("http://localhost:8080/borrowed/addBorrowed", formData);
      }

      fetchBorrowedBooks();
      setFormData({ id: "", bookName: "", studentName: "", rollNo: "", borrowedDate: "" });
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving data:", err);
      alert("Failed to save book. See console for details.");
    }
  };

  const handleEdit = (book) => {
    setFormData({
      id: book.id,
      bookName: book.bookName,
      studentName: book.studentName,
      rollNo: book.rollNo,
      borrowedDate: book.borrowedDate,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/borrowed/delete/${id}`);
      fetchBorrowedBooks();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="borrowed-container">
      {/* Navbar */}
      <Navbar/>

      {/* Form */}
      <div className="form-section">
        <h2>{isEditing ? "Update Borrowed Book" : "Add Borrowed Book"}</h2>
        <form onSubmit={handleSubmit}>
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
            name="borrowedDate"
            type="date"
            value={formData.borrowedDate}
            onChange={handleChange}
            required
          />
          <button type="submit">{isEditing ? "Update" : "Add"}</button>
        </form>
      </div>

      {/* Table */}
      <div className="table-section">
        <h3>Borrowed Books List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Book Name</th>
              <th>Student Name</th>
              <th>Roll No</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrowedList.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.bookName}</td>
                <td>{book.studentName}</td>
                <td>{book.rollNo}</td>
                <td>{book.borrowedDate}</td>
                <td>
                  <button onClick={() => handleEdit(book)}>Edit</button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Borrowed;
