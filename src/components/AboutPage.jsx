import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AboutPage.css';

const AboutPage = () => {
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
    <main className="about-page" ref={pageRef}>
      <div className="about-page-curtain" ref={curtainRef}></div>
      <section className="about-container" ref={contentRef}>
        <h1 className="about-main-title">Abó Filmes – Histórias que nos aproximam.</h1>

        <p className="about-text">
          Pra nós o audiovisual não é um fim, nem uma entrega com linha de chegada. É uma <strong>ponte.</strong>
        </p>

        <h2 className="about-section-title">A Humanidade como Norte:</h2>
        <p className="about-text">
          Se o nosso motor são as pessoas, o resultado do nosso trabalho deve ser o encontro. <strong>Aproximar</strong> é o verbo que humaniza a técnica. É reduzir a distância entre quem conta e quem ouve, entre a marca e o público, entre o olhar e a emoção.
        </p>

        <h2 className="about-section-title">O Movimento do Encontro:</h2>
        <p className="about-text">
          Aproximar exige movimento. É um convite constante para sair do lugar comum e entender o outro. Histórias que nos aproximam, traduz a nossa crença de que uma história só está completa quando ela gera <strong>identificação e encurta distâncias.</strong>
        </p>

        <h2 className="about-section-title">A Relevância Comercial:</h2>
        <p className="about-text">
          Entregamos o valor mais valioso do audiovisual moderno: a <strong>conexão humana.</strong>
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
