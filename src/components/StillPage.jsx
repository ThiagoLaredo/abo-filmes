import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { photographers } from '../stills';
import './StillPage.css';

gsap.registerPlugin(ScrollTrigger);

const buildSrcSet = (image, extension) =>
  image.widths
    .map((width) => `${image.basePath}-${width}w.${extension} ${width}w`)
    .join(', ');

const getDefaultSrc = (image, preferredWidth) => {
  const width = image.widths.find((candidate) => candidate === preferredWidth)
    ?? image.widths[0];

  return `${image.basePath}-${width}w.jpg`;
};

const allStillImages = photographers.flatMap((photographer) =>
  photographer.images.map((image) => ({
    ...image,
    photographerName: photographer.name,
  }))
);

const StillPage = () => {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const curtainRef = useRef(null);
  const itemsRef = useRef([]);

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

      itemsRef.current.forEach((item) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, pageRef);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <main className="still-page" ref={pageRef}>
      <div className="still-page-curtain" ref={curtainRef}></div>

      <section className="still-container" ref={contentRef}>
        <h1 className="still-title">Still</h1>
        <p className="still-text">
          Colaboramos com fotógrafos em tudo, desde ensaios pontuais em estúdio até campanhas de grande escala ao redor do mundo. Nosso trabalho abrange fotografia de produto, lifestyle e estúdio, criadas para varejo, mídias sociais e mídia exterior. Cada projeto começa com a escolha do fotógrafo certo para se alinhar à visão criativa e ao público. </p>
      </section>

      <section className="still-grid" aria-label="Galeria still">
        {allStillImages.map((image, index) => (
          <article
            className="still-item"
            key={image.id}
            ref={(element) => {
              itemsRef.current[index] = element;
            }}
          >
            <picture>
              <source
                srcSet={buildSrcSet(image, 'webp')}
                sizes="(max-width: 480px) 100vw, (max-width: 768px) calc(50vw - 20px), calc((100vw - 80px) / 3)"
                type="image/webp"
              />
              <source
                srcSet={buildSrcSet(image, 'jpg')}
                sizes="(max-width: 480px) 100vw, (max-width: 768px) calc(50vw - 20px), calc((100vw - 80px) / 3)"
                type="image/jpeg"
              />
              <img
                src={getDefaultSrc(image, 700)}
                alt={image.alt || `Still de ${image.photographerName}`}
                width={image.width}
                height={image.height}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
              />
            </picture>
          </article>
        ))}
      </section>
    </main>
  );
};

export default StillPage;
