import React from 'react';

export default function SimulationResult({ mode, result, onVerify }) {
  if (!result) return null;

  return (
    <div className="sim-result-card fade-in">
      <div className="sim-result-header">
        <span className="success-check">✓</span>
        <h2>{mode === 'encrypt' ? 'ENCRYPTION' : 'DECRYPTION'} COMPLETE</h2>
      </div>
      
      <div className="sim-result-grid">
        <div className="sim-result-item">
          <label>Original {mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'}:</label>
          <div className="sim-result-val">{mode === 'encrypt' ? result.plaintext : result.ciphertext}</div>
        </div>
        <div className="sim-result-item">
          <label>Keyword:</label>
          <div className="sim-result-val">{result.keyword}</div>
        </div>
        <div className="sim-result-item">
          <label>Generated Key Stream:</label>
          <div className="sim-result-val violet">{result.keyStream}</div>
        </div>
        <div className="sim-result-item">
          <label>Resulting {mode === 'encrypt' ? 'Ciphertext' : 'Plaintext'}:</label>
          <div className="sim-result-val cyan">{mode === 'encrypt' ? result.ciphertext : result.plaintext}</div>
        </div>
      </div>

      <div className="sim-result-msg">
        Every character has been processed successfully.
      </div>
      
      <div className="sim-result-actions">
        <button className="btn btn-primary btn-large" onClick={onVerify}>
          {mode === 'encrypt' ? 'VERIFY DECRYPTION' : 'VERIFY ENCRYPTION'}
        </button>
      </div>
    </div>
  );
}
