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
  const handleStudentDatabase = () => navigate('/admin/Studentdata/StudentDB');
  const handleSearchStudentData = () => navigate('/admin/Studentdata/Search');
  const handleBooksBorrowed = () => navigate('/admin/Library/Borrowed');
  const handleBooksAvailable = () => navigate('/admin/Library/Available');
  const handleBooksReturned = () => navigate('/admin/Library/Returned');
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

      {/* Main Content */}
      <div className="main-content">
        <div className="navbar">
          <div className="profile-section" ref={dropdownRef}>
            <button className="profile-button" onClick={handleProfileClick}>
              Profile ⬇
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu show">
                <li onClick={handleStudentDatabase}>Student Database</li>
                <li onClick={handleSearchStudentData}>Search Student Data</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            )}
          </div>
        </div>

        <div className="content-body">
          <h1>Welcome to MyUniversity Portal</h1>
          <p>Select an option from the sidebar to begin.</p>
        </div>

        <div className="footer">
          <p>MyUniversity - All Rights Reserved © 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
