import React, { useState, useEffect, useRef } from 'react';
import { encrypt, decrypt, sanitizeInput } from '../utils/autokeyCipher';
import SimulationControls from './SimulationControls';
import KeyStreamVisualizer from './KeyStreamVisualizer';
import CharacterCalculation from './CharacterCalculation';
import AlphabetVisualizer from './AlphabetVisualizer';
import SimulationTimeline from './SimulationTimeline';
import SimulationPipeline from './SimulationPipeline';
import SimulationResult from './SimulationResult';
import AlgorithmSummary from './AlgorithmSummary';
import CalculationTable from './CalculationTable';

export default function StepByStepSimulator() {
  const [mode, setMode] = useState('encrypt');
  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');
  
  const [result, setResult] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState('');

  const timerRef = useRef(null);

  const startSimulation = (forceInput = null, forceKeyword = null, forceMode = null) => {
    const textToProcess = sanitizeInput(forceInput ?? input);
    const keyToProcess = sanitizeInput(forceKeyword ?? keyword);
    const processMode = forceMode ?? mode;
    
    if (!textToProcess || !keyToProcess) {
      setError('Please enter both text and a keyword.');
      return;
    }
    setError('');

    try {
      const res = processMode === 'encrypt' ? encrypt(textToProcess, keyToProcess) : decrypt(textToProcess, keyToProcess);
      setResult(res);
      setActiveStep(0);
      setIsFinished(false);
      setIsPlaying(true);
      
      if (forceInput) setInput(textToProcess);
      if (forceKeyword) setKeyword(keyToProcess);
      if (forceMode) setMode(processMode);
      
      setTimeout(() => {
        document.getElementById('simulation-workspace')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDemo = () => {
    startSimulation('ATTACK', 'KEY', 'encrypt');
  };

  const verifyReverse = () => {
    if (!result) return;
    const reverseMode = mode === 'encrypt' ? 'decrypt' : 'encrypt';
    const nextInput = mode === 'encrypt' ? result.ciphertext : result.plaintext;
    startSimulation(nextInput, result.keyword, reverseMode);
  };

  useEffect(() => {
    if (isPlaying && result && activeStep < result.steps.length) {
      const baseDelay = 2000; 
      const delay = baseDelay / speed;
      
      timerRef.current = setTimeout(() => {
        if (activeStep < result.steps.length - 1) {
          setActiveStep(prev => prev + 1);
        } else {
          setIsFinished(true);
          setIsPlaying(false);
        }
      }, delay);
    } else if (activeStep >= (result?.steps?.length || 0)) {
       setIsFinished(true);
       setIsPlaying(false);
    }
    
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, activeStep, speed, result]);

  const handleReset = () => {
    setInput('');
    setKeyword('');
    setResult(null);
    setActiveStep(0);
    setIsPlaying(false);
    setIsFinished(false);
    setError('');
  };

  const getExplanation = () => {
    if (mode === 'encrypt') {
      return "The Autokey Cipher combines each plaintext character with the corresponding character from the dynamically generated key stream. The result is calculated modulo 26 to produce the ciphertext character.";
    }
    return "Each ciphertext character is combined with the corresponding key-stream character using subtraction modulo 26. The recovered plaintext is then used to extend the key stream.";
  };

  return (
    <section id="simulator" className="section simulator-section">
      <div className="container">
        <div className="section-header">
          <div className="section-header-accent"></div>
          <h2 className="section-title">Interactive Step-by-Step Simulator</h2>
          <p className="section-subtitle">Visually understand the Autokey Cipher character-by-character.</p>
        </div>

        <div className="sim-layout">
          <div className="sim-input-panel glass-panel">
            <h3 className="sim-input-title">Simulator Configuration</h3>
            <p className="sim-input-desc">Enter a plaintext and keyword to watch the Autokey Cipher execute one character at a time.</p>
            
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label className="form-label">Mode</label>
              <div className="lab-tabs" style={{marginBottom: '1rem'}}>
                <button 
                  className={`lab-tab ${mode === 'encrypt' ? 'active' : ''}`}
                  onClick={() => setMode('encrypt')}
                >
                  ENCRYPTION
                </button>
                <button 
                  className={`lab-tab ${mode === 'decrypt' ? 'active' : ''}`}
                  onClick={() => setMode('decrypt')}
                >
                  DECRYPTION
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{mode === 'encrypt' ? 'PLAINTEXT' : 'CIPHERTEXT'}</label>
              <input 
                type="text" 
                className="form-input"
                placeholder={`Enter ${mode === 'encrypt' ? 'plaintext' : 'ciphertext'}...`}
                value={input}
                onChange={(e) => setInput(sanitizeInput(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">KEYWORD</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="Enter keyword..."
                value={keyword}
                onChange={(e) => setKeyword(sanitizeInput(e.target.value))}
              />
            </div>

            <div className="sim-input-actions">
              <button className="btn btn-primary" onClick={() => startSimulation()}>START SIMULATION</button>
              <button className="btn btn-ghost" onClick={handleReset}>RESET</button>
            </div>
            
            <div className="sim-demo-wrapper">
              <div className="sim-divider"><span>OR</span></div>
              <button className="btn btn-secondary" style={{width: '100%'}} onClick={handleDemo}>TRY DEMO</button>
            </div>
          </div>

          <AlgorithmSummary />
        </div>

        {result && (
          <div id="simulation-workspace" className="sim-workspace glass-panel">
            
            <SimulationTimeline 
              steps={result.steps} 
              activeStepIndex={activeStep} 
              onStepClick={(idx) => {
                setActiveStep(idx);
                setIsPlaying(false);
                setIsFinished(idx === result.steps.length - 1);
              }}
            />

            <div className="sim-main-grid">
               <div className="sim-main-left">
                 <CharacterCalculation 
                    step={result.steps[activeStep]} 
                    activeStepIndex={activeStep}
                 />
                 <SimulationControls 
                   isPlaying={isPlaying}
                   setIsPlaying={setIsPlaying}
                   handlePrev={() => { setActiveStep(p => Math.max(0, p - 1)); setIsFinished(false); }}
                   handleNext={() => { 
                      if (activeStep < result.steps.length - 1) setActiveStep(p => p + 1);
                      else setIsFinished(true); 
                   }}
                   handleRestart={() => { setActiveStep(0); setIsFinished(false); setIsPlaying(true); }}
                   speed={speed}
                   setSpeed={setSpeed}
                   isFinished={isFinished}
                   isStart={activeStep === 0}
                 />
               </div>
               
               <div className="sim-main-right">
                  <KeyStreamVisualizer 
                    keyword={result.keyword}
                    steps={result.steps}
                    activeStepIndex={activeStep}
                    mode={mode}
                  />
                  <AlphabetVisualizer 
                    activePlainVal={result.steps[activeStep]?.pVal}
                    activeKeyVal={result.steps[activeStep]?.kVal}
                    activeResultVal={result.steps[activeStep]?.cVal}
                    mode={mode}
                  />
                  
                  <div className="sim-educational-card">
                    <h4>What just happened?</h4>
                    <p>{getExplanation()}</p>
                  </div>
               </div>
            </div>

            {isFinished && (
              <SimulationResult 
                mode={mode}
                result={result}
                onVerify={verifyReverse}
              />
            )}

            <div className="sim-table-sync-wrapper">
              <h3 className="sim-section-subtitle" style={{color: '#fff', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem'}}>Live Table Synchronization</h3>
              <CalculationTable steps={result.steps.slice(0, activeStep + 1)} mode={mode} />
            </div>

            <SimulationPipeline activeStepIndex={activeStep} isFinished={isFinished} />
          </div>
        )}
      </div>
    </section>
  );
}
