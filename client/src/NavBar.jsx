// src/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">JOB BOARD</h1>
      <ul className="navbar-links">
        <li><Link to="/feed">Feed</Link></li>
        <li><Link to="/upload">Upload</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/chat">Messages</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default NavBar;
