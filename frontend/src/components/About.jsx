import React, { useEffect } from 'react';

const About = ({ data }) => {
    useEffect(() => {
        const revealElements = document.querySelectorAll('#about .reveal');
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
        revealOnScroll(); // Initial check

        return () => window.removeEventListener('scroll', revealOnScroll);
    }, []);

    return (
        <section id="about" className="about section">
            <div className="container">
                <h2 className="section-title">
                    <span className="title-number">01.</span> About Me
                </h2>
                <div className="about-content">
                    <div className="about-text">
                        <p className="reveal">
                            I am a Computer Science and Engineering student at GIET University
                            (Class of 2028), specializing in Machine Learning, Artificial
                            Intelligence, Full-Stack Web Development, and Cybersecurity. I am
                            passionate about bridging the gap between intelligent algorithms
                            and secure, scalable web applications to create seamless user
                            experiences.
                        </p>
                        <p className="reveal">
                            Beyond my coursework, I thrive in fast-paced collaborative
                            environments as an active hackathon participant, demonstrating
                            rapid prototyping and complex problem-solving skills under time
                            constraints. I am also deeply engaged with technical communities
                            on campus, including the Cyber Security Club and GDG, where I
                            focus on technical collaboration and continuous learning.
                        </p>
                        <p className="reveal">
                            Whether I am developing an AI-powered recommendation engine,
                            scanning local networks for vulnerabilities, or contributing to
                            open-source projects, my goal is to explore emerging technologies
                            and build innovative solutions that make a tangible impact.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
