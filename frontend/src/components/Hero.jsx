import React, { useEffect, useRef } from 'react';

const Hero = ({ data }) => {
    const typewriterRef = useRef(null);

    useEffect(() => {
        // Scroll reveal
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach((element, index) => {
            setTimeout(() => {
                if (element) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            }, index * 100);
        });

        // Parallax
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-particles');

            parallaxElements.forEach(element => {
                if (element) {
                    const speed = 0.5;
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const roles = [
            { text: "Full Stack Developer", color: "#6366f1" },
            { text: "AI Engineer", color: "#8b5cf6" },
            { text: "ML Engineer", color: "#ec4899" },
            { text: "Hackathon Enthusiast", color: "#10b981" }
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 50;
        let timerId = null;

        const type = () => {
            if (!typewriterRef.current) return;

            const currentRole = roles[roleIndex];

            typewriterRef.current.style.color = currentRole.color;

            if (isDeleting) {
                typewriterRef.current.textContent = currentRole.text.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 30;
            } else {
                typewriterRef.current.textContent = currentRole.text.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 60;
            }

            if (!isDeleting && charIndex === currentRole.text.length) {
                isDeleting = true;
                typeSpeed = 1200;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 300;
            }

            timerId = setTimeout(type, typeSpeed);
        };

        // Start animation
        timerId = setTimeout(type, 100);

        return () => clearTimeout(timerId);
    }, []);

    return (
        <section id="home" className="hero">
            <div className="hero-particles"></div>
            <div className="container">
                <div className="hero-content">
                    <h1 className="hero-title fade-in" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                        <span className="wave">👋</span> Hi, I'm
                        <span className="gradient-text" style={{ marginLeft: '10px' }}>{data.name}</span>
                    </h1>
                    <p className="hero-subtitle fade-in" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                        <span id="typewriter" ref={typewriterRef}></span><span className="cursor-pipe">|</span>
                    </p>
                    <p className="hero-description fade-in" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                        {data.bio}
                    </p>
                    <div className="hero-buttons fade-in" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                        <a href="#contact" className="btn btn-primary">
                            <span>Get In Touch</span>
                            <i className="fas fa-arrow-right"></i>
                        </a>
                        <a href="#projects" className="btn btn-secondary">
                            <span>View Work</span>
                            <i className="fas fa-briefcase"></i>
                        </a>
                        <a href="/static/resume.pdf" className="btn btn-secondary" style={{ backgroundColor: '#10b981', color: 'white', borderColor: '#10b981' }} download="Ayushman_Kar_Resume.pdf" target="_blank" rel="noopener noreferrer">
                            <span>Resume</span>
                            <i className="fas fa-download"></i>
                        </a>
                    </div>
                    <div className="social-links fade-in" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                        <a href="https://github.com/Ayushman2005" className="social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/ayushman-kar-08370634b" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://x.com/AyushmanKa99409" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.facebook.com/ayushman.kar.3367" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                    </div>
                </div>
                <div className="hero-image fade-in" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                    <div className="image-container">
                        <div className="image-placeholder">
                            <img
                                src="/static/images/Profile.png"
                                alt="Profile Picture"
                                style={{
                                    width: '310px',
                                    height: '310px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <div className="floating-card card-1">
                            <i className="fas fa-laptop-code"></i>
                        </div>
                        <div className="floating-card card-2">
                            <i className="fas fa-database"></i>
                        </div>
                        <div className="floating-card card-3">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator">
                <span></span>
                <p>Scroll Down</p>
            </div>
        </section>
    );
};

export default Hero;
