
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Autokey Cipher API")

# CORS configuration for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------- HEALTH CHECK ----------------

@app.get("/api/health")
def read_root():
    return {
        "status": "ok",
        "message": "Backend is running!"
    }


# ---------------- REQUEST MODEL ----------------

class CipherRequest(BaseModel):
    text: str = Field(..., min_length=1)
    keyword: str = Field(..., min_length=1)


# ---------------- INPUT VALIDATION ----------------

def validate_keyword(keyword: str) -> str:
    """
    Keep only English letters from the keyword.
    """
    clean_keyword = "".join(
        char.upper()
        for char in keyword
        if char.isascii() and char.isalpha()
    )

    if not clean_keyword:
        raise ValueError(
            "Keyword must contain at least one English letter."
        )

    return clean_keyword


# ---------------- AUTOKEY ENCRYPTION ----------------

def autokey_encrypt(plaintext: str, keyword: str):
    K = validate_keyword(keyword)

    # Preserve spaces, digits, punctuation, and other characters.
    # Only English letters participate in the cipher.
    ciphertext = []
    steps = []
    key_stream = []
    letter_index = 0

    # Plaintext letters are used to extend the keyword.
    plaintext_letters = [
        char.upper()
        for char in plaintext
        if char.isascii() and char.isalpha()
    ]

    if not plaintext_letters:
        raise ValueError(
            "Plaintext must contain at least one English letter."
        )

    for position, char in enumerate(plaintext):
        if not (char.isascii() and char.isalpha()):
            ciphertext.append(char)
            continue

        p_char = char.upper()
        p_val = ord(p_char) - ord("A")

        # Use the keyword first, then plaintext letters.
        if letter_index < len(K):
            k_char = K[letter_index]
        else:
            k_char = plaintext_letters[
                letter_index - len(K)
            ]

        k_val = ord(k_char) - ord("A")
        c_val = (p_val + k_val) % 26
        c_char = chr(c_val + ord("A"))

        # Preserve the original letter case.
        if char.islower():
            c_char = c_char.lower()

        ciphertext.append(c_char)
        key_stream.append(k_char)

        steps.append({
            "position": position + 1,
            "plaintextChar": char,
            "keyChar": k_char,
            "pVal": p_val,
            "kVal": k_val,
            "cVal": c_val,
            "formula": f"({p_val} + {k_val}) mod 26 = {c_val}",
            "cipherChar": c_char,
            "mode": "encrypt"
        })

        letter_index += 1

    return {
        "ciphertext": "".join(ciphertext),
        "keyStream": "".join(key_stream),
        "steps": steps,
        "plaintext": plaintext,
        "keyword": K
    }


# ---------------- AUTOKEY DECRYPTION ----------------

def autokey_decrypt(ciphertext: str, keyword: str):
    K = validate_keyword(keyword)

    plaintext = []
    steps = []
    key_stream = []
    recovered_letters = []
    letter_index = 0

    ciphertext_letters = [
        char.upper()
        for char in ciphertext
        if char.isascii() and char.isalpha()
    ]

    if not ciphertext_letters:
        raise ValueError(
            "Ciphertext must contain at least one English letter."
        )

    for position, char in enumerate(ciphertext):
        if not (char.isascii() and char.isalpha()):
            plaintext.append(char)
            continue

        c_char = char.upper()
        c_val = ord(c_char) - ord("A")

        # Use the keyword first, then recovered plaintext.
        if letter_index < len(K):
            k_char = K[letter_index]
        else:
            k_char = recovered_letters[
                letter_index - len(K)
            ]

        k_val = ord(k_char) - ord("A")
        p_val = (c_val - k_val + 26) % 26
        p_char = chr(p_val + ord("A"))

        # Preserve the ciphertext letter's original case.
        if char.islower():
            p_char = p_char.lower()

        plaintext.append(p_char)
        recovered_letters.append(p_char.upper())
        key_stream.append(k_char)

        steps.append({
            "position": position + 1,
            "cipherChar": char,
            "keyChar": k_char,
            "cVal": c_val,
            "kVal": k_val,
            "pVal": p_val,
            "formula": f"({c_val} - {k_val} + 26) mod 26 = {p_val}",
            "plaintextChar": p_char,
            "keyStreamSoFar": "".join(key_stream),
            "mode": "decrypt"
        })

        letter_index += 1

    return {
        "plaintext": "".join(plaintext),
        "keyStream": "".join(key_stream),
        "steps": steps,
        "ciphertext": ciphertext,
        "keyword": K
    }


# ---------------- ENCRYPT ENDPOINT ----------------

@app.post("/api/encrypt")
def encrypt_endpoint(req: CipherRequest):
    try:
        return autokey_encrypt(req.text, req.keyword)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# ---------------- DECRYPT ENDPOINT ----------------

@app.post("/api/decrypt")
def decrypt_endpoint(req: CipherRequest):
    try:
        return autokey_decrypt(req.text, req.keyword)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
        
