import React, { useEffect } from 'react';

const Experience = ({ experience }) => {
    useEffect(() => {
        const revealElements = document.querySelectorAll('#experience .reveal');
        const revealOnScroll = () => {
            revealElements.forEach(element => {
                if (element) {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.classList.add('active');
                    }
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();

        return () => window.removeEventListener('scroll', revealOnScroll);
    }, [experience]);

    return (
        <section id="experience" className="experience section">
            <div className="container">
                <h2 className="section-title">
                    <span className="title-number">04.</span> Work Experience
                </h2>
                <div className="timeline">
                    {experience && experience.map((exp, index) => (
                        <div className="timeline-item reveal" key={index}>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <h3>{exp.title}</h3>
                                    <span className="timeline-period">{exp.period}</span>
                                </div>
                                <h4 className="timeline-company">{exp.company}</h4>
                                <p>{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
