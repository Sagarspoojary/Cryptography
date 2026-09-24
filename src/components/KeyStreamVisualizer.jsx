import React from 'react';

export default function KeyStreamVisualizer({ keyword, steps, activeStepIndex, mode }) {
  if (!steps || steps.length === 0) return null;
  
  const textChars = steps.map(s => mode === 'encrypt' ? s.plaintextChar : s.cipherChar);
  const keyChars = steps.map(s => s.keyChar);
  
  // To visually show extension:
  const isKeyPhase = (idx) => idx < keyword.length;
  
  return (
    <div className="keystream-viz">
      <h3 className="keystream-viz-title">Autokey Stream Generation</h3>
      <p className="keystream-viz-desc">
        {mode === 'encrypt' 
          ? "The Autokey cipher starts with the keyword and then extends the key stream using plaintext characters."
          : "During decryption, recovered plaintext characters are used to extend the key stream for subsequent characters."}
      </p>
      
      <div className="keystream-board">
        <div className="keystream-row">
          <div className="keystream-label">Text</div>
          <div className="keystream-chars">
            {textChars.map((char, idx) => (
              <div key={`txt-${idx}`} className={`keystream-char ${idx === activeStepIndex ? 'active' : ''}`}>
                {char}
              </div>
            ))}
          </div>
        </div>
        
        <div className="keystream-divider"></div>
        
        <div className="keystream-row">
          <div className="keystream-label">Key</div>
          <div className="keystream-chars">
            {keyChars.map((char, idx) => (
              <div 
                key={`key-${idx}`} 
                className={`keystream-char key-char ${idx === activeStepIndex ? 'active-key' : ''} ${isKeyPhase(idx) ? 'from-keyword' : 'from-text'}`}
              >
                {char}
                <span className="keystream-source-label">
                   {isKeyPhase(idx) ? 'K' : (mode === 'encrypt' ? 'P' : 'R')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
