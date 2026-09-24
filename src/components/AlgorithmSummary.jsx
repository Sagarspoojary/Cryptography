import React from 'react';

export default function AlgorithmSummary() {
  return (
    <div className="algo-summary-panel">
      <h3 className="algo-summary-title">Algorithm Summary</h3>
      
      <div className="algo-flow-mini">
        <span>Input</span>
        <span className="algo-arrow">↓</span>
        <span>Keyword</span>
        <span className="algo-arrow">↓</span>
        <span>Key Stream Generation</span>
        <span className="algo-arrow">↓</span>
        <span>Modular Arithmetic</span>
        <span className="algo-arrow">↓</span>
        <span>Ciphertext</span>
        <span className="algo-arrow">↓</span>
        <span>Verification</span>
      </div>

      <div className="algo-stats">
        <div className="algo-stat-item">
          <span className="algo-stat-label">Time Complexity:</span>
          <span className="algo-stat-value">O(n)</span>
        </div>
        <div className="algo-stat-item">
          <span className="algo-stat-label">Space Complexity:</span>
          <span className="algo-stat-value">O(n)</span>
        </div>
        <div className="algo-stat-item" style={{flexDirection: 'column', alignItems: 'flex-start'}}>
          <span className="algo-stat-label">Cipher Type:</span>
          <span className="algo-stat-value" style={{marginTop: '4px'}}>Classical Symmetric Polyalphabetic</span>
        </div>
      </div>
    </div>
  );
}
