import React from 'react';

export default function CalculationTable({ steps, mode }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="table-section">
      <h3 className="section-title" style={{fontSize: '1.2rem', marginBottom: '1rem'}}>Complete Calculation Table</h3>
      <div className="table-wrapper">
        <table className="calc-table">
          <thead>
            {mode === 'encrypt' ? (
              <tr>
                <th>Position</th>
                <th>Plaintext (P)</th>
                <th>Key Stream (K)</th>
                <th>P Value</th>
                <th>K Value</th>
                <th>Formula</th>
                <th>Ciphertext (C)</th>
              </tr>
            ) : (
              <tr>
                <th>Position</th>
                <th>Ciphertext (C)</th>
                <th>Key Stream (K)</th>
                <th>C Value</th>
                <th>K Value</th>
                <th>Formula</th>
                <th>Plaintext (P)</th>
              </tr>
            )}
          </thead>
          <tbody>
            {mode === 'encrypt' ? (
              steps.map((step, idx) => (
                <tr key={idx}>
                  <td className="col-pos">{step.position}</td>
                  <td className="col-plain">{step.plaintextChar}</td>
                  <td className="col-key">{step.keyChar}</td>
                  <td className="col-pval">{step.pVal}</td>
                  <td className="col-kval">{step.kVal}</td>
                  <td className="col-formula">{step.formula}</td>
                  <td className="col-cipher">{step.cipherChar}</td>
                </tr>
              ))
            ) : (
              steps.map((step, idx) => (
                <tr key={idx}>
                  <td className="col-pos">{step.position}</td>
                  <td className="col-cipher">{step.cipherChar}</td>
                  <td className="col-key">{step.keyChar}</td>
                  <td className="col-pval">{step.cVal}</td>
                  <td className="col-kval">{step.kVal}</td>
                  <td className="col-formula">{step.formula}</td>
                  <td className="col-plain">{step.plaintextChar}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
