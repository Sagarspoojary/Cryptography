import test from 'node:test';
import assert from 'node:assert/strict';
import { encrypt, decrypt, runTestCases } from '../src/utils/autokeyCipher.js';

test('Standard Autokey example: ATTACK with KEY', () => {
  const enc = encrypt('ATTACK', 'KEY');
  assert.equal(enc.ciphertext, 'KXRAVD');
  assert.equal(enc.keyStream, 'KEYATT');
  assert.equal(enc.steps.length, 6);

  // Validate step fields
  const s0 = enc.steps[0];
  assert.equal(s0.position, 1);
  assert.equal(s0.plaintextChar, 'A');
  assert.equal(s0.pVal, 0);
  assert.equal(s0.keyChar, 'K');
  assert.equal(s0.kVal, 10);
  assert.equal(s0.cVal, 10);
  assert.equal(s0.cipherChar, 'K');

  const dec = decrypt('KXRAVD', 'KEY');
  assert.equal(dec.plaintext, 'ATTACK');
  assert.equal(dec.keyStream, 'KEYATT');
  assert.equal(dec.steps.length, 6);

  const d0 = dec.steps[0];
  assert.equal(d0.position, 1);
  assert.equal(d0.cipherChar, 'K');
  assert.equal(d0.cVal, 10);
  assert.equal(d0.keyChar, 'K');
  assert.equal(d0.kVal, 10);
  assert.equal(d0.pVal, 0);
  assert.equal(d0.plaintextChar, 'A');
});

test('Keyword equal length to message', () => {
  const enc = encrypt('HELLO', 'WORLD');
  assert.equal(enc.keyStream, 'WORLD');
  assert.equal(enc.ciphertext, 'DSCWR');
  const dec = decrypt('DSCWR', 'WORLD');
  assert.equal(dec.plaintext, 'HELLO');
});

test('Keyword longer than message', () => {
  const enc = encrypt('ATTACK', 'SECRETKEY');
  assert.equal(enc.keyStream, 'SECRET');
  assert.equal(enc.ciphertext, 'SXVRGD');
  const dec = decrypt('SXVRGD', 'SECRETKEY');
  assert.equal(dec.plaintext, 'ATTACK');
});

test('Single character message', () => {
  const enc = encrypt('A', 'K');
  assert.equal(enc.ciphertext, 'K');
  const dec = decrypt('K', 'K');
  assert.equal(dec.plaintext, 'A');
});

test('Repeated characters', () => {
  const enc = encrypt('AAAAAA', 'A');
  assert.equal(enc.ciphertext, 'AAAAAA');
  const dec = decrypt('AAAAAA', 'A');
  assert.equal(dec.plaintext, 'AAAAAA');
});

test('Case and non-letter preservation', () => {
  const enc = encrypt('Hello, World! 123', 'KEY');
  const dec = decrypt(enc.ciphertext, 'KEY');
  assert.equal(dec.plaintext, 'Hello, World! 123');
});

test('Input validation errors', () => {
  assert.throws(() => encrypt('', 'KEY'), /Plaintext must contain at least one English letter/);
  assert.throws(() => encrypt('12345!@#', 'KEY'), /Plaintext must contain at least one English letter/);
  assert.throws(() => encrypt('ATTACK', ''), /Keyword must contain at least one English letter/);
  assert.throws(() => decrypt('', 'KEY'), /Ciphertext must contain at least one English letter/);
  assert.throws(() => decrypt('KXRAVD', ''), /Keyword must contain at least one English letter/);
});

test('All built-in test suite cases pass', () => {
  const testResults = runTestCases();
  assert.equal(testResults.length, 11);
  for (const t of testResults) {
    assert.equal(t.passed, true, `Test #${t.id} (${t.description}) failed`);
  }
});
