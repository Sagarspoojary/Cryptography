import React from 'react';

export default function SimulationTimeline({ steps, activeStepIndex, onStepClick }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="sim-timeline">
      <div className="sim-timeline-track"></div>
      <div className="sim-timeline-nodes">
        {steps.map((step, idx) => {
          const isCompleted = idx < activeStepIndex;
          const isActive = idx === activeStepIndex;
          
          return (
            <div 
              key={idx} 
              className={`sim-timeline-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
              onClick={() => onStepClick(idx)}
              title={`Step ${idx + 1}`}
            >
              <div className="sim-timeline-dot">
                {isCompleted ? '✓' : (idx + 1)}
              </div>
              <div className="sim-timeline-char">
                {step.mode === 'encrypt' ? step.plaintextChar : step.cipherChar}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
