import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutPage.css';

gsap.registerPlugin(ScrollTrigger);

const emphasizeLetters = (text) => {
  return Array.from(text).map((char, index) => (
    <span key={`${char}-${index}`} className="about-highlight-char">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};

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

      const highlightedBlocks = contentRef.current?.querySelectorAll('.about-highlight');

      highlightedBlocks?.forEach((block) => {
        if (block.dataset.noAnimate === 'true') {
          return;
        }

        const letters = block.querySelectorAll('.about-highlight-char');

        gsap.fromTo(
          letters,
          { color: '#303030' },
          {
            color: '#ffffff',
            duration: 1,
            ease: 'none',
            stagger: 0.06,
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              end: '+=260',
              scrub: 1.5,
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="about-page" ref={pageRef}>
      <div className="about-page-curtain" ref={curtainRef}></div>
      <section className="about-container" ref={contentRef}>
        <h1 className="about-main-title">Abó Filmes – Histórias que nos aproximam.</h1>

        <p className="about-text">
          Pra nós o audiovisual não é um fim em si mesmo, nem uma entrega com linha de chegada. É uma <strong className="about-highlight">{emphasizeLetters('ponte.')}</strong>
        </p>

        <h2 className="about-section-title">A Humanidade como Norte:</h2>
        <p className="about-text">
          Se o nosso motor são as pessoas, o resultado do nosso trabalho deve ser o encontro. <strong className="about-highlight about-highlight-no-break">{emphasizeLetters('Aproximar')}</strong> é o verbo que humaniza a técnica. É reduzir a distância entre quem conta e quem ouve, entre a marca e o público, entre o olhar e a emoção.
        </p>

        <h2 className="about-section-title">O Movimento do Encontro:</h2>
        <p className="about-text">
          Aproximar exige movimento. É um convite constante para sair do lugar comum e entender o outro. Histórias que nos aproximam, traduz a nossa crença de que uma história só está completa quando ela gera <strong className="about-highlight">{emphasizeLetters('identificação e encurta distâncias.')}</strong>
        </p>

        <h2 className="about-section-title">A Sonoridade "Abó":</h2>
        <p className="about-text">
          O nome Abó carrega uma fonética acolhedora, que remete à origem e ao afeto. Dizer que nossas histórias "nos aproximam" reforça essa sensação de casa, de verdade e de algo que é feito de gente para gente.
        </p>

        <h2 className="about-section-title">A Relevância Comercial:</h2>
        <p className="about-text">
          entregamos o valor mais valioso do audiovisual moderno: a <strong className="about-highlight about-highlight-static" data-no-animate="true">conexão humana.</strong>
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
