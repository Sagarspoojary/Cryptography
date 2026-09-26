import React, { useState, useEffect } from 'react';

export default function StepVisualization({ steps, mode }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setActiveStepIndex(0);
    setIsPlaying(false);
    setShowAll(false);
  }, [steps]);

  useEffect(() => {
    let timer;
    if (isPlaying && activeStepIndex < steps.length - 1) {
      timer = setTimeout(() => {
        setActiveStepIndex(prev => prev + 1);
      }, 1500);
    } else if (isPlaying && activeStepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, activeStepIndex, steps.length]);

  if (!steps || steps.length === 0) return null;

  const currentStep = steps[activeStepIndex];

  return (
    <div className="viz-section">
      <div className="viz-panel">
        <div className="viz-header">
          <div className="viz-title">Step-by-Step Analysis</div>
          <div className="viz-controls">
            <button 
              className="btn btn-ghost" 
              onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
              disabled={activeStepIndex === 0 || isPlaying}
            >
              Previous
            </button>
            <button 
              className={`btn ${isPlaying ? 'btn-danger' : 'btn-secondary'}`}
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={activeStepIndex >= steps.length - 1 && !isPlaying}
            >
              {isPlaying ? 'Pause' : 'Play Animation'}
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setActiveStepIndex(Math.min(steps.length - 1, activeStepIndex + 1))}
              disabled={activeStepIndex === steps.length - 1 || isPlaying}
            >
              Next
            </button>
            <button 
              className="btn btn-ghost"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Single Step' : 'Show All Steps'}
            </button>
          </div>
        </div>

        {!showAll ? (
          <div className="step-card active-step">
            <div className="step-card-header">
              <span className="step-position-badge">POSITION {currentStep.position}</span>
            </div>

            {mode === 'encrypt' ? (
              <div className="step-grid">
                <div className="step-cell">
                  <div className="step-cell-label">Plaintext</div>
                  <div className="step-cell-value blue">{currentStep.plaintextChar}</div>
                  <div className="step-cell-label" style={{marginTop: '8px'}}>Value: {currentStep.pVal}</div>
                </div>
                
                <div className="step-cell">
                  <div className="step-cell-label">Key Stream</div>
                  <div className="step-cell-value violet">{currentStep.keyChar}</div>
                  <div className="step-cell-label" style={{marginTop: '8px'}}>Value: {currentStep.kVal}</div>
                </div>

                <div className="step-cell" style={{gridColumn: '1 / -1'}}>
                  <div className="step-formula-box">
                    <div className="step-formula-label">Calculation</div>
                    <div className="step-formula-value">{currentStep.formula}</div>
                  </div>
                </div>

                <div className="step-cell" style={{gridColumn: '1 / -1', background: 'rgba(255, 115, 0, 0.1)'}}>
                  <div className="step-cell-label">Ciphertext</div>
                  <div className="step-cell-value cyan">{currentStep.cipherChar}</div>
                </div>
              </div>
            ) : (
              <div className="step-grid">
                <div className="step-cell">
                  <div className="step-cell-label">Ciphertext</div>
                  <div className="step-cell-value cyan">{currentStep.cipherChar}</div>
                  <div className="step-cell-label" style={{marginTop: '8px'}}>Value: {currentStep.cVal}</div>
                </div>
                
                <div className="step-cell">
                  <div className="step-cell-label">Key Stream</div>
                  <div className="step-cell-value violet">{currentStep.keyChar}</div>
                  <div className="step-cell-label" style={{marginTop: '8px'}}>Value: {currentStep.kVal}</div>
                </div>

                <div className="step-cell" style={{gridColumn: '1 / -1'}}>
                  <div className="step-formula-box">
                    <div className="step-formula-label">Calculation</div>
                    <div className="step-formula-value">{currentStep.formula}</div>
                  </div>
                </div>

                <div className="step-cell" style={{gridColumn: '1 / -1', background: 'rgba(249, 115, 22, 0.1)'}}>
                  <div className="step-cell-label">Recovered Plaintext</div>
                  <div className="step-cell-value blue">{currentStep.plaintextChar}</div>
                  <div className="step-cell-label" style={{marginTop: '8px'}}>Extends key: {currentStep.keyStreamSoFar}</div>
                </div>
              </div>
            )}

            <div className="viz-progress">
              <div className="viz-progress-dots">
                {steps.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`viz-dot ${idx === activeStepIndex ? 'active' : ''} ${idx < activeStepIndex ? 'visited' : ''}`}
                    onClick={() => {
                      setActiveStepIndex(idx);
                      setIsPlaying(false);
                    }}
                    title={`Step ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="viz-counter">
                {activeStepIndex + 1} / {steps.length}
              </div>
            </div>
          </div>
        ) : (
          <div className="steps-all-grid">
            {steps.map((step, idx) => (
              <div key={idx} className="step-mini-card">
                <div className="step-mini-header">POS {step.position}</div>
                {mode === 'encrypt' ? (
                  <>
                    <div className="step-mini-chars">
                      <span className="cipher-value blue" style={{fontSize: '1rem'}}>{step.plaintextChar}</span>
                      <span style={{color: 'var(--text-muted)'}}>+</span>
                      <span className="cipher-value violet" style={{fontSize: '1rem'}}>{step.keyChar}</span>
                      <span style={{color: 'var(--text-muted)'}}>→</span>
                      <span className="cipher-value cyan" style={{fontSize: '1.2rem'}}>{step.cipherChar}</span>
                    </div>
                    <div className="step-mini-formula">{step.formula}</div>
                  </>
                ) : (
                  <>
                    <div className="step-mini-chars">
                      <span className="cipher-value cyan" style={{fontSize: '1rem'}}>{step.cipherChar}</span>
                      <span style={{color: 'var(--text-muted)'}}>-</span>
                      <span className="cipher-value violet" style={{fontSize: '1rem'}}>{step.keyChar}</span>
                      <span style={{color: 'var(--text-muted)'}}>→</span>
                      <span className="cipher-value blue" style={{fontSize: '1.2rem'}}>{step.plaintextChar}</span>
                    </div>
                    <div className="step-mini-formula">{step.formula}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
