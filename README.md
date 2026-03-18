<div align="center">
  <h1>🚀 Modern Developer Portfolio</h1>
  <p>A clean, minimal, and fully-responsive developer portfolio built with modern web technologies.</p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  </p>
</div>

---

## 📖 About The Project

This version of the portfolio is completely **serverless/client-side**, using a local data file for content and [Formspree](https://formspree.io/) for contact form submissions. It is designed to be easily customizable, blazingly fast, and visually stunning.

### ✨ Features

- 🎨 **Modern UI/UX**: Dark theme, glassmorphism, and minimal developer aesthetic.
- 💫 **Smooth Animations**: High-quality scroll and hover animations powered by Framer Motion.
- 📱 **Responsive Design**: Fully adapted for devices of all sizes using Tailwind CSS.
- ⚡ **Static Driven**: Content is managed via `src/data.js` for instant loading and easy maintenance.
- ✉️ **Contact Form**: Functional contact form powered by Formspree.

---

## 📂 Folder Structure

```txt
portfolio/
│
└── frontend/                   # React (Vite) Frontend
    ├── public/                 # Static assets (Images, Resume)
    ├── src/
    │   ├── components/         # UI Components (Hero, About, Projects, etc.)
    │   ├── assets/             # Images and Icons
    │   ├── App.jsx             # Main application layout
    │   ├── index.css           # Tailwind CSS entry point
    │   └── data.js             # 🎯 Portfolio content source (Edit this!)
    ├── tailwind.config.js      # Tailwind configuration
    ├── vite.config.js          # Vite configuration
    └── package.json            # Project dependencies
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1️⃣ Installation

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

### 2️⃣ Configuration

Set your Formspree ID in an `.env` file at the root of the `frontend` directory:

```env
VITE_FORMSPREE_ID=your_formspree_id_here
```
> **Note**: You can get your Formspree ID by creating a free form on [Formspree](https://formspree.io/).

### 3️⃣ Development Server

Start the Vite development server:

```bash
npm run dev
```
*The portfolio will now be running on `http://localhost:5173`.*

---

## 🛠️ Customization

Customizing this portfolio is incredibly straightforward! All of your personal information, skills, and projects are managed in a single file: **`src/data.js`**. 

Simply open the file and replace the placeholder content with your own details. The UI will automatically update to reflect your changes.

---

## 🌍 Deployment

**[Vercel](https://vercel.com/)** is highly recommended for hosting this Vite/React application.

### Deployment Steps:
1. Create a GitHub repository and push your `Portfolio` folder.
2. Go to Vercel and **Add New Project**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**
5. Root Directory: **`frontend`**
6. Environment Variables: Add `VITE_FORMSPREE_ID` and your Formspree ID.
7. Click **Deploy**! 🚀

---

<div align="center">
  <p>Built with ❤️ by Ayushman Kar.</p>
</div>