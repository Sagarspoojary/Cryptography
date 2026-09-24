import React, { useEffect, useState } from 'react';

export default function CharacterCalculation({ step, activeStepIndex }) {
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [activeStepIndex]);

  if (!step) return null;

  return (
    <div className="calc-card" key={key}>
      <div className="calc-card-header">
        STEP {step.position}
      </div>
      
      <div className="calc-card-body">
        {step.mode === 'encrypt' ? (
          <>
            <div className="calc-row anim-1">
              <span className="calc-label">Plaintext</span>
              <span className="calc-char blue">{step.plaintextChar}</span>
            </div>
            <div className="calc-row anim-2">
              <span className="calc-label">Value</span>
              <span className="calc-val">{step.pVal}</span>
            </div>
            
            <div className="calc-divider anim-3"></div>
            
            <div className="calc-row anim-3">
              <span className="calc-label">Key Character</span>
              <span className="calc-char violet">{step.keyChar}</span>
            </div>
            <div className="calc-row anim-4">
              <span className="calc-label">Key Value</span>
              <span className="calc-val">{step.kVal}</span>
            </div>
            
            <div className="calc-divider anim-5"></div>
            
            <div className="calc-row formula-row anim-5">
              <span className="calc-label">Formula</span>
              <span className="calc-formula">(P + K) mod 26</span>
            </div>
            <div className="calc-row anim-6">
              <span className="calc-label">Calculation</span>
              <span className="calc-calculation">({step.pVal} + {step.kVal}) mod 26 = {step.cVal}</span>
            </div>
            
            <div className="calc-result anim-7">
              <span className="calc-label">Ciphertext</span>
              <span className="calc-result-char cyan">{step.cipherChar}</span>
            </div>
          </>
        ) : (
          <>
            <div className="calc-row anim-1">
              <span className="calc-label">Ciphertext</span>
              <span className="calc-char cyan">{step.cipherChar}</span>
            </div>
            <div className="calc-row anim-2">
              <span className="calc-label">Value</span>
              <span className="calc-val">{step.cVal}</span>
            </div>
            
            <div className="calc-divider anim-3"></div>
            
            <div className="calc-row anim-3">
              <span className="calc-label">Key Character</span>
              <span className="calc-char violet">{step.keyChar}</span>
            </div>
            <div className="calc-row anim-4">
              <span className="calc-label">Key Value</span>
              <span className="calc-val">{step.kVal}</span>
            </div>
            
            <div className="calc-divider anim-5"></div>
            
            <div className="calc-row formula-row anim-5">
              <span className="calc-label">Formula</span>
              <span className="calc-formula">(C - K + 26) mod 26</span>
            </div>
            <div className="calc-row anim-6">
              <span className="calc-label">Calculation</span>
              <span className="calc-calculation">({step.cVal} - {step.kVal} + 26) mod 26 = {step.pVal ?? step.cVal}</span>
            </div>
            
            <div className="calc-result anim-7">
              <span className="calc-label">Recovered Plaintext</span>
              <span className="calc-result-char blue">{step.plaintextChar}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
