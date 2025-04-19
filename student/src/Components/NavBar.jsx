import React, { useState } from 'react';
import axios from 'axios';
import './components.css';

const Navbar = () => {

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h1 className="navbar-title">StudentDB</h1>
        <div className="navbar-links">
          <a href="/admin/Home">Home</a>
          {/* <a href="StudentDB">Add Student</a> */}
          <a href="/admin/Login">Log-out</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
