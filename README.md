# 🔐 CRYPTOLAB — Autokey Cipher Virtual Laboratory

**🔗 [Live Website Demo (Sagar)](https://cryptography-rosy.vercel.app)** | **🔌 [Backend API (Sagar)](https://cryptography-26om.onrender.com/docs)**
**🔗 [Live Website Demo (Manoj)](https://cryptography-orpin-beta.vercel.app)** | **🔌 [Backend API (Manoj)](https://cryptography-eil9.onrender.com/docs)**

**CRYPTOLAB** is an advanced interactive virtual laboratory for demonstrating, visualizing, and analyzing the classical **Autokey Cipher** encryption algorithm. It is designed heavily for academic presentations and algorithmic deep-dives, providing a full character-by-character visual execution, real-time formula breakdowns, tabular calculation matrices, and automated test verification.

---

## ✨ Key Features

- **Interactive Step-by-Step Simulator (NEW)**: A dedicated simulator workspace that animates the Autokey cipher execution character-by-character. 
  - **Dynamic Key Stream Visualization**: Watch how the algorithm builds the key stream using either the Plaintext (during encryption) or the Recovered Plaintext (during decryption).
  - **A-Z Modular Mapping**: Live visual highlights of the $0-25$ alphabetical mapping for the active plaintext, key, and ciphertext values.
  - **Animated Calculation Cards**: View step-by-step formula execution: $(P_i + K_i) \pmod{26}$.
  - **Playback Controls**: Play, pause, skip, and alter simulation speeds ranging from 0.5x to 2x.
- **Laboratory Workspace**: Encrypt & decrypt complete messages instantly.
- **Live Calculation Table**: Precise breakdown showing positions, ASCII values, and mathematical outputs in an organized matrix.
- **Automated Verification Suite**: Built-in test suite automatically verifying algorithm correctness on page load.
- **Viva/Presentation Mode**: "Try Demo" functionality to auto-fill execution alongside an Algorithm Summary listing Time/Space Complexities ($O(n)$) for quick college presentations.
- **Hybrid Architecture**: Fast client-side JavaScript execution with a Python FastAPI REST backend fallback!

---

## 👨‍💻 Developers

Developed and maintained by:
- **[Manoj Kumar](https://github.com/manoj008-cmd)**
- **[Sagar S](https://github.com/Sagarspoojary)**

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Pure CSS (Cyberpunk dark mode UI / Glassmorphism)
- **Backend**: Python 3.10+, FastAPI, Uvicorn, Pydantic

---

## 🚀 How to Run

### 1. Start the Backend (FastAPI)

In your terminal, navigate to the `backend` directory and start the server:

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
> The API server will start at `http://localhost:8000`. You can view interactive API documentation at `http://localhost:8000/docs`.

---

### 2. Start the Frontend (React + Vite)

In a new terminal window, navigate to the root directory and start the Vite dev server:

```bash
npm install
npm run dev
```
> Open `http://localhost:5173` in your browser to access the lab workspace.

*(Note: The React frontend handles API fetching through the Vite proxy. If you port-forward the frontend to share with a friend, the frontend will automatically tunnel API requests securely to your backend!)*

---

## 📁 Project Structure

```text
CRYPTOGRAPHY/
├── backend/                  # Python FastAPI Backend
│   ├── main.py               # API routes (/api/encrypt, /api/decrypt, /api/health)
│   └── requirements.txt      # FastAPI & Uvicorn dependencies
├── src/                      # React Frontend Source
│   ├── components/           # UI & Visualization components (Simulator, Lab, etc.)
│   ├── styles/               # Global styling, layout, and simulator animations
│   └── utils/                # Core cryptography logic (autokeyCipher.js)
├── package.json              # NPM dependencies & scripts
├── vite.config.js            # Vite configuration with /api proxy
├── vercel.json               # Vercel deployment & API rewrite config
└── render.yaml               # Render Blueprint config for backend service
```

---

## 🌐 Deployment Guide

### 🚀 Frontend on Vercel + Backend on Render

#### 1. Deploy Python FastAPI Backend on Render
- **Automatic Blueprint**:
  1. Log into [Render.com](https://render.com).
  2. Click **New +** -> **Blueprint**.
  3. Select your repository `Sagarspoojary/Cryptography` (or `manoj008-cmd/Cryptography`).
  4. Render will automatically detect `render.yaml` and configure the backend service!

#### 2. Deploy React Frontend on Vercel
1. Log into [Vercel.com](https://vercel.com).
2. Click **Add New...** -> **Project** and import the repository.
3. In `vercel.json`, replace `https://cryptography-api.onrender.com` with your active Render URL (if applicable).
4. Click **Deploy**.

> **Offline / Sleeping Backend Fallback**: If the Render backend is sleeping or spinning up, the frontend automatically falls back to instant browser-side JavaScript calculation, ensuring the site never breaks for users!
