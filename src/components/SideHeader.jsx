import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaVimeo } from 'react-icons/fa';
import { gsap } from 'gsap';
import './SideHeader.css';

const SideHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const borderRef = useRef(null);
  const menuRef = useRef(null);
  const curtainRef = useRef(null);
  const menuLinksRef = useRef([]);
  const isAnimatingRef = useRef(false);

  const openMenu = () => {
    if (isAnimatingRef.current || isMenuOpen) {
      return;
    }

    setIsMenuVisible(true);
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    if (isAnimatingRef.current || !isMenuVisible || !menuRef.current) {
      return;
    }

    isAnimatingRef.current = true;
    setIsMenuOpen(false);

    gsap.to(borderRef.current, { height: 0, duration: 0.4, ease: 'power2.in' });

    const closeTl = gsap.timeline({
      onComplete: () => {
        setIsMenuVisible(false);
        isAnimatingRef.current = false;
      },
    });

    closeTl
      .to(menuLinksRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.24,
        stagger: { each: 0.07, from: 'end' },
        ease: 'power2.in',
      })
      .to(
        curtainRef.current,
        {
          scaleY: 1,
          duration: 0.5,
          ease: 'power3.inOut',
        },
        '-=0.06'
      )
      .to(
        menuRef.current,
        {
          x: '-100%',
          duration: 0.45,
          ease: 'power2.in',
        },
        '-=0.12'
      );
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
      return;
    }

    openMenu();
  };

  useEffect(() => {
    if (isMenuOpen && isMenuVisible && menuRef.current) {
      isAnimatingRef.current = true;

      gsap.fromTo(borderRef.current, { height: 0 }, { height: '100%', duration: 0.5, ease: 'power2.out' });
      gsap.set(menuRef.current, { x: '-100%', backgroundColor: '#ffffff' });
      gsap.set(curtainRef.current, { scaleY: 0, transformOrigin: 'top center' });
      gsap.set(menuLinksRef.current, { opacity: 0, y: 34 });

      const openTl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });

      openTl
        .to(menuRef.current, { x: 0, duration: 0.55, ease: 'power3.out' })
        .to(menuRef.current, { backgroundColor: '#000000', duration: 0.25, ease: 'power1.out' }, '-=0.2')
        .to(
          menuLinksRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.44,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.05'
        );
    }
  }, [isMenuOpen, isMenuVisible]);

  const MenuIcon = () => (
    <span className={`menu-icon ${isMenuOpen ? 'is-open' : ''}`} aria-hidden="true">
      <span className="menu-line menu-line-1"></span>
      <span className="menu-line menu-line-2"></span>
      <span className="menu-line menu-line-3"></span>
    </span>
  );

  const renderMenuLabel = (label) => {
    return Array.from(label).map((char, index) => (
      <span
        key={`${label}-${index}`}
        className="menu-link-char"
        style={{ '--i': index }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <>
      {/* Side Header - visível apenas no desktop (CSS cuida disso) */}
      <div className="side-header">
        <div ref={borderRef} className="left-border"></div>
        <button className="menu-toggle" onClick={toggleMenu} aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}>
          <MenuIcon />
        </button>
        <Link to="/contato" className="contact-link">AGENDE UMA CONVERSA</Link>
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
      <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}>
        <MenuIcon />
      </button>

      {/* Fullscreen Menu */}
      {isMenuVisible && (
        <div className="fullscreen-menu" ref={menuRef} onClick={closeMenu}>
          <div className="menu-close-curtain" ref={curtainRef}></div>
          <div className="menu-content" onClick={(e) => e.stopPropagation()}>
            <Link to="/sobre" className="menu-link" onClick={closeMenu} ref={(el) => (menuLinksRef.current[0] = el)}>{renderMenuLabel('SOBRE')}</Link>
            <Link to="/contato" className="menu-link" onClick={closeMenu} ref={(el) => (menuLinksRef.current[1] = el)}>{renderMenuLabel('CONTATO')}</Link>
            <Link to="/labcriativo" className="menu-link" onClick={closeMenu} ref={(el) => (menuLinksRef.current[2] = el)}>{renderMenuLabel('LAB CRIATIVO')}</Link>

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