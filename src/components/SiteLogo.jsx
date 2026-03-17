import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './SiteLogo.css';

const SiteLogo = () => {
  const CURTAIN_OUT_DURATION = 430;
  const CURTAIN_IN_DURATION = 520;
  const FADE_OUT_DURATION = 280;
  const FADE_IN_DURATION = 350;

  const [isScrolled, setIsScrolled] = useState(false);
  const [displayedScrolled, setDisplayedScrolled] = useState(false);
  const [logoPhase, setLogoPhase] = useState('idle');
  const [transitionDirection, setTransitionDirection] = useState(null);
  const [mobileTopOffset, setMobileTopOffset] = useState(0);
  const transitionTimeoutsRef = useRef([]);

  useEffect(() => {
    const updateViewportState = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      setIsScrolled(window.scrollY > 8);
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

  useEffect(() => {
    if (isScrolled === displayedScrolled) {
      return;
    }

    const nextDirection = isScrolled ? 'to-scrolled' : 'to-header';
    const outDuration = nextDirection === 'to-scrolled' ? CURTAIN_OUT_DURATION : FADE_OUT_DURATION;
    const inDuration = nextDirection === 'to-scrolled' ? FADE_IN_DURATION : CURTAIN_IN_DURATION;

    transitionTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    transitionTimeoutsRef.current = [];

    setTransitionDirection(nextDirection);
    setLogoPhase('out');

    const exitTimeout = window.setTimeout(() => {
      setDisplayedScrolled(isScrolled);
      setLogoPhase('in');

      const enterTimeout = window.setTimeout(() => {
        setLogoPhase('idle');
        setTransitionDirection(null);
      }, inDuration);

      transitionTimeoutsRef.current.push(enterTimeout);
    }, outDuration);

    transitionTimeoutsRef.current.push(exitTimeout);

    return () => {
      transitionTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      transitionTimeoutsRef.current = [];
    };
  }, [
    CURTAIN_IN_DURATION,
    CURTAIN_OUT_DURATION,
    FADE_IN_DURATION,
    FADE_OUT_DURATION,
    displayedScrolled,
    isScrolled,
  ]);

  const renderHeaderChars = (label, startIndex = 0, animationClass = '') => {
    return Array.from(label).map((char, index) => (
      <span
        key={`${label}-${startIndex + index}`}
        className={`logo-char ${animationClass}`}
        style={{ '--i': startIndex + index }}
      >
        <span className="logo-char-glyph">{char === ' ' ? '\u00A0' : char}</span>
      </span>
    ));
  };

  const logoText = displayedScrolled ? 'ABÓ' : 'ABÓ FILMES';

  const headerAnimationClass =
    transitionDirection === 'to-scrolled' && logoPhase === 'out'
      ? 'is-curtain-leaving'
      : transitionDirection === 'to-header' && logoPhase === 'in'
      ? 'is-curtain-entering'
      : '';

  const scrolledAnimationClass =
    transitionDirection === 'to-header' && logoPhase === 'out'
      ? 'is-fading-leaving'
      : transitionDirection === 'to-scrolled' && logoPhase === 'in'
      ? 'is-fading-entering'
      : '';

  return (
    <Link
      to="/"
      className={`site-logo ${displayedScrolled ? 'is-scrolled' : ''}`}
      style={{ '--mobile-top-offset': `${mobileTopOffset}px` }}
      aria-label="Ir para a página inicial"
    >
      <span className="site-logo-animated" aria-hidden="true">
        {displayedScrolled ? (
          <span className={`site-logo-compact ${scrolledAnimationClass}`}>ABÓ</span>
        ) : (
        <>
            <strong>{renderHeaderChars('ABÓ', 0, headerAnimationClass)}</strong>
            <span className="site-logo-separator">{renderHeaderChars('FILMES', 3, headerAnimationClass)}</span>
        </>
        )}
      </span>
      <span className="sr-only-logo-text">{logoText}</span>
    </Link>
  );
};

export default SiteLogo;
