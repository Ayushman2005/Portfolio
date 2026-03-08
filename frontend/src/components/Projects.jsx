import React, { useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

const Projects = ({ projects }) => {
    useEffect(() => {
        // Reveal animation
        const revealElements = document.querySelectorAll('#projects .reveal');
        const revealOnScroll = () => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();

        // Tilt effect
        const projectCards = document.querySelectorAll('.project-card');
        const handleMouseMove = (e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        };

        const handleMouseLeave = (e) => {
            const card = e.currentTarget;
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        };

        projectCards.forEach(card => {
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('scroll', revealOnScroll);
            projectCards.forEach(card => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [projects]);

    return (
        <section id="projects" className="projects section">
            <div className="container">
                <h2 className="section-title">
                    <span className="title-number">03.</span> Featured Projects
                </h2>
                <div className="projects-grid">
                    {projects && projects.map((project, index) => (
                        <div className="project-card reveal" key={index}>
                            <div className="project-image">
                                <img
                                    src={`${API_URL}/static/images/${project.image}`}
                                    alt={project.title}
                                    style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                                    loading="lazy"
                                />
                                <div className="project-overlay">
                                    <a href={project.github} className="project-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-github"></i>
                                    </a>
                                    <a href={project.demo} className="project-link" aria-label="Live Demo" target="_blank" rel="noopener noreferrer">
                                        <i className="fas fa-external-link-alt"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="project-content">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-technologies">
                                    {project.technologies && project.technologies.map((tech, techIndex) => (
                                        <span className="tech-tag" key={techIndex}>{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
