import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ServicosPage.css';

const ServicosPage = () => {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const curtainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 24 });
      gsap.set(curtainRef.current, { scaleY: 1, transformOrigin: 'top center' });

      gsap.timeline()
        .to(curtainRef.current, {
          scaleY: 0,
          duration: 0.8,
          ease: 'power3.inOut',
        })
        .to(
          contentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
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
        <h1 className="servicos-main-title">Vamos trabalhar?</h1>
          <ul className='servicos-list'>
            <li>PROPAGANDA</li>
            <li>DOCUMENTÁRIO</li>
            <li>SOCIAL</li>
            <li>EXPERIÊNCIAS</li>
            <li>ENTRETENIMENTO</li>
          </ul>
      </section>
    </main>
  );
};

export default ServicosPage;
