import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container">
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#2c3e50' }}>
          Welcome to QuickFix
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#7f8c8d', marginBottom: '2rem' }}>
          Connect with trusted local service professionals for all your home needs
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {isAuthenticated ? (
            <Link to="/services" className="btn btn-primary" style={{ width: '200px' }}>
              Browse Services
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary" style={{ width: '200px' }}>
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary" style={{ width: '200px', backgroundColor: '#3498db', color: 'white' }}>
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', margin: '3rem 0' }}>
        <div className="card">
          <h3>Find Services</h3>
          <p>Browse and search for qualified service providers in your area</p>
        </div>
        <div className="card">
          <h3>Easy Booking</h3>
          <p>Book services directly from trusted professionals</p>
        </div>
        <div className="card">
          <h3>Ratings & Reviews</h3>
          <p>Read reviews from other customers and share your experience</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
