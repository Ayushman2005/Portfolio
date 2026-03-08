<div align="center">
  <h1>🚀 Ayushman Kar's Interactive Portfolio</h1>
  <p><strong>An intelligent and fully dynamic portfolio website built with React, Flask, and an embedded Local Large Language Model.</strong></p>
  
  <p>
    <img alt="Frontend Framework" src="https://img.shields.io/badge/Frontend-React%2B%20Vite-61DAFB?logo=react&logoColor=black&style=for-the-badge">
    <img alt="Backend Framework" src="https://img.shields.io/badge/Backend-Flask-000000?logo=flask&logoColor=white&style=for-the-badge">
    <img alt="AI Integration" src="https://img.shields.io/badge/AI-Ollama%20%28Llama3%29-FFFFFF?logo=ollama&logoColor=black&style=for-the-badge">
  </p>
</div>

<hr />

## 🌟 Overview

Welcome to the repository for my personal portfolio! This project is far from a standard static site. It's a dynamic, full-stack application that highlights my expertise as an **AI/ML Engineer & Full Stack Developer**.

Beyond showcasing my projects, skills, and certifications, this platform incorporates an **AI assistant powered by Ollama**. Visitors can chat with this assistant to learn more about my background, and I can conveniently update my information via an intuitive, authenticated **Admin Dashboard**.

## ✨ Key Features

- **🤖 AI Portfolio Assistant**: Features a chat window powered by a local instance of Ollama (`llama3`). It uses contextual data injection to accurately answer visitor questions about my resume, skills, and projects, ensuring no hallucinations.
- **🛠️ Integrated Admin Dashboard**: A protected `/login` and `/admin` panel that allows maintaining the portfolio seamlessly. I can upload new project images, add certifications, and update skills dynamically without touching the code.
- **💾 JSON-based Storage Engine**: No complex databases required! `portfolio_data.json` acts as a highly portable, lightweight storage system allowing easy migration and reading.
- **📱 Fully Responsive Design**: Built to offer a seamless user experience whether viewed on a desktop, tablet, or smartphone.
- **⚡ Optimized Development Environment**: Uses Vite for lightning-fast hot module replacement, properly proxying seamlessly to the Flask backend API.

## 🏗️ Technology Stack

### **Frontend**
- **React.js 18** (UI Components & State Management)
- **Vite** (Build Tool & Dev server)
- **React Router DOM** (Client-side routing)
- **Lucide React** (Modern iconography)
- **Axios** (API requests)

### **Backend**
- **Python 3** & **Flask** (API routing, Serving static media, Admin panel logic)
- **Werkzeug** (Secure file uploads for project images)
- **Requests** (Communicating with local Ollama instance)
- **Local JSON Storage** (`portfolio_data.json` for persistence)

### **AI Integration**
- **Ollama** running locally (utilizing the `llama3` model by default)

## 📁 Directory Structure

```text
Portfolio/
├── backend/
│   ├── static/images/        # User-uploaded project assets
│   ├── templates/            # HTML templates for admin & login panels
│   ├── app.py                # Main Flask application & API routes
│   ├── portfolio_data.json   # Flat-file JSON database
│   ├── requirements.txt      # Python dependencies
│   └── vercel.json           # Vercel deployment configuration
├── frontend/
│   ├── public/               # Public assets
│   ├── src/                  # React components, pages, context, and styles
│   ├── vite.config.js        # Vite config with API proxy definitions
│   └── package.json          # Node dependencies and scripts
└── README.md                 # Project documentation
```

## 🚀 Getting Started

Follow these steps to set up and run the application locally on your machine.

### Prerequisites

Ensure you have the following installed before proceeding:
- **Node.js**: v18+ (for running the React frontend)
- **Python**: v3.9+ (for the Flask backend)
- **Ollama**: [Download Ollama](https://ollama.com/download) to run the AI features.

### 1. Start the Local AI Model (Ollama)

First, verify Ollama is installed. Then, pull and run the `llama3` model in your terminal:
```bash
ollama run llama3
```
*Note: The model will run in the background. The Flask app expects it to be running on the default port `localhost:11434`.*

### 2. Set Up the Backend

Open a new terminal session, navigate to the `backend/` directory, and set up your environment:

```bash
cd backend

# (Optional but recommended) Create and activate a virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create an environment file defining your Admin credentials
# Create a .env file and add the following:
# SECRET_KEY=your_secret_key_here
# ADMIN_USERNAME=admin
# ADMIN_PASSWORD=password123

# Start the Flask development server
python app.py
```
*The backend should now be running on `http://localhost:5000`.*

### 3. Set Up the Frontend

Open another terminal session, navigate to the `frontend/` directory, and start the development server:

```bash
cd frontend

# Install Node modules
npm install

# Start the Vite development server
npm run dev
```

*The frontend should now be running securely with Vite, and API requests will be transparently proxied to your local Flask backend.*

## 🤝 Using the Admin Dashboard

To add a new project, skill, or certification:
1. Navigate to `/login` via your browser utilizing the local Vite port.
2. Enter the credentials you specified in your `backend/.env` file.
3. Access the `/admin` dashboard to easily add visual content and manage portfolio data.

***

<div align="center">
  <p>Built with ❤️ by <a href="mailto:karayushman736@gmail.com">Ayushman Kar</a></p>
  <p>Location: Bargarh, Odisha, India | Connect with me to build impactful solutions!</p>
</div>