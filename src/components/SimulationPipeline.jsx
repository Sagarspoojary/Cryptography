import React from 'react';

export default function SimulationPipeline({ activeStepIndex, isFinished }) {
  const stages = [
    { id: 1, label: "USER INPUT" },
    { id: 2, label: "NORMALIZE TEXT" },
    { id: 3, label: "CONVERT LETTERS TO VALUES" },
    { id: 4, label: "GENERATE AUTOKEY STREAM" },
    { id: 5, label: "APPLY MOD 26 FORMULA" },
    { id: 6, label: "GENERATE OUTPUT" },
    { id: 7, label: "DISPLAY RESULT" }
  ];

  let currentStage = 1;
  if (activeStepIndex >= 0) currentStage = 4;
  if (isFinished) currentStage = 7;

  return (
    <div className="sim-pipeline">
      <h3 className="sim-pipeline-title">Complete Flow Visualization</h3>
      <div className="pipeline-container">
        {stages.map((stage, idx) => (
          <React.Fragment key={stage.id}>
            <div className={`pipeline-node ${stage.id <= currentStage ? 'active' : ''} ${stage.id === currentStage ? 'current' : ''}`}>
              {stage.label}
            </div>
            {idx < stages.length - 1 && (
              <div className={`pipeline-arrow ${stage.id < currentStage ? 'active' : ''}`}>
                ↓
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
