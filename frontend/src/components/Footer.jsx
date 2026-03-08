import React from 'react';

const Footer = ({ data }) => {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} {data.name}. All rights reserved.</p>
                <div className="footer-links">
                    <a href="https://github.com/Ayushman2005" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/ayushman-kar-08370634b" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                    <a href="https://x.com/AyushmanKa99409" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
