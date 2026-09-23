import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-header-accent"></div>
          <h2 className="section-title">About the Algorithm</h2>
          <p className="section-subtitle">Educational Information & Context</p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <div className="info-label" style={{color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Type</div>
            <h3 className="info-title">Classical Symmetric Cipher</h3>
            <p className="info-desc">
              The Autokey cipher is a classical polyalphabetic substitution cipher. It is symmetric, meaning the same initial keyword is used for both encryption and decryption.
            </p>
          </div>

          <div className="info-card">
            <div className="info-label" style={{color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Key Concept</div>
            <h3 className="info-title">Autokey / Running Key</h3>
            <p className="info-desc">
              Instead of repeating a short keyword (like the Vigenère cipher), it generates a key stream as long as the plaintext by concatenating the keyword with the plaintext itself.
            </p>
          </div>

          <div className="info-card">
            <div className="info-label" style={{color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Advantages over Vigenère</div>
            <h3 className="info-title">Resists Kasiski Examination</h3>
            <p className="info-desc">
              Because the key does not repeat periodically, classical cryptanalysis techniques like the Kasiski examination and Index of Coincidence are much less effective against it.
            </p>
          </div>

          <div className="info-card">
            <div className="info-label" style={{color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Limitations</div>
            <h3 className="info-title">Not Secure for Modern Use</h3>
            <p className="info-desc">
              Like all classical ciphers, it is completely insecure by modern standards. If the keyword length is guessed, the plaintext structure can often be recovered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
