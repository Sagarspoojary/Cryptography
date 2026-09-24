# 🔐 CRYPTOLAB — Autokey Cipher Virtual Laboratory

**🔗 [Live Website Demo](https://cryptography-rosy.vercel.app)** | **🔌 [Live API Documentation](https://cryptography-26om.onrender.com/docs)**

**CRYPTOLAB** is an advanced interactive virtual laboratory for demonstrating, visualizing, and analyzing the classical **Autokey Cipher** encryption algorithm. It is designed heavily for academic presentations and algorithmic deep-dives, providing a full character-by-character visual execution, real-time formula breakdowns, tabular calculation matrices, and automated test verification.

---

## 📖 How to Use the Application (User Guide)

Whether you are a student, teacher, or cryptography enthusiast, here is how to use the tools provided:

1. **The Laboratory Workspace:**
   - Navigate to the **Lab** tab.
   - Select either **Encrypt** or **Decrypt**.
   - Type your secret message (Plaintext/Ciphertext) and a Keyword.
   - Click **Process** to instantly generate the mathematical Calculation Table, showing exact ASCII conversions and modulo math formulas used to get the result.

2. **The Interactive Step-by-Step Simulator:**
   - Navigate to the **Simulator** tab.
   - Click the **TRY DEMO** button for an instant presentation-ready example, or enter custom text.
   - Use the **Playback Controls** (Play, Pause, Next, Speed) to watch the cipher execute exactly one character at a time.
   - Watch the **Key Stream Visualizer** automatically build the extended key using your plaintext!

3. **Algorithm Verification:**
   - Scroll to the **Test Cases** section to see automated unit tests that prove the math correctly reverses itself (Encryption -> Decryption = Original Text).

---

## 🧠 Codebase Architecture (Developer Guide)

This project uses a modern **Hybrid Architecture** with a React frontend and a Python backend. However, the frontend is smart enough to run local JS cryptography if the backend goes to sleep!

### 🎨 Frontend (React + Vite)
All frontend code is located inside the `src/` folder.
- **`src/App.jsx`**: The main entry point that organizes the page layout.
- **`src/components/`**: Contains all UI pieces.
  - `CipherLab.jsx`: The main calculator workspace.
  - `StepByStepSimulator.jsx`: The container for the interactive animation view.
  - `CalculationTable.jsx`: Renders the data grid of math formulas.
- **`src/utils/autokeyCipher.js`**: **This is the brain of the frontend!** It contains the raw JavaScript logic for the Autokey cipher (`encrypt()` and `decrypt()` functions). If you want to change how the math works, edit this file.
- **`src/styles/`**: Contains all CSS files for the Cyberpunk Glassmorphism theme.

### ⚙️ Backend (Python FastAPI)
All backend code is located inside the `backend/` folder.
- **`main.py`**: This sets up the REST API. It defines routes like `/api/encrypt` and `/api/decrypt`. It uses **Pydantic** to validate that incoming data is correct before calculating the cipher.
- **`requirements.txt`**: Lists the Python packages required (FastAPI, Uvicorn).

---

## 💻 Local Development Setup

If you want to run this project on your own computer, you will need two terminal windows.

### 1. Start the Backend API
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
> The local API will run at `http://localhost:8000`.

### 2. Start the Frontend UI
```bash
# In a new terminal window at the project root
npm install
npm run dev
```
> Open `http://localhost:5173` in your browser. (Vite will automatically proxy `/api` requests to your port 8000 backend thanks to the `vite.config.js` file!)

---

## 🌐 Deployment Configuration

This project is fully configured for continuous integration cloud deployment:
- **Frontend Hosting (Vercel)**: The `vercel.json` file automatically rewrites `/api` requests so they point directly to the live Render backend link instead of localhost.
- **Backend Hosting (Render)**: The `render.yaml` file acts as a Blueprint, telling Render exactly how to install Python, install requirements, and start the Uvicorn server automatically.

---

## 👨‍💻 Developers

Developed and maintained as an academic project by:
- **[Manoj Kumar](https://github.com/manoj008-cmd)**
- **[Sagar S](https://github.com/Sagarspoojary)**
