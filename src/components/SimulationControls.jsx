import React from 'react';

export default function SimulationControls({ 
  isPlaying, 
  setIsPlaying, 
  handlePrev, 
  handleNext, 
  handleRestart, 
  speed, 
  setSpeed,
  isFinished,
  isStart
}) {
  return (
    <div className="sim-controls-wrapper">
      <div className="sim-playback-controls">
        <button className="btn btn-ghost" onClick={handlePrev} disabled={isStart}>
           ← PREVIOUS
        </button>
        <button 
          className={`btn ${isPlaying ? 'btn-danger' : 'btn-primary'}`} 
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={isFinished}
        >
          {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
        </button>
        <button className="btn btn-ghost" onClick={handleNext} disabled={isFinished}>
          NEXT →
        </button>
        <button className="btn btn-ghost" onClick={handleRestart}>
          ↻ RESTART
        </button>
      </div>
      
      <div className="sim-speed-controls">
        <span className="sim-speed-label">Speed:</span>
        {[0.5, 1, 1.5, 2].map(s => (
          <button 
            key={s}
            className={`sim-speed-btn ${speed === s ? 'active' : ''}`}
            onClick={() => setSpeed(s)}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}
