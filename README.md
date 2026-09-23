# 🔐 CRYPTOLAB — Autokey Cipher Virtual Laboratory

**CRYPTOLAB** is an interactive virtual laboratory for demonstrating, visualizing, and analyzing the classical **Autokey Cipher** encryption algorithm. It provides step-by-step visual execution, real-time formula breakdowns, tabular calculation matrices, and automated test verification.

---

## ✨ Key Features

- **Interactive Workspace**: Encrypt & decrypt messages using custom keywords.
- **Step-by-Step Visualizer**: Character-by-character calculation animation with playback & speed controls.
- **Calculation Table**: Precise breakdown showing positions, ASCII values, modular arithmetic formulas ($P_i + K_i \pmod{26}$ & $C_i - K_i \pmod{26}$), and outputs.
- **Verification Suite**: Automated test suite for verifying algorithm correctness.
- **Hybrid Architecture**: Fast client-side JavaScript execution with a Python FastAPI REST backend.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Pure CSS (Cyberpunk dark mode UI)
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

---

## 📁 Project Structure

```
CRYPTOGRAPHY/
├── backend/                  # Python FastAPI Backend
│   ├── main.py               # API routes (/api/encrypt, /api/decrypt, /api/health)
│   └── requirements.txt      # FastAPI & Uvicorn dependencies
├── src/                      # React Frontend Source
│   ├── components/           # UI & Visualization components
│   ├── styles/               # Global styling & layout
│   └── utils/                # Client-side Autokey Cipher logic
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
  3. Select your repository `manoj008-cmd/Cryptography`.
  4. Render will automatically detect [`render.yaml`](file:///f:/CRYPTOGRAPHY/render.yaml) and configure the backend service!
- **Manual Web Service**:
  - **Root Directory**: `backend`
  - **Environment**: `Python 3`
  - **Build Command**: `pip install -r requirements.txt`
  - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

> Once deployed, copy your Render API URL (e.g. `https://cryptography-api.onrender.com`).

#### 2. Deploy React Frontend on Vercel
1. Log into [Vercel.com](https://vercel.com).
2. Click **Add New...** -> **Project** and import `manoj008-cmd/Cryptography`.
3. In [`vercel.json`](file:///f:/CRYPTOGRAPHY/vercel.json), replace `https://cryptography-api.onrender.com` with your active Render URL.
4. Click **Deploy**.

> **Offline / Sleeping Backend Fallback**: If the Render backend is sleeping or spinning up, the frontend automatically falls back to instant browser-side JavaScript calculation!



