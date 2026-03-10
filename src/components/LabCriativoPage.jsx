import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './LabCriativoPage.css';

const LabCriativoPage = () => {
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
    <main className="lab-page" ref={pageRef}>
      <div className="lab-page-curtain" ref={curtainRef}></div>

      <section className="lab-container" ref={contentRef}>
        <h1 className="lab-title">Lab Criativo</h1>
        <p className="lab-text">
          Um espaço para experimentar formatos, linguagem e novas narrativas que ampliam o potencial das marcas.
        </p>
      </section>
    </main>
  );
};

export default LabCriativoPage;
