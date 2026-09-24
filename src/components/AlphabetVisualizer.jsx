import React from 'react';

export default function AlphabetVisualizer({ activePlainVal, activeKeyVal, activeResultVal, mode }) {
  const alphabet = Array.from({ length: 26 }, (_, i) => ({
    letter: String.fromCharCode(65 + i),
    value: i
  }));

  return (
    <div className="alphabet-viz-container">
      <div className="alphabet-viz-header">A-Z Modular Mapping</div>
      <div className="alphabet-grid">
        {alphabet.map((item) => {
          let classes = "alphabet-item ";
          if (item.value === activePlainVal) classes += mode === 'encrypt' ? "active-plain " : "active-result ";
          if (item.value === activeKeyVal) classes += "active-key ";
          if (item.value === activeResultVal) classes += mode === 'encrypt' ? "active-result " : "active-plain ";

          return (
            <div key={item.value} className={classes.trim()}>
              <div className="alphabet-letter">{item.letter}</div>
              <div className="alphabet-val">{item.value}</div>
            </div>
          );
        })}
      </div>
      <div className="alphabet-legend">
        <div className="legend-item"><span className="legend-dot plain-dot"></span> {mode === 'encrypt' ? 'Plaintext' : 'Recovered'}</div>
        <div className="legend-item"><span className="legend-dot key-dot"></span> Key</div>
        <div className="legend-item"><span className="legend-dot result-dot"></span> {mode === 'encrypt' ? 'Ciphertext' : 'Cipher Input'}</div>
      </div>
    </div>
  );
}
