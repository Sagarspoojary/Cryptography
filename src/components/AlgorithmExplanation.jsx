import React from 'react';

export default function AlgorithmExplanation() {
  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-header-accent"></div>
          <h2 className="section-title">How Autokey Cipher Works</h2>
          <p className="section-subtitle">A step-by-step breakdown</p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">1</div>
            <h3 className="info-title">Alphabet Conversion</h3>
            <p className="info-desc">
              Convert the letters A-Z into numerical values from 0 to 25. 
              This allows us to perform modular arithmetic on the characters.
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">2</div>
            <h3 className="info-title">Key Initialization</h3>
            <p className="info-desc">
              Start with a given keyword. Unlike the Vigenère cipher which repeats the keyword, 
              the Autokey cipher extends the initial keyword with the plaintext itself.
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">3</div>
            <h3 className="info-title">Key Extension (Encryption)</h3>
            <p className="info-desc">
              During encryption, the key stream is formed by appending the original plaintext to the keyword.
              Key Stream = Keyword + Plaintext
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">4</div>
            <h3 className="info-title">Modular Addition</h3>
            <p className="info-desc">
              Add the numerical value of the plaintext character to the corresponding key stream character, 
              then apply modulo 26: <strong>C<sub>i</sub> = (P<sub>i</sub> + K<sub>i</sub>) mod 26</strong>
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">5</div>
            <h3 className="info-title">Decryption Process</h3>
            <p className="info-desc">
              To decrypt, subtract the key character from the ciphertext character: 
              <strong>P<sub>i</sub> = (C<sub>i</sub> - K<sub>i</sub>) mod 26</strong>. Add 26 before the modulo if the result is negative.
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">6</div>
            <h3 className="info-title">Key Recovery (Decryption)</h3>
            <p className="info-desc">
              Because the key stream was originally extended with the plaintext, 
              each recovered plaintext character is appended to the active key stream to decrypt the subsequent characters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
