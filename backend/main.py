from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS so that the React frontend can make requests to this backend during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/api/health")
def read_root():
    return {"status": "ok", "message": "Backend is running!"}

from pydantic import BaseModel
import re

class CipherRequest(BaseModel):
    text: str
    keyword: str

def sanitize_input(text: str) -> str:
    return re.sub(r'[^A-Z]', '', text.upper())

def autokey_encrypt(plaintext: str, keyword: str):
    P = sanitize_input(plaintext)
    K = sanitize_input(keyword)

    if not P or not K:
        raise ValueError("Plaintext and keyword must contain at least one alphabetic character.")

    key_stream = (K + P)[:len(P)]
    ciphertext = ""
    steps = []

    for i in range(len(P)):
        p_val = ord(P[i]) - ord('A')
        k_val = ord(key_stream[i]) - ord('A')
        c_val = (p_val + k_val) % 26
        c_char = chr(c_val + ord('A'))
        ciphertext += c_char

        steps.append({
            "position": i + 1,
            "plaintextChar": P[i],
            "keyChar": key_stream[i],
            "pVal": p_val,
            "kVal": k_val,
            "formula": f"({p_val} + {k_val}) mod 26 = {c_val}",
            "cipherChar": c_char,
            "mode": "encrypt"
        })

    return {
        "ciphertext": ciphertext,
        "keyStream": key_stream,
        "steps": steps,
        "plaintext": P,
        "keyword": K
    }

def autokey_decrypt(ciphertext: str, keyword: str):
    C = sanitize_input(ciphertext)
    K = sanitize_input(keyword)

    if not C or not K:
        raise ValueError("Ciphertext and keyword must contain at least one alphabetic character.")

    key_stream = K
    plaintext = ""
    steps = []

    for i in range(len(C)):
        c_val = ord(C[i]) - ord('A')
        k_char = key_stream[i]
        k_val = ord(k_char) - ord('A')
        p_val = (c_val - k_val + 26) % 26
        p_char = chr(p_val + ord('A'))
        plaintext += p_char
        key_stream += p_char

        steps.append({
            "position": i + 1,
            "cipherChar": C[i],
            "keyChar": k_char,
            "cVal": c_val,
            "kVal": k_val,
            "formula": f"({c_val} - {k_val} + 26) mod 26 = {p_val}",
            "plaintextChar": p_char,
            "keyStreamSoFar": key_stream,
            "mode": "decrypt"
        })

    return {
        "plaintext": plaintext,
        "keyStream": key_stream[:len(C)],
        "steps": steps,
        "ciphertext": C,
        "keyword": K
    }

@app.post("/api/encrypt")
def encrypt_endpoint(req: CipherRequest):
    try:
        return autokey_encrypt(req.text, req.keyword)
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/decrypt")
def decrypt_endpoint(req: CipherRequest):
    try:
        return autokey_decrypt(req.text, req.keyword)
    except Exception as e:
        return {"error": str(e)}
