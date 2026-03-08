import React, { useEffect } from 'react';

const Certifications = ({ certifications }) => {
    useEffect(() => {
        const revealElements = document.querySelectorAll('#certifications .reveal');
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

        return () => window.removeEventListener('scroll', revealOnScroll);
    }, [certifications]);

    return (
        <section id="certifications" className="certifications section">
            <div className="container">
                <h2 className="section-title">
                    <span className="title-number">05.</span> Certifications & Learning
                </h2>
                <div className="cert-grid">
                    {certifications && certifications.map((cert, index) => (
                        <div className="cert-card reveal" key={index}>
                            <div className="cert-icon"><i className="fas fa-certificate"></i></div>
                            <div className="cert-content">
                                <h3>{cert.title}</h3>
                                <p className="cert-issuer">{cert.issuer}</p>
                                <p className="cert-date">{cert.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
