import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import BackToTop from './components/BackToTop';
import Chatbot from './components/Chatbot';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Loading animation
    document.body.classList.add('loaded');
  }, []);

  if (loading) {
    return <div className="loading-screen">Loading...</div>; // You can add a better loading screen
  }

  if (!data) {
    return <div className="error-screen">Failed to load data.</div>;
  }

  return (
    <div className="app-container">
      <Cursor />
      <Navbar name={data.name} />
      <Hero data={data} />
      <About data={data} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Experience experience={data.experience} />
      <Certifications certifications={data.certifications} />
      <Contact data={data} />
      <Footer data={data} />
      <BackToTop />
      <Chatbot />
    </div>
  );
}

export default App;
