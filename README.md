# Developer Portfolio (Client-Side Only)

A clean, modern, and minimal developer portfolio built with React (Vite), Tailwind CSS, and Framer Motion. 

This version is completely serverless/client-side, using a local data file for content and Formspree for contact form submissions.

## Features ✨
- **Modern UI/UX**: Dark theme, glassmorphism, and minimal developer aesthetic.
- **Smooth Animations**: High-quality scroll and hover animations powered by Framer Motion.
- **Responsive Design**: fully adapted for devices of all sizes using Tailwind CSS.
- **Static Driven**: Content is managed via `src/data.js` for instant loading and easy maintenance.
- **Contact Form**: Functional contact form powered by Formspree.

---

## 📂 Folder Structure

```
portfolio/
│
└── frontend/             # React (Vite) Frontend
    ├── public/           # Static assets (Images, Resume)
    ├── src/
    │   ├── components/   # UI Components (Hero, About, Projects, etc.)
    │   ├── data.js       # Portfolio content source (Edit this!)
    │   ├── App.jsx       # Main application layout
    │   └── index.css     # Tailwind CSS entry point
    ├── tailwind.config.js
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Installation & Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your Formspree ID in an `.env` file:
   ```env
   VITE_FORMSPREE_ID=your_id_here
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The portfolio will run on `http://localhost:5173`.*

---

## 🌍 Deployment (Vercel)

Vercel is highly recommended for this Vite/React application.
1. Create a GitHub repository and push your `Portfolio` folder.
2. Go to [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository.
4. Set the **Framework Preset** to `Vite`.
5. Set the **Root Directory** to `frontend`.
6. Add the Environment Variable `VITE_FORMSPREE_ID`.
7. Click **Deploy**.

---

Built with ❤️ by Ayushman Kar.