/**
 * autokeyCipher.js
 * Autokey Cipher with support for spaces, numbers,
 * punctuation, and other non-English-letter characters.
 *
 * Only ASCII English letters participate in the cipher.
 * Nonletters are preserved and do not consume key-stream letters.
 */

/**
 * Sanitizes keywords and other inputs that must contain only A-Z.
 */
export function sanitizeInput(text = '') {
  return String(text).toUpperCase().replace(/[^A-Z]/g, '');
}

/**
 * Checks whether a character is an English ASCII letter.
 */
function isEnglishLetter(char) {
  return /^[A-Za-z]$/.test(char);
}

/**
 * Encrypts plaintext using the Autokey Cipher.
 */
export function encrypt(plaintext, keyword) {
  const originalPlaintext = String(plaintext ?? '');
  const K = sanitizeInput(keyword);

  const plaintextLetters = [...originalPlaintext]
    .filter(isEnglishLetter)
    .map((char) => char.toUpperCase());

  if (plaintextLetters.length === 0) {
    throw new Error(
      'Plaintext must contain at least one English letter.'
    );
  }

  if (!K) {
    throw new Error(
      'Keyword must contain at least one English letter.'
    );
  }

  let ciphertext = '';
  let keyStream = '';
  const steps = [];
  let letterIndex = 0;

  for (let position = 0; position < originalPlaintext.length; position++) {
    const originalChar = originalPlaintext[position];

    // Preserve nonletters exactly as entered.
    if (!isEnglishLetter(originalChar)) {
      ciphertext += originalChar;
      continue;
    }

    const pChar = originalChar.toUpperCase();
    const pVal = pChar.charCodeAt(0) - 65;

    const kChar =
      letterIndex < K.length
        ? K[letterIndex]
        : plaintextLetters[letterIndex - K.length];

    const kVal = kChar.charCodeAt(0) - 65;
    const cVal = (pVal + kVal) % 26;

    let cChar = String.fromCharCode(cVal + 65);

    // Preserve the case of the original plaintext letter.
    if (originalChar >= 'a' && originalChar <= 'z') {
      cChar = cChar.toLowerCase();
    }

    ciphertext += cChar;
    keyStream += kChar;

    steps.push({
      position: position + 1,
      letterPosition: letterIndex + 1,
      plaintextChar: originalChar,
      keyChar: kChar,
      pVal,
      kVal,
      cVal,
      formula: `(${pVal} + ${kVal}) mod 26 = ${cVal}`,
      cipherChar: cChar,
      mode: 'encrypt',
    });

    letterIndex++;
  }

  return {
    ciphertext,
    keyStream,
    steps,
    plaintext: originalPlaintext,
    keyword: K,
  };
}

/**
 * Decrypts ciphertext using the Autokey Cipher.
 */
export function decrypt(ciphertext, keyword) {
  const originalCiphertext = String(ciphertext ?? '');
  const K = sanitizeInput(keyword);

  const ciphertextLetters = [...originalCiphertext]
    .filter(isEnglishLetter);

  if (ciphertextLetters.length === 0) {
    throw new Error(
      'Ciphertext must contain at least one English letter.'
    );
  }

  if (!K) {
    throw new Error(
      'Keyword must contain at least one English letter.'
    );
  }

  let plaintext = '';
  let keyStream = '';
  const steps = [];
  const recoveredLetters = [];
  let letterIndex = 0;

  for (let position = 0; position < originalCiphertext.length; position++) {
    const originalChar = originalCiphertext[position];

    // Preserve spaces, digits, punctuation, and other symbols.
    if (!isEnglishLetter(originalChar)) {
      plaintext += originalChar;
      continue;
    }

    const cChar = originalChar.toUpperCase();
    const cVal = cChar.charCodeAt(0) - 65;

    const kChar =
      letterIndex < K.length
        ? K[letterIndex]
        : recoveredLetters[letterIndex - K.length];

    const kVal = kChar.charCodeAt(0) - 65;
    const pVal = (cVal - kVal + 26) % 26;

    let pChar = String.fromCharCode(pVal + 65);

    // Preserve the case of the original ciphertext letter.
    if (originalChar >= 'a' && originalChar <= 'z') {
      pChar = pChar.toLowerCase();
    }

    plaintext += pChar;
    recoveredLetters.push(pChar.toUpperCase());
    keyStream += kChar;

    steps.push({
      position: position + 1,
      letterPosition: letterIndex + 1,
      cipherChar: originalChar,
      keyChar: kChar,
      cVal,
      kVal,
      pVal,
      formula: `(${cVal} - ${kVal} + 26) mod 26 = ${pVal}`,
      plaintextChar: pChar,
      keyStreamSoFar: keyStream,
      mode: 'decrypt',
    });

    letterIndex++;
  }

  return {
    plaintext,
    keyStream,
    steps,
    ciphertext: originalCiphertext,
    keyword: K,
  };
}

/**
 * Generates detailed step-by-step encryption data.
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
 * Runs built-in round-trip tests.
 */
export function runTestCases() {
  const testInputs = [
    { id: 1, plaintext: 'ATTACK', keyword: 'KEY' },
    { id: 2, plaintext: 'HELLO', keyword: 'KEY' },
    { id: 3, plaintext: 'CRYPTOGRAPHY', keyword: 'ABC' },
    { id: 4, plaintext: 'INFORMATION', keyword: 'SECRET' },
    { id: 5, plaintext: 'Hello@123!', keyword: 'KEY' },
    { id: 6, plaintext: 'Meet me at 5:30 PM!', keyword: 'CODE' },
  ];

  return testInputs.map((tc) => {
    try {
      const encResult = encrypt(tc.plaintext, tc.keyword);
      const decResult = decrypt(encResult.ciphertext, tc.keyword);

      const passed = decResult.plaintext === tc.plaintext;

      return {
        ...tc,
        sanitizedPlaintext: tc.plaintext,
        keyStream: encResult.keyStream,
        ciphertext: encResult.ciphertext,
        decryptedPlaintext: decResult.plaintext,
        passed,
        error: null,
      };
    } catch (err) {
      return {
        ...tc,
        sanitizedPlaintext: tc.plaintext,
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
 * Returns the alphabet-to-value mapping.
 */
export function getAlphabetMap() {
  return Array.from({ length: 26 }, (_, i) => ({
    letter: String.fromCharCode(65 + i),
    value: i,
  }));
}
