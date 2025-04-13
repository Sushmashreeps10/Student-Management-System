import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const handleStudentDatabase = () => {
    navigate('/admin/student-profile');
  };

  const toggleLibraryDropdown = () => {
    setLibraryOpen(!libraryOpen);
  };

  const handleBooksBorrowed = () => {
    navigate('/admin/library/borrowed');
  };

  const handleBooksAvailable = () => {
    navigate('/admin/library/available');  // Navigate to the Books Available page
  };

  const handleBooksReturned = () => {
    navigate('/admin/library/returned');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

          {/* Library dropdown */}
          <li onClick={toggleLibraryDropdown}>Library ⬇</li>
          {libraryOpen && (
            <ul className="library-dropdown">
              <li onClick={handleBooksBorrowed}>Books Borrowed</li>
              <li onClick={handleBooksAvailable}>Books Available</li>  {/* Add Books Available link */}
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
          <div className="profile-dropdown" ref={dropdownRef}>
            <button
              onClick={handleProfileClick}
              className="profile-button"
              aria-label="Profile"
            >
              ⬇
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={handleStudentDatabase}>
                  <span className="icon">📚</span>
                  Student Database
                </div>
                <div className="dropdown-item" onClick={handleLogout}>
                  <span className="icon">🚪</span>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="content-body">
          {/* Add your middle content here if needed */}
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>MyUniversity - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Home;
