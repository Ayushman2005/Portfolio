import React, { useState, useEffect } from 'react';

const Navbar = ({ name }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [activeLink, setActiveLink] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Active navigation link on scroll
            const sections = document.querySelectorAll('.section, .hero');
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            if (current) {
                setActiveLink(current);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const handleLinkClick = (e, targetId) => {
        e.preventDefault();
        setMenuActive(false);

        if (targetId && targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="container">
                <div className="logo">
                    <span className="logo-text">{name ? name.split(' ')[0] : 'Portfolio'}</span>
                </div>
                <ul className={`nav-menu ${menuActive ? 'active' : ''}`}>
                    <li><a href="#home" className={`nav-link ${activeLink === 'home' ? 'active' : ''}`} title="Home" onClick={(e) => handleLinkClick(e, '#home')}><i className="fas fa-home"></i></a></li>
                    <li><a href="#about" className={`nav-link ${activeLink === 'about' ? 'active' : ''}`} title="About" onClick={(e) => handleLinkClick(e, '#about')}><i className="fas fa-user"></i></a></li>
                    <li><a href="#skills" className={`nav-link ${activeLink === 'skills' ? 'active' : ''}`} title="Skills" onClick={(e) => handleLinkClick(e, '#skills')}><i className="fas fa-laptop-code"></i></a></li>
                    <li><a href="#projects" className={`nav-link ${activeLink === 'projects' ? 'active' : ''}`} title="Projects" onClick={(e) => handleLinkClick(e, '#projects')}><i className="fas fa-briefcase"></i></a></li>
                    <li><a href="#experience" className={`nav-link ${activeLink === 'experience' ? 'active' : ''}`} title="Experience" onClick={(e) => handleLinkClick(e, '#experience')}><i className="fas fa-building"></i></a></li>
                    <li><a href="#certifications" className={`nav-link ${activeLink === 'certifications' ? 'active' : ''}`} title="Certifications" onClick={(e) => handleLinkClick(e, '#certifications')}><i className="fas fa-award"></i></a></li>
                    <li><a href="#contact" className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`} title="Contact" onClick={(e) => handleLinkClick(e, '#contact')}><i className="fas fa-envelope"></i></a></li>
                    <li>
                        <a href="/login" className="admin-icon" title="Admin Panel">
                            <i className="fas fa-user-shield"></i>
                        </a>
                    </li>
                </ul>
                <div className={`hamburger ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
