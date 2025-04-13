import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Ensure the path is correct for your CSS file

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const handleStudentProfile = () => {
    navigate('/admin/student-profile'); // This should be the route for student profile
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">MyUniversity</h2>
        <ul className="sidebar-menu">
          <li>Dashboard</li>
          <li>Time Table</li>
          <li>Exams</li>
          <li>Library</li>
          <li>Hostel</li>
          <li>Transportation</li>
          <li>Fee Payment</li>
          <li>More</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="navbar">
          <div className="profile-dropdown">
            <button onClick={handleProfileClick} className="profile-button">
              Profile ⬇
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div onClick={handleStudentProfile}>Student Profile</div>
                <div onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
        <div className="content-body">
          {/* Middle content can go here */}
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
