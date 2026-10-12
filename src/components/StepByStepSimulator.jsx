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

  const startSimulation = (
    forceInput = null,
    forceKeyword = null,
    forceMode = null
  ) => {
    // Preserve spaces, numbers, and special characters in the message.
    const textToProcess = forceInput ?? input;

    // Keep the keyword restricted to English letters.
    const keyToProcess = sanitizeInput(forceKeyword ?? keyword);
    const processMode = forceMode ?? mode;

    if (!textToProcess.trim() || !keyToProcess) {
      setError('Please enter a message containing English letters and a keyword containing English letters.');
      return;
    }

    // Require at least one English letter in the message.
    if (!/[a-z]/i.test(textToProcess)) {
      setError('The message must contain at least one English letter.');
      return;
    }

    setError('');
    setIsPlaying(false);
    setIsFinished(false);

    try {
      const res =
        processMode === 'encrypt'
          ? encrypt(textToProcess, keyToProcess)
          : decrypt(textToProcess, keyToProcess);

      if (!res || !Array.isArray(res.steps) || res.steps.length === 0) {
        throw new Error(
          'The cipher returned no simulation steps. Please check autokeyCipher.js.'
        );
      }

      setResult(res);
      setActiveStep(0);
      setIsFinished(false);
      setIsPlaying(true);

      if (forceInput !== null) setInput(textToProcess);
      if (forceKeyword !== null) setKeyword(keyToProcess);
      if (forceMode !== null) setMode(processMode);

      setTimeout(() => {
        document
          .getElementById('simulation-workspace')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setResult(null);
      setError(err.message || 'Unable to start the simulation.');
    }
  };

  const handleDemo = () => {
    startSimulation('ATTACK', 'KEY', 'encrypt');
  };

  const verifyReverse = () => {
    if (!result) return;

    const reverseMode = mode === 'encrypt' ? 'decrypt' : 'encrypt';
    const nextInput =
      mode === 'encrypt' ? result.ciphertext : result.plaintext;

    startSimulation(nextInput, result.keyword, reverseMode);
  };

  useEffect(() => {
    if (isPlaying && result && activeStep < result.steps.length - 1) {
      const delay = 2000 / speed;

      timerRef.current = setTimeout(() => {
        setActiveStep((prev) => prev + 1);
      }, delay);
    } else if (
      result &&
      activeStep >= result.steps.length - 1
    ) {
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
      return 'The Autokey Cipher combines each English plaintext letter with the corresponding letter from the dynamically generated key stream. Spaces, numbers, and special characters remain unchanged and do not consume key-stream letters.';
    }

    return 'Each English ciphertext letter is combined with the corresponding key-stream letter using subtraction modulo 26. The recovered plaintext letters extend the key stream. Spaces, numbers, and special characters remain unchanged.';
  };

  return (
    <section id="simulator" className="section simulator-section">
      <div className="container">
        <div className="section-header">
          <div className="section-header-accent"></div>
          <h2 className="section-title">
            Interactive Step-by-Step Simulator
          </h2>
          <p className="section-subtitle">
            Visually understand the Autokey Cipher character-by-character.
          </p>
        </div>

        <div className="sim-layout">
          <div className="sim-input-panel glass-panel">
            <h3 className="sim-input-title">
              Simulator Configuration
            </h3>

            <p className="sim-input-desc">
              Enter a message and keyword to watch the Autokey Cipher
              execute one character at a time. Spaces, numbers, and
              special characters are preserved.
            </p>

            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Mode</label>

              <div
                className="lab-tabs"
                style={{ marginBottom: '1rem' }}
              >
                <button
                  type="button"
                  className={`lab-tab ${
                    mode === 'encrypt' ? 'active' : ''
                  }`}
                  onClick={() => setMode('encrypt')}
                >
                  ENCRYPTION
                </button>

                <button
                  type="button"
                  className={`lab-tab ${
                    mode === 'decrypt' ? 'active' : ''
                  }`}
                  onClick={() => setMode('decrypt')}
                >
                  DECRYPTION
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                {mode === 'encrypt' ? 'PLAINTEXT' : 'CIPHERTEXT'}
              </label>

              <input
                type="text"
                className="form-input"
                placeholder={`Enter ${
                  mode === 'encrypt' ? 'plaintext' : 'ciphertext'
                } (letters, numbers, and symbols allowed)...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
              />
            </div>

            <div className="form-group">
              <label className="form-label">KEYWORD</label>

              <input
                type="text"
                className="form-input"
                placeholder="Enter keyword (English letters only)..."
                value={keyword}
                onChange={(e) =>
                  setKeyword(sanitizeInput(e.target.value))
                }
                spellCheck={false}
              />
            </div>

            <div className="sim-input-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => startSimulation()}
              >
                START SIMULATION
              </button>

              <button
                type="button"
                className="btn btn-ghost"
                onClick={handleReset}
              >
                RESET
              </button>
            </div>

            <div className="sim-demo-wrapper">
              <div className="sim-divider">
                <span>OR</span>
              </div>

              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: '100%' }}
                onClick={handleDemo}
              >
                TRY DEMO
              </button>
            </div>
          </div>

          <AlgorithmSummary />
        </div>

        {result && result.steps.length > 0 && (
          <div
            id="simulation-workspace"
            className="sim-workspace glass-panel"
          >
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
                  handlePrev={() => {
                    setActiveStep((prev) => Math.max(0, prev - 1));
                    setIsFinished(false);
                  }}
                  handleNext={() => {
                    if (activeStep < result.steps.length - 1) {
                      setActiveStep((prev) => prev + 1);
                      setIsFinished(false);
                    } else {
                      setIsFinished(true);
                      setIsPlaying(false);
                    }
                  }}
                  handleRestart={() => {
                    setActiveStep(0);
                    setIsFinished(false);
                    setIsPlaying(true);
                  }}
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
                  activeResultVal={
                    result.steps[activeStep]?.cVal ??
                    result.steps[activeStep]?.pVal
                  }
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
              <h3
                className="sim-section-subtitle"
                style={{
                  color: '#fff',
                  marginBottom: '1rem',
                  borderBottom: '1px solid var(--glass-border)',
                  paddingBottom: '0.5rem',
                }}
              >
                Live Table Synchronization
              </h3>

              <CalculationTable
                steps={result.steps.slice(0, activeStep + 1)}
                mode={mode}
              />
            </div>

            <SimulationPipeline
              activeStepIndex={activeStep}
              isFinished={isFinished}
            />
          </div>
        )}
      </div>
    </section>
  );
}
