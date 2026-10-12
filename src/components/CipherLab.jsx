
import React, { useState } from 'react';
import CalculationTable from './CalculationTable';
import { encrypt, decrypt } from '../utils/autokeyCipher';

export default function CipherLab() {
  const [mode, setMode] = useState('encrypt');
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

    if (!input.trim()) {
      setError('Please enter a message.');
      return;
    }

    if (!keyword.trim() || !/[a-zA-Z]/.test(keyword)) {
      setError('Please enter a keyword containing English letters.');
      return;
    }

    try {
      // Use your deployed FastAPI backend URL.
      const BACKEND_URL = 'https://l3j132w3-8000.inc1.devtunnels.ms';

      const endpoint =
        mode === 'encrypt'
          ? `${BACKEND_URL}/api/encrypt`
          : `${BACKEND_URL}/api/decrypt`;

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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || data.error || `Server returned ${response.status}`
        );
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err) {
      console.error('Backend request failed:', err);

      setError(
        `Unable to process the message using the backend. ${err.message || 'Please check your backend connection.'}`
      );
    }
  };

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);

      if (type === 'cipher') {
        setCopiedCipher(true);
        setTimeout(() => setCopiedCipher(false), 2000);
      } else {
        setCopiedKey(true);
        setTimeout(() => setCopiedKey(false), 2000);
      }
    } catch {
      setError('Unable to copy. Please copy the result manually.');
    }
  };

  const inputLabel = mode === 'encrypt' ? 'PLAINTEXT' : 'CIPHERTEXT';
  const actionLabel =
    mode === 'encrypt' ? 'ENCRYPT MESSAGE' : 'DECRYPT MESSAGE';

  return (
    <section id="lab" className="section lab-section">
      <div className="container">
        <div className="section-header">
          <div className="section-header-accent"></div>
          <h2 className="section-title">Laboratory Workspace</h2>
          <p className="section-subtitle">
            Interactive Encryption &amp; Decryption Module
          </p>
        </div>

        <div className="lab-panel">
          <div className="lab-panel-header">
            <div className="lab-panel-title">
              <div className="lab-panel-title-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              AUTOKEY CIPHER LAB
            </div>

            <div className="lab-tabs">
              <button
                className={`lab-tab ${mode === 'encrypt' ? 'active' : ''}`}
                onClick={() => {
                  setMode('encrypt');
                  handleClear();
                }}
              >
                ENCRYPT
              </button>

              <button
                className={`lab-tab ${mode === 'decrypt' ? 'active' : ''}`}
                onClick={() => {
                  setMode('decrypt');
                  handleClear();
                }}
              >
                DECRYPT
              </button>
            </div>
          </div>

          <div className="lab-body">
            <div className="lab-grid">
              <div className="input-panel">
                {error && (
                  <div className="error-message" role="alert">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">{inputLabel}</label>

                  <textarea
                    className="form-textarea"
                    placeholder={`Enter ${inputLabel.toLowerCase()} (letters, numbers, symbols...)`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    spellCheck="false"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">KEYWORD</label>

                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter keyword (A-Z only)..."
                    value={keyword}
                    onChange={(e) =>
                      setKeyword(
                        e.target.value
                          .replace(/[^a-zA-Z]/g, '')
                          .toUpperCase()
                      )
                    }
                    spellCheck="false"
                  />
                </div>

                <div className="input-panel-actions">
                  <button
                    className="btn btn-primary"
                    onClick={handleProcess}
                  >
                    {actionLabel}
                  </button>

                  <button
                    className="btn btn-ghost"
                    onClick={handleClear}
                  >
                    CLEAR
                  </button>
                </div>
              </div>

              <div className="result-panel">
                {result ? (
                  <>
                    <div className="result-panel-header">
                      <div className="result-panel-title">
                        OPERATION SUCCESSFUL
                      </div>
                      <div className="success-indicator">VERIFIED</div>
                    </div>

                    <div className="result-row">
                      <div className="result-row-label">Original Input</div>
                      <div
                        className="result-row-value"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {mode === 'encrypt'
                          ? result.plaintext
                          : result.ciphertext}
                      </div>
                    </div>

                    <div className="result-row">
                      <div className="result-row-label">Autokey Stream</div>
                      <div
                        className="result-row-value"
                        style={{ color: 'var(--text-violet)' }}
                      >
                        {result.keyStream}
                      </div>
                    </div>

                    <div className="result-row">
                      <div className="result-row-label">
                        Result (
                        {mode === 'encrypt' ? 'Ciphertext' : 'Plaintext'})
                      </div>
                      <div
                        className={`result-row-value ${
                          mode === 'encrypt'
                            ? 'cipher-value cyan'
                            : 'cipher-value blue'
                        }`}
                      >
                        {mode === 'encrypt'
                          ? result.ciphertext
                          : result.plaintext}
                      </div>
                    </div>

                    <div className="result-copy-row">
                      <button
                        className={`copy-btn ${
                          copiedCipher ? 'copied' : ''
                        }`}
                        onClick={() =>
                          handleCopy(
                            mode === 'encrypt'
                              ? result.ciphertext
                              : result.plaintext,
                            'cipher'
                          )
                        }
                      >
                        {copiedCipher
                          ? 'COPIED ✓'
                          : `COPY ${
                              mode === 'encrypt'
                                ? 'CIPHERTEXT'
                                : 'PLAINTEXT'
                            }`}
                      </button>

                      <button
                        className={`copy-btn ${
                          copiedKey ? 'copied' : ''
                        }`}
                        onClick={() =>
                          handleCopy(result.keyStream, 'key')
                        }
                      >
                        {copiedKey ? 'COPIED ✓' : 'COPY KEY STREAM'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="lab-empty-state">
                    <div className="lab-empty-icon">⚗️</div>
                    <div className="lab-empty-text">
                      Awaiting input for computation...
                    </div>
                  </div>
                )}
              </div>
            </div>

            {result && (
              <CalculationTable steps={result.steps} mode={mode} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
