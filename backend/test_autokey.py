import unittest
import sys
import os

# Add root directory to path so backend can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.main import autokey_encrypt, autokey_decrypt

class TestAutokeyCipher(unittest.TestCase):
    def test_standard_example(self):
        # Standard Autokey example
        plaintext = "ATTACK"
        keyword = "KEY"
        enc = autokey_encrypt(plaintext, keyword)
        self.assertEqual(enc["keyStream"], "KEYATT")
        self.assertEqual(enc["ciphertext"], "KXRAVD")
        
        dec = autokey_decrypt(enc["ciphertext"], keyword)
        self.assertEqual(dec["keyStream"], "KEYATT")
        self.assertEqual(dec["plaintext"], "ATTACK")

    def test_step_by_step_encryption_fields(self):
        enc = autokey_encrypt("ATTACK", "KEY")
        self.assertEqual(len(enc["steps"]), 6)
        first_step = enc["steps"][0]
        self.assertEqual(first_step["position"], 1)
        self.assertEqual(first_step["plaintextChar"], "A")
        self.assertEqual(first_step["pVal"], 0)
        self.assertEqual(first_step["keyChar"], "K")
        self.assertEqual(first_step["kVal"], 10)
        self.assertEqual(first_step["cVal"], 10)
        self.assertEqual(first_step["cipherChar"], "K")
        self.assertEqual(first_step["formula"], "(0 + 10) mod 26 = 10")

    def test_step_by_step_decryption_fields(self):
        dec = autokey_decrypt("KXRAVD", "KEY")
        self.assertEqual(len(dec["steps"]), 6)
        first_step = dec["steps"][0]
        self.assertEqual(first_step["position"], 1)
        self.assertEqual(first_step["cipherChar"], "K")
        self.assertEqual(first_step["cVal"], 10)
        self.assertEqual(first_step["keyChar"], "K")
        self.assertEqual(first_step["kVal"], 10)
        self.assertEqual(first_step["pVal"], 0)
        self.assertEqual(first_step["plaintextChar"], "A")
        self.assertEqual(first_step["formula"], "(10 - 10 + 26) mod 26 = 0")

    def test_keyword_equal_length(self):
        enc = autokey_encrypt("HELLO", "WORLD")
        self.assertEqual(enc["keyStream"], "WORLD")
        self.assertEqual(enc["ciphertext"], "DSCWR")
        dec = autokey_decrypt(enc["ciphertext"], "WORLD")
        self.assertEqual(dec["plaintext"], "HELLO")

    def test_keyword_longer_than_plaintext(self):
        enc = autokey_encrypt("ATTACK", "SECRETKEY")
        self.assertEqual(enc["keyStream"], "SECRET")
        self.assertEqual(enc["ciphertext"], "SXVRGD")
        dec = autokey_decrypt(enc["ciphertext"], "SECRETKEY")
        self.assertEqual(dec["plaintext"], "ATTACK")

    def test_single_character(self):
        enc = autokey_encrypt("A", "K")
        self.assertEqual(enc["keyStream"], "K")
        self.assertEqual(enc["ciphertext"], "K")
        dec = autokey_decrypt("K", "K")
        self.assertEqual(dec["plaintext"], "A")

    def test_repeated_letters(self):
        enc = autokey_encrypt("AAAAAA", "A")
        self.assertEqual(enc["ciphertext"], "AAAAAA")
        dec = autokey_decrypt("AAAAAA", "A")
        self.assertEqual(dec["plaintext"], "AAAAAA")

    def test_case_and_symbol_preservation(self):
        enc = autokey_encrypt("Hello, World! 123", "key")
        dec = autokey_decrypt(enc["ciphertext"], "key")
        self.assertEqual(dec["plaintext"], "Hello, World! 123")

    def test_invalid_input(self):
        with self.assertRaises(ValueError):
            autokey_encrypt("", "KEY")
        with self.assertRaises(ValueError):
            autokey_encrypt("ATTACK", "")
        with self.assertRaises(ValueError):
            autokey_encrypt("12345", "KEY")
        with self.assertRaises(ValueError):
            autokey_decrypt("", "KEY")

if __name__ == "__main__":
    unittest.main()
