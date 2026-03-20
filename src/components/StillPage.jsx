import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StillPage.css';

gsap.registerPlugin(ScrollTrigger);

const OUTPUT_WIDTHS = [700, 1400, 2200];

const slugToName = (slug) =>
  slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const getWidths = (originalWidth) => {
  if (!originalWidth || Number.isNaN(Number(originalWidth))) {
    return [700];
  }

  return [...new Set(OUTPUT_WIDTHS.filter((width) => width < originalWidth).concat(originalWidth))]
    .sort((a, b) => a - b);
};

const buildSrcSet = (image, extension) =>
  image.widths
    .map((width) => `${image.basePath}-${width}w.${extension} ${width}w`)
    .join(', ');

const getDefaultSrc = (image, preferredWidth) => {
  const width = image.widths.find((candidate) => candidate === preferredWidth)
    ?? image.widths[0];

  return `${image.basePath}-${width}w.jpg`;
};

const StillPage = () => {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const curtainRef = useRef(null);
  const itemsRef = useRef([]);
  const [stillImages, setStillImages] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadManifest = async () => {
      try {
        const response = await fetch('/still/manifest.json', { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`Falha ao carregar manifest (${response.status})`);
        }

        const manifest = await response.json();
        const allImages = Object.entries(manifest).flatMap(([slug, entries]) => {
          const photographerName = slugToName(slug);

          return entries.map((entry, index) => ({
            id: `${slug}-${index + 1}`,
            basePath: `/still/${slug}/${entry.outputBaseName}`,
            widths: getWidths(entry.width),
            width: entry.width,
            height: entry.height,
            alt: `Fotografia de ${photographerName}`,
            photographerName,
          }));
        });

        if (isMounted) {
          setStillImages(allImages);
        }
      } catch (error) {
        console.error('Erro ao carregar galeria still:', error);
      }
    };

    loadManifest();

    return () => {
      isMounted = false;
    };
  }, []);

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

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (stillImages.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      itemsRef.current = itemsRef.current.slice(0, stillImages.length);

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
      ctx.revert();
    };
  }, [stillImages]);

  return (
    <main className="still-page" ref={pageRef}>
      <div className="still-page-curtain" ref={curtainRef}></div>

      <section className="still-container" ref={contentRef}>
        <h1 className="still-title">Still</h1>
        <p className="still-text">
          Colaboramos com fotógrafos em tudo, desde ensaios pontuais em estúdio até campanhas de grande escala ao redor do mundo. Nosso trabalho abrange fotografia de produto, lifestyle e estúdio, criadas para varejo, mídias sociais e mídia exterior. Cada projeto começa com a escolha do fotógrafo certo para se alinhar à visão criativa e ao público. </p>
      </section>

      <section className="still-grid" aria-label="Galeria still">
        {stillImages.map((image, index) => (
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
