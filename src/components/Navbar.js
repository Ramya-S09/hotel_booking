// src/components/Navbar.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar-luxe">
      <Link to="/" className="navbar-brand-luxe">
        Luxe<span>Stay</span>
      </Link>

      <div className="navbar-nav-luxe">
        <Link to="/" className="nav-link-luxe">Home</Link>
        <Link to="/hotels" className="nav-link-luxe">Hotels</Link>

        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="nav-link-luxe">
              <i className="bi bi-person-circle me-1"></i>
              {user?.firstName || 'My Account'}
            </Link>
            <Link to="/my-bookings" className="nav-link-luxe">Bookings</Link>
            <button className="btn-nav-login" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-nav-login">Login</Link>
            <Link to="/register" className="btn-nav-register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
