import React from 'react';

export default function Correctness() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-header-accent"></div>
          <h2 className="section-title">Correctness Verification</h2>
          <p className="section-subtitle">Mathematical Proof of Reversibility</p>
        </div>

        <div className="info-card">
          <p className="info-desc" style={{marginBottom: '1rem'}}>
            For every valid input, the Autokey cipher guarantees that:
          </p>
          <div className="formula-box" style={{padding: '1rem', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.3)'}}>
            <div className="formula-math" style={{fontSize: '1.2rem', fontFamily: 'var(--font-mono)', fontStyle: 'normal'}}>
              Decrypt(Encrypt(Plaintext, Keyword), Keyword) = Plaintext
            </div>
          </div>
          
          <div className="correctness-box">
            <div className="correctness-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Verification Example
            </div>
            
            <div className="correctness-flow">
              <div className="correct-node">
                <div className="correct-node-label">Original</div>
                <div className="correct-node-val">ATTACK</div>
              </div>
              
              <div className="correct-arrow">→</div>
              
              <div className="correct-node" style={{borderColor: 'rgba(34, 211, 238, 0.4)'}}>
                <div className="correct-node-label" style={{color: 'var(--accent-cyan)'}}>Encrypted</div>
                <div className="correct-node-val" style={{color: 'var(--accent-cyan)'}}>KXRAVD</div>
              </div>
              
              <div className="correct-arrow">→</div>
              
              <div className="correct-node" style={{borderColor: 'rgba(16, 185, 129, 0.4)'}}>
                <div className="correct-node-label" style={{color: 'var(--success)'}}>Decrypted</div>
                <div className="correct-node-val" style={{color: 'var(--success)'}}>ATTACK</div>
              </div>
            </div>
            
            <div style={{textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)'}}>
              ✓ Original plaintext matches decrypted plaintext
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
