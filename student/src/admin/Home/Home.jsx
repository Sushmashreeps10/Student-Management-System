import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => navigate('/admin/login');
  const handleStudentDatabase = () => navigate('/admin/studentdata/StudentDB');
  const handleSearchStudentData = () => navigate('/admin/studentdata/search');
  const handleBooksBorrowed = () => navigate('/admin/library/borrowed');
  const handleBooksAvailable = () => navigate('/admin/library/available');
  const handleBooksReturned = () => navigate('/admin/library/returned');
  const toggleLibraryDropdown = () => setLibraryOpen(!libraryOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">MyUniversity</h2>
        <ul className="sidebar-menu">
          <li>Dashboard</li>
          <li>Time Table</li>
          <li>Exams</li>

          <li onClick={toggleLibraryDropdown}>Library ⬇</li>
          {libraryOpen && (
            <ul className="library-dropdown">
              <li onClick={handleBooksBorrowed}>Books Borrowed</li>
              <li onClick={handleBooksAvailable}>Books Available</li>
              <li onClick={handleBooksReturned}>Books Returned</li>
            </ul>
          )}

          <li>Hostel</li>
          <li>Transportation</li>
          <li>Fee Payment</li>
          <li>More</li>
        </ul>
      </div>

      {/* Profile Dropdown */}
      <div className="dropdown" id="dropdown-profile" ref={dropdownRef}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          onClick={handleProfileClick}
        >
          Profile ⬇
        </button>
        {dropdownOpen && (
          <ul className="dropdown-menu show">
            <li><a className="dropdown-item" onClick={handleStudentDatabase}>Student-Database</a></li>
            <li><a className="dropdown-item" onClick={handleSearchStudentData}>Search-StudentData</a></li>
            <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        <p>MyUniversity - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Home;
