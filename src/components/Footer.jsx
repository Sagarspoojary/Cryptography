import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-logo">
            CRYPTO<span>LAB</span>
          </div>
          
          <p className="footer-desc">
            Interactive Cryptography Virtual Laboratory. 
            Designed for educational demonstration and visualization of classical encryption algorithms.
          </p>
          
          <div className="footer-links">
            <a href="#lab">Virtual Lab</a>
            <a href="#how-it-works">Algorithm</a>
            <a href="#test-cases">Test Cases</a>
            <a href="#about">About</a>
          </div>

          <div className="footer-bottom">
            <p>Algorithm: Autokey Cipher | Academic Project</p>
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>
              Developed by{' '}
              <a href="https://github.com/manoj008-cmd" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 'bold' }}>
                Manoj Kumar
              </a>
              {' '}and{' '}
              <a href="https://github.com/Sagarspoojary" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 'bold' }}>
                Sagar S
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
