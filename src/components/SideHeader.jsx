import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaInstagram, FaLinkedin, FaVimeo } from 'react-icons/fa';
import { gsap } from 'gsap';
import './SideHeader.css';

const SideHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const borderRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(borderRef.current, { height: 0 }, { height: '100%', duration: 0.5, ease: 'power2.out' });
      gsap.set('.fullscreen-menu', { backgroundColor: 'white' });
      gsap.to('.fullscreen-menu', {
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to('.fullscreen-menu', { backgroundColor: 'black', duration: 0.3 });
        }
      });
      gsap.fromTo('.menu-link',
        { opacity: 0, rotationX: -90 },
        { opacity: 1, rotationX: 0, duration: 0.5, stagger: 0.1, delay: 0.2, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.to(borderRef.current, { height: 0, duration: 0.5, ease: 'power2.in' });
      gsap.to('.fullscreen-menu', { x: '-100%', duration: 0.5, ease: 'power2.in' });
    }
  }, [isMenuOpen]);

  const HamburgerIcon = () => (
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="2" fill="white"/>
      <rect y="7.5" width="18" height="2" fill="white"/>
      <rect y="15" width="12" height="2" fill="white"/>
    </svg>
  );

  return (
    <>
      {/* Side Header - visível apenas no desktop (CSS cuida disso) */}
      <div className="side-header">
        <div ref={borderRef} className="left-border"></div>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <HamburgerIcon />}
        </button>
        <a href="#contact" className="contact-link">FALE CONOSCO</a>
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">
            <FaVimeo />
          </a>
        </div>
      </div>

      {/* Botão flutuante para mobile - aparece apenas no mobile */}
      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <HamburgerIcon />}
      </button>

      {/* Fullscreen Menu */}
      {isMenuOpen && (
        <div className="fullscreen-menu" onClick={toggleMenu}>
          <div className="menu-content" onClick={(e) => e.stopPropagation()}>
            <a href="#sobre" className="menu-link">SOBRE</a>
            <a href="#contato" className="menu-link">CONTATO</a>
            <a href="#lab" className="menu-link">LAB CRIATIVO</a>

            {/* Ícones sociais para mobile */}
            <div className="social-icons-mobile">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">
                <FaVimeo />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideHeader;