import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CipherLab from './components/CipherLab';
import StepByStepSimulator from './components/StepByStepSimulator';
import AlgorithmExplanation from './components/AlgorithmExplanation';
import FormulaSection from './components/FormulaSection';
import TestCases from './components/TestCases';
import Correctness from './components/Correctness';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

// Import CSS
import './styles/index.css';
import './styles/layout.css';
import './styles/lab.css';
import './styles/content.css';
import './styles/simulator.css';

function App() {
  return (
    <>
      <div className="background-canvas">
        {/* Animated background binary characters */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i} 
            className="binary-char" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `-${Math.random() * 20}s`,
              fontSize: `${8 + Math.random() * 10}px`
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={`p-${i}`} 
            className="particle" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 6}px`,
              height: `${2 + Math.random() * 6}px`,
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `-${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <Navbar />
      <Hero />
      <CipherLab />
      <StepByStepSimulator />
      <AlgorithmExplanation />
      <FormulaSection />
      <TestCases />
      <Correctness />
      <AboutSection />
      <Footer />
    </>
  );
}

export default App;
