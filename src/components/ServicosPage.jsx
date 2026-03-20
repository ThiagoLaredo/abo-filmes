import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ServicosPage.css';

const ServicosPage = () => {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const curtainRef = useRef(null);
  const titleRef = useRef(null);
  const serviceCharsRef = useRef([]);

  const services = ['PROPAGANDA', 'DOCUMENTÁRIO', 'SOCIAL', 'EXPERIÊNCIAS', 'ENTRETENIMENTO'];

  const renderServiceLabel = (label, startIndex = 0) => (
    Array.from(label).map((char, index) => (
      <span
        key={`${label}-${index}`}
        className="service-char"
        style={{ '--i': startIndex + index }}
      >
        <span
          className="service-char-glyph"
          ref={(element) => {
            serviceCharsRef.current[startIndex + index] = element;
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      </span>
    ))
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const serviceChars = serviceCharsRef.current.filter(Boolean);

      gsap.set(titleRef.current, { opacity: 0, y: 24 });
      gsap.set(curtainRef.current, { scaleY: 1, transformOrigin: 'top center' });
      gsap.set(serviceChars, { opacity: 0, x: 16, filter: 'blur(4px)' });

      gsap.timeline()
        .to(curtainRef.current, {
          scaleY: 0,
          duration: 0.8,
          ease: 'power3.inOut',
        })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
          },
          '-=0.12'
        )
        .to(
          serviceChars,
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.34,
            stagger: 0.04,
            ease: 'power2.out',
          },
          '-=0.12'
        );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="servicos-page" ref={pageRef}>
      <div className="servicos-page-curtain" ref={curtainRef}></div>
      <section className="servicos-container" ref={contentRef}>
        <h1 className="servicos-main-title" ref={titleRef}>Vamos trabalhar?</h1>
          <ul className='servicos-list'>
            {services.map((service, serviceIndex) => {
              const charStartIndex = services
                .slice(0, serviceIndex)
                .join('')
                .length;

              return (
                <li key={service} className="servicos-list-item">
                  {renderServiceLabel(service, charStartIndex)}
                </li>
              );
            })}
          </ul>
      </section>
    </main>
  );
};

export default ServicosPage;
