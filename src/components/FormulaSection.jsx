import React from 'react';
import { getAlphabetMap } from '../utils/autokeyCipher';

export default function FormulaSection() {
  const alphabetMap = getAlphabetMap();

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-header-accent"></div>
          <h2 className="section-title">Mathematical Foundation</h2>
          <p className="section-subtitle">Core Formulas & Alphabet Mapping</p>
        </div>

        <div className="formula-container">
          
          <div className="formula-box">
            <div className="formula-label">Encryption Formula</div>
            <div className="formula-math">C<sub>i</sub> = (P<sub>i</sub> + K<sub>i</sub>) <span>mod 26</span></div>
          </div>

          <div className="formula-box">
            <div className="formula-label">Decryption Formula</div>
            <div className="formula-math">P<sub>i</sub> = (C<sub>i</sub> - K<sub>i</sub> + <span>26</span>) <span>mod 26</span></div>
          </div>

          <div className="info-card">
            <div className="formula-label" style={{textAlign: 'center'}}>Alphabet Mapping (0-25)</div>
            <div className="alphabet-grid">
              {alphabetMap.map(item => (
                <div key={item.letter} className="alpha-cell">
                  <div className="alpha-letter">{item.letter}</div>
                  <div className="alpha-val">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="formula-legend">
              <div className="legend-item"><strong>C<sub>i</sub></strong> = Ciphertext character value</div>
              <div className="legend-item"><strong>P<sub>i</sub></strong> = Plaintext character value</div>
              <div className="legend-item"><strong>K<sub>i</sub></strong> = Key stream character value</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
