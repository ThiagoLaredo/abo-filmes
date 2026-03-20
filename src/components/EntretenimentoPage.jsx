import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './EntretenimentoPage.css';

const EntretenimentoPage = () => {
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
    <main className="entretenimento-page" ref={pageRef}>
      <div className="entretenimento-page-curtain" ref={curtainRef}></div>
      <section className="entretenimento-container" ref={contentRef}>
        <h1 className="entretenimento-main-title">Entretenimento</h1>

      </section>
    </main>
  );
};

export default EntretenimentoPage;
