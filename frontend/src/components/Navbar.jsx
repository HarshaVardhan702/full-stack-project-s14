import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ userRole, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📋</span>
          CertTracker
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/certifications" className="nav-links">Certifications</Link>
          </li>
          <li className="nav-item">
            <Link to="/add-certification" className="nav-links">Add New</Link>
          </li>
          {userRole === 'admin' && (
            <li className="nav-item">
              <Link to="/admin" className="nav-links admin-link">Admin Panel</Link>
            </li>
          )}
          <li className="nav-item">
            <span className="user-role">{userRole.toUpperCase()}</span>
          </li>
          <li className="nav-item">
            <button className="nav-links logout-btn" onClick={onLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
