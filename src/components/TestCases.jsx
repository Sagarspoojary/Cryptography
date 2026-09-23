import React, { useState } from 'react';
import { runTestCases } from '../utils/autokeyCipher';

export default function TestCases() {
  const [results, setResults] = useState([]);
  const [hasRun, setHasRun] = useState(false);

  const handleRunTests = () => {
    const res = runTestCases();
    setResults(res);
    setHasRun(true);
  };

  const passCount = results.filter(r => r.passed).length;
  const failCount = results.filter(r => !r.passed).length;

  return (
    <section id="test-cases" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-header-accent"></div>
          <h2 className="section-title">Test Cases</h2>
          <p className="section-subtitle">Automated Verification Suite</p>
        </div>

        <div className="test-suite">
          <div className="test-header">
            <button className="btn btn-primary" onClick={handleRunTests}>
              {hasRun ? 'RE-RUN ALL TESTS' : 'RUN ALL TESTS'}
            </button>

            {hasRun && (
              <div className="test-summary">
                <div className="test-stat pass">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Tests Passed: {passCount}
                </div>
                {failCount > 0 && (
                  <div className="test-stat fail">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    Tests Failed: {failCount}
                  </div>
                )}
              </div>
            )}
          </div>

          {hasRun && (
            <div className="test-list">
              {results.map(test => (
                <div key={test.id} className="test-item animate-fade-in">
                  <div className="test-input-group">
                    <span className="test-label">Input</span>
                    <span className="test-val">{test.sanitizedPlaintext}</span>
                    <span className="test-label" style={{marginTop: '4px'}}>Keyword</span>
                    <span className="test-val key">{test.keyword}</span>
                  </div>
                  
                  <div className="test-input-group">
                    <span className="test-label">Generated Ciphertext</span>
                    <span className="test-val cipher">{test.ciphertext}</span>
                    <span className="test-label" style={{marginTop: '4px'}}>Decrypted Plaintext</span>
                    <span className="test-val">{test.decryptedPlaintext}</span>
                  </div>

                  {test.passed ? (
                    <div className="test-result-badge pass">PASS ✓</div>
                  ) : (
                    <div className="test-result-badge fail">FAIL ✕</div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {!hasRun && (
            <div className="lab-empty-state">
              <div className="lab-empty-icon" style={{fontSize: '2rem'}}>🧪</div>
              <div className="lab-empty-text">Click "Run All Tests" to verify the algorithm implementation.</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
