# Developer Portfolio

A clean, modern, and minimal developer portfolio built with React (Vite), Tailwind CSS, Framer Motion, and a Python Flask backend.

## Features ✨
- **Modern UI/UX**: Dark theme, glassmorphism, and minimal developer aesthetic.
- **Smooth Animations**: High-quality scroll and hover animations powered by Framer Motion.
- **Responsive Design**: fully adapted for devices of all sizes using Tailwind CSS.
- **Dynamic Content**: Data is driven by a Flask backend (`portfolio_data.json`).
- **Contact Form**: Functional contact form that saves messages to `messages.json` on the Flask server.

---

## 📂 Folder Structure

```
portfolio/
│
├── frontend/             # React (Vite) Frontend
│   ├── src/
│   │   ├── components/   # UI Components (Hero, About, Projects, etc.)
│   │   ├── App.jsx       # Main application layout
│   │   └── index.css     # Tailwind CSS entry point
│   ├── tailwind.config.js
│   ├── package.json
│   └── vite.config.js
│
└── backend/              # Python Flask Backend
    ├── app.py            # Flask server & endpoints
    ├── portfolio_data.json # Portfolio content source
    ├── requirements.txt  # Python dependencies
    └── messages.json     # Saved contact form messages (auto-generated)
```

---

## 🚀 Installation & Setup

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create open a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```bash
   python app.py
   ```
   *The backend will run on `http://localhost:10000`.*

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (including Tailwind CSS and Framer Motion):
   ```bash
   npm install
   ```
3. Set your backend URL in an `.env` file (if testing on another port, otherwise it defaults to 10000):
   ```env
   VITE_API_URL=http://localhost:10000
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

---

## 🌍 Deployment Guide

### Frontend Deployment (Vercel)
Vercel is highly recommended for Vite/React applications.
1. Create a GitHub repository and push your `Portfolio` folder.
2. Go to [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository.
4. Set the **Framework Preset** to `Vite`.
5. Set the **Root Directory** to `frontend`.
6. Add the Environment Variable `VITE_API_URL` pointing to your deployed backend URL.
7. Click **Deploy**.

### Backend Deployment (Render)
Render offers a free tier that is perfect for Flask applications.
1. Connect your GitHub repository to [Render](https://render.com/).
2. Create a new **Web Service**.
3. Set the **Root Directory** to `backend`.
4. Set the **Build Command** to:
   ```bash
   pip install -r requirements.txt
   ```
5. Set the **Start Command** to:
   ```bash
   gunicorn app:app
   ```
   *(Note: Add `gunicorn` to your `requirements.txt` if you deploy on Render)*
6. Ensure your Flask `CORS` is configured to accept requests from your Vercel frontend URL.
7. Click **Create Web Service**.

> **Note**: For persistent data like saving contact forms, Render's free tier spins down and uses an ephemeral file system. If you want permanent message storage, consider attaching a free Render PostgreSQL or SQLite volume, or switch the `/api/contact` endpoint to send you an email via SMTP.

---

Built with ❤️ by Ayushman Kar.