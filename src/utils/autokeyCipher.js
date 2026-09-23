/**
 * autokeyCipher.js
 * Core cryptographic implementation for the Autokey Cipher algorithm.
 * All cryptographic logic is centralized here, separate from UI components.
 */

/**
 * Sanitizes input: converts to uppercase, removes non-alpha characters.
 */
export function sanitizeInput(text) {
  return text.toUpperCase().replace(/[^A-Z]/g, '');
}

/**
 * Encrypts plaintext using the Autokey Cipher.
 * @param {string} plaintext - The plaintext to encrypt (A-Z only).
 * @param {string} keyword - The keyword to start the key stream.
 * @returns {{ ciphertext: string, keyStream: string, steps: Array }}
 */
export function encrypt(plaintext, keyword) {
  const P = sanitizeInput(plaintext);
  const K = sanitizeInput(keyword);

  if (!P || !K) {
    throw new Error('Plaintext and keyword must contain at least one alphabetic character.');
  }

  // Build the full key stream: keyword + plaintext (only as many chars as needed)
  const keyStream = (K + P).substring(0, P.length);
  let ciphertext = '';
  const steps = [];

  for (let i = 0; i < P.length; i++) {
    const pVal = P.charCodeAt(i) - 65;
    const kVal = keyStream.charCodeAt(i) - 65;
    const cVal = (pVal + kVal) % 26;
    const cChar = String.fromCharCode(cVal + 65);
    ciphertext += cChar;

    steps.push({
      position: i + 1,
      plaintextChar: P[i],
      keyChar: keyStream[i],
      pVal,
      kVal,
      formula: `(${pVal} + ${kVal}) mod 26 = ${cVal}`,
      cipherChar: cChar,
      mode: 'encrypt',
    });
  }

  return { ciphertext, keyStream, steps, plaintext: P, keyword: K };
}

/**
 * Decrypts ciphertext using the Autokey Cipher.
 * @param {string} ciphertext - The ciphertext to decrypt (A-Z only).
 * @param {string} keyword - The keyword used during encryption.
 * @returns {{ plaintext: string, keyStream: string, steps: Array }}
 */
export function decrypt(ciphertext, keyword) {
  const C = sanitizeInput(ciphertext);
  const K = sanitizeInput(keyword);

  if (!C || !K) {
    throw new Error('Ciphertext and keyword must contain at least one alphabetic character.');
  }

  let keyStream = K;
  let plaintext = '';
  const steps = [];

  for (let i = 0; i < C.length; i++) {
    const cVal = C.charCodeAt(i) - 65;
    const kChar = keyStream[i];
    const kVal = kChar.charCodeAt(0) - 65;
    const pVal = ((cVal - kVal) + 26) % 26;
    const pChar = String.fromCharCode(pVal + 65);
    plaintext += pChar;
    keyStream += pChar; // Extend keystream with recovered plaintext

    steps.push({
      position: i + 1,
      cipherChar: C[i],
      keyChar: kChar,
      cVal,
      kVal,
      formula: `(${cVal} - ${kVal} + 26) mod 26 = ${pVal}`,
      plaintextChar: pChar,
      keyStreamSoFar: keyStream,
      mode: 'decrypt',
    });
  }

  return { plaintext, keyStream, steps, ciphertext: C, keyword: K };
}

/**
 * Generates detailed step-by-step encryption data.
 * Same as encrypt but returns a more UI-friendly structure.
 */
export function generateEncryptionSteps(plaintext, keyword) {
  return encrypt(plaintext, keyword);
}

/**
 * Generates detailed step-by-step decryption data.
 */
export function generateDecryptionSteps(ciphertext, keyword) {
  return decrypt(ciphertext, keyword);
}

/**
 * Runs all built-in test cases.
 * Each test case encrypts, then decrypts, and verifies round-trip correctness.
 * @returns {Array<{ id, plaintext, keyword, expectedCiphertext, actualCiphertext, decryptedPlaintext, passed }>}
 */
export function runTestCases() {
  const testInputs = [
    { id: 1, plaintext: 'ATTACK', keyword: 'KEY' },
    { id: 2, plaintext: 'HELLO', keyword: 'KEY' },
    { id: 3, plaintext: 'CRYPTOGRAPHY', keyword: 'ABC' },
    { id: 4, plaintext: 'INFORMATION', keyword: 'SECRET' },
  ];

  return testInputs.map((tc) => {
    try {
      const encResult = encrypt(tc.plaintext, tc.keyword);
      const decResult = decrypt(encResult.ciphertext, tc.keyword);

      const passed = decResult.plaintext === sanitizeInput(tc.plaintext);

      return {
        ...tc,
        sanitizedPlaintext: sanitizeInput(tc.plaintext),
        keyStream: encResult.keyStream,
        ciphertext: encResult.ciphertext,
        decryptedPlaintext: decResult.plaintext,
        passed,
        error: null,
      };
    } catch (err) {
      return {
        ...tc,
        sanitizedPlaintext: sanitizeInput(tc.plaintext),
        keyStream: '',
        ciphertext: '',
        decryptedPlaintext: '',
        passed: false,
        error: err.message,
      };
    }
  });
}

/**
 * Returns a complete alphabet-to-value mapping for display.
 */
export function getAlphabetMap() {
  return Array.from({ length: 26 }, (_, i) => ({
    letter: String.fromCharCode(65 + i),
    value: i,
  }));
}
