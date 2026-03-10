import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SiteLogo.css';

const SiteLogo = () => {
  const [isMobileScrolled, setIsMobileScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      setIsMobileScrolled(isMobile && window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <Link
      to="/"
      className={`site-logo ${isMobileScrolled ? 'is-mobile-scrolled' : ''}`}
      aria-label="Ir para a página inicial"
    >
      Abó Filmes
    </Link>
  );
};

export default SiteLogo;
