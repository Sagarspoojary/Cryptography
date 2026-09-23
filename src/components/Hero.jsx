import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [animStep, setAnimStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-inner">
        <div>
          <div className="hero-eyebrow animate-fade-in">
            <span className="badge badge-blue">Interactive V2.0</span>
            <span className="badge badge-violet">Autokey Algorithm</span>
          </div>
          
          <h1 className="hero-title animate-fade-up">
            AUTOKEY<br/>
            <span className="gradient-text">CIPHER</span>
          </h1>
          
          <p className="hero-subtitle animate-fade-up" style={{animationDelay: '100ms'}}>
            Interactive Cryptography Virtual Laboratory
          </p>
          
          <p className="hero-description animate-fade-up" style={{animationDelay: '200ms'}}>
            Explore how the Autokey Cipher transforms plaintext into ciphertext 
            using a dynamically extended key. Perfect for academic demonstrations 
            and understanding classical cryptography.
          </p>
          
          <div className="hero-actions animate-fade-up" style={{animationDelay: '300ms'}}>
            <a href="#lab" className="btn btn-primary">Launch Laboratory</a>
            <a href="#how-it-works" className="btn btn-secondary">Learn Algorithm</a>
          </div>
        </div>

        <div className="hero-visual animate-fade-in" style={{animationDelay: '400ms'}}>
          <div className="cipher-demo-card">
            <div className="cipher-demo-header">Encryption Flow</div>
            
            <div className="cipher-demo-row">
              <div className="cipher-demo-label">Plaintext</div>
              <div className={`cipher-demo-value blue ${animStep >= 0 ? 'animate-fade-in' : ''}`}>ATTACK</div>
            </div>
            
            <div className={`cipher-demo-arrow ${animStep >= 1 ? 'animate-fade-in' : ''}`} style={{opacity: animStep >= 1 ? 1 : 0}}>
              <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
            
            <div className="cipher-demo-row" style={{opacity: animStep >= 1 ? 1 : 0}}>
              <div className="cipher-demo-label">Key Stream</div>
              <div className={`cipher-demo-value violet ${animStep >= 1 ? 'animate-fade-in' : ''}`}>KEYATT</div>
            </div>
            
            <div className={`cipher-demo-arrow ${animStep >= 2 ? 'animate-fade-in' : ''}`} style={{opacity: animStep >= 2 ? 1 : 0}}>
              <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
            
            <div className="cipher-demo-row" style={{opacity: animStep >= 2 ? 1 : 0}}>
              <div className="cipher-demo-label">Ciphertext</div>
              <div className={`cipher-demo-value cyan ${animStep >= 2 ? 'animate-fade-in' : ''}`}>KXRAVD</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
