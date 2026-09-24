import React, { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          <div className="navbar-logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <div className="navbar-logo-text">
            CRYPTO<span>LAB</span>
          </div>
        </a>

        <ul className="navbar-nav">
          <li><a href="#lab">Lab</a></li>
          <li><a href="#simulator">Simulator</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#test-cases">Test Cases</a></li>
          <li><a href="#about">About</a></li>
        </ul>

        <div className="navbar-right">
          <div className="navbar-badge">
            <span className="navbar-badge-label">Autokey Cipher</span>
            <div className="navbar-status">
              <span className="status-dot"></span>
              LOCAL / READY
            </div>
          </div>
          <button 
            className="navbar-hamburger" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#lab" onClick={() => setMobileMenuOpen(false)}>Lab</a>
        <a href="#simulator" onClick={() => setMobileMenuOpen(false)}>Simulator</a>
        <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
        <a href="#test-cases" onClick={() => setMobileMenuOpen(false)}>Test Cases</a>
        <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
      </div>
    </nav>
  );
}
