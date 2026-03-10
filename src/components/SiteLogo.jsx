import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SiteLogo.css';

const SiteLogo = () => {
  const [isMobileScrolled, setIsMobileScrolled] = useState(false);
  const [mobileTopOffset, setMobileTopOffset] = useState(0);

  useEffect(() => {
    const updateViewportState = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      setIsMobileScrolled(isMobile && window.scrollY > 8);
      const topOffset = isMobile ? window.visualViewport?.offsetTop ?? 0 : 0;
      setMobileTopOffset(topOffset);
    };

    updateViewportState();
    window.addEventListener('scroll', updateViewportState, { passive: true });
    window.addEventListener('resize', updateViewportState);
    window.visualViewport?.addEventListener('resize', updateViewportState);
    window.visualViewport?.addEventListener('scroll', updateViewportState);

    return () => {
      window.removeEventListener('scroll', updateViewportState);
      window.removeEventListener('resize', updateViewportState);
      window.visualViewport?.removeEventListener('resize', updateViewportState);
      window.visualViewport?.removeEventListener('scroll', updateViewportState);
    };
  }, []);

  return (
    <Link
      to="/"
      className={`site-logo ${isMobileScrolled ? 'is-mobile-scrolled' : ''}`}
      style={{ '--mobile-top-offset': `${mobileTopOffset}px` }}
      aria-label="Ir para a página inicial"
    >
      Abó Filmes
    </Link>
  );
};

export default SiteLogo;
