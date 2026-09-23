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
          </div>
        </div>
      </div>
    </footer>
  );
}
