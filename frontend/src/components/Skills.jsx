import React, { useEffect, useRef, useState } from 'react';

const Skills = ({ skills }) => {
    const [animated, setAnimated] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!animated && sectionRef.current) {
                const sectionTop = sectionRef.current.getBoundingClientRect().top;
                if (sectionTop < window.innerHeight - 100) {
                    setAnimated(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on mount

        return () => window.removeEventListener('scroll', handleScroll);
    }, [animated]);

    return (
        <section id="skills" className="skills section" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title">
                    <span className="title-number">02.</span> Skills & Technologies
                </h2>
                <div className="skills-grid">
                    {skills && skills.map((skill, index) => (
                        <div className="skill-card reveal active" key={index}>
                            <div className="skill-header">
                                <h3>{skill.name}</h3>
                                <span className="skill-percentage">{skill.level}%</span>
                            </div>
                            <div className="skill-bar">
                                <div
                                    className="skill-progress"
                                    style={{ width: animated ? `${skill.level}%` : '0%' }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
