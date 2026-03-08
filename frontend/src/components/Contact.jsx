import React, { useState, useEffect } from 'react';

const Contact = ({ data }) => {
    const [formStatus, setFormStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        const revealElements = document.querySelectorAll('#contact .reveal');
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
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setFormStatus({ type: 'success', message: 'Thank you! Your message has been sent.' });
                form.reset();

                setTimeout(() => {
                    setFormStatus({ type: '', message: '' });
                }, 5000);
            } else {
                const result = await response.json();
                setFormStatus({
                    type: 'error',
                    message: result.errors ? result.errors.map(error => error.message).join(', ') : 'Oops! There was a problem.'
                });
            }
        } catch (error) {
            setFormStatus({ type: 'error', message: 'An error occurred. Please check your internet connection.' });
        }
    };

    return (
        <section id="contact" className="contact section">
            <div className="container">
                <h2 className="section-title">
                    <span className="title-number">06.</span> Get In Touch
                </h2>
                <div className="contact-content">
                    <div className="contact-info reveal">
                        <h3>Let's Connect</h3>
                        <p>
                            I'm always open to discussing new projects, creative ideas, or
                            opportunities to be part of your visions.
                        </p>
                        <div className="contact-details">
                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <span>{data.email}</span>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-phone"></i>
                                <span>{data.phone}</span>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{data.location}</span>
                            </div>
                        </div>
                    </div>
                    <form className="contact-form reveal" onSubmit={handleSubmit} action="https://formspree.io/f/meelolww" method="POST">
                        <div className="form-group">
                            <input type="text" name="name" placeholder="Your Name" required />
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" placeholder="Your Email" required />
                        </div>
                        <div className="form-group">
                            <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            <span>Send Message</span>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                        {formStatus.message && (
                            <div className={`form-message ${formStatus.type}`} style={{ display: 'block' }}>
                                {formStatus.message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
