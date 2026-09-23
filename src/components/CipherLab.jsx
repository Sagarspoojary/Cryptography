import React, { useState } from 'react';
import StepVisualization from './StepVisualization';
import CalculationTable from './CalculationTable';
import { encrypt, decrypt, sanitizeInput } from '../utils/autokeyCipher';

export default function CipherLab() {
  const [mode, setMode] = useState('encrypt'); // 'encrypt' | 'decrypt'
  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copiedCipher, setCopiedCipher] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleClear = () => {
    setInput('');
    setKeyword('');
    setResult(null);
    setError(null);
    setCopiedCipher(false);
    setCopiedKey(false);
  };

  const handleProcess = async () => {
    setError(null);
    setResult(null);
    setCopiedCipher(false);
    setCopiedKey(false);

    try {
      const endpoint = mode === 'encrypt' ? '/api/encrypt' : '/api/decrypt';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: input,
          keyword: keyword,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err) {
      console.warn("Backend fetch failed, falling back to local JS computation:", err);
      try {
        if (mode === 'encrypt') {
          const res = encrypt(input, keyword);
          setResult(res);
        } else {
          const res = decrypt(input, keyword);
          setResult(res);
        }
      } catch (fallbackErr) {
        setError(fallbackErr.message);
      }
    }
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'cipher') {
      setCopiedCipher(true);
      setTimeout(() => setCopiedCipher(false), 2000);
    } else {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const inputLabel = mode === 'encrypt' ? 'PLAINTEXT' : 'CIPHERTEXT';
  const actionLabel = mode === 'encrypt' ? 'ENCRYPT MESSAGE' : 'DECRYPT MESSAGE';

  return (
    <section id="lab" className="section lab-section">
      <div className="container">
        <div className="section-header">
          <div className="section-header-accent"></div>
          <h2 className="section-title">Laboratory Workspace</h2>
          <p className="section-subtitle">Interactive Encryption & Decryption Module</p>
        </div>

        <div className="lab-panel">
          <div className="lab-panel-header">
            <div className="lab-panel-title">
              <div className="lab-panel-title-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              AUTOKEY CIPHER LAB
            </div>
            
            <div className="lab-tabs">
              <button 
                className={`lab-tab ${mode === 'encrypt' ? 'active' : ''}`}
                onClick={() => { setMode('encrypt'); handleClear(); }}
              >
                ENCRYPT
              </button>
              <button 
                className={`lab-tab ${mode === 'decrypt' ? 'active' : ''}`}
                onClick={() => { setMode('decrypt'); handleClear(); }}
              >
                DECRYPT
              </button>
            </div>
          </div>

          <div className="lab-body">
            <div className="lab-grid">
              
              {/* Left Column: Input */}
              <div className="input-panel">
                {error && (
                  <div className="error-message">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {error}
                  </div>
                )}
                
                <div className="form-group">
                  <label className="form-label">{inputLabel}</label>
                  <textarea 
                    className="form-textarea"
                    placeholder={`Enter ${inputLabel.toLowerCase()} (A-Z only)...`}
                    value={input}
                    onChange={(e) => setInput(sanitizeInput(e.target.value))}
                    spellCheck="false"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">KEYWORD</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="Enter keyword (A-Z only)..."
                    value={keyword}
                    onChange={(e) => setKeyword(sanitizeInput(e.target.value))}
                    spellCheck="false"
                  />
                </div>

                <div className="input-panel-actions">
                  <button className="btn btn-primary" onClick={handleProcess}>
                    {actionLabel}
                  </button>
                  <button className="btn btn-ghost" onClick={handleClear}>
                    CLEAR
                  </button>
                </div>
              </div>

              {/* Right Column: Result */}
              <div className="result-panel">
                {result ? (
                  <>
                    <div className="result-panel-header">
                      <div className="result-panel-title">OPERATION SUCCESSFUL</div>
                      <div className="success-indicator">VERIFIED</div>
                    </div>

                    <div className="result-row">
                      <div className="result-row-label">Original Input</div>
                      <div className="result-row-value" style={{color: 'var(--text-secondary)'}}>
                        {mode === 'encrypt' ? result.plaintext : result.ciphertext}
                      </div>
                    </div>

                    <div className="result-row">
                      <div className="result-row-label">Autokey Stream</div>
                      <div className="result-row-value" style={{color: 'var(--text-violet)'}}>
                        {result.keyStream}
                      </div>
                    </div>

                    <div className="result-row">
                      <div className="result-row-label">Result ({mode === 'encrypt' ? 'Ciphertext' : 'Plaintext'})</div>
                      <div className={`result-row-value ${mode === 'encrypt' ? 'cipher-value cyan' : 'cipher-value blue'}`}>
                        {mode === 'encrypt' ? result.ciphertext : result.plaintext}
                      </div>
                    </div>

                    <div className="result-copy-row">
                      <button 
                        className={`copy-btn ${copiedCipher ? 'copied' : ''}`}
                        onClick={() => handleCopy(mode === 'encrypt' ? result.ciphertext : result.plaintext, 'cipher')}
                      >
                        {copiedCipher ? 'COPIED ✓' : `COPY ${mode === 'encrypt' ? 'CIPHERTEXT' : 'PLAINTEXT'}`}
                      </button>
                      <button 
                        className={`copy-btn ${copiedKey ? 'copied' : ''}`}
                        onClick={() => handleCopy(result.keyStream, 'key')}
                      >
                        {copiedKey ? 'COPIED ✓' : 'COPY KEY STREAM'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="lab-empty-state">
                    <div className="lab-empty-icon">⚗️</div>
                    <div className="lab-empty-text">Awaiting input for computation...</div>
                  </div>
                )}
              </div>

            </div>

            {/* Visualization Section */}
            {result && (
              <>
                <StepVisualization steps={result.steps} mode={mode} />
                <CalculationTable steps={result.steps} mode={mode} />
              </>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
