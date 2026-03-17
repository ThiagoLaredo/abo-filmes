import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { getPhotographerBySlug } from '../stills';
import './StillPhotographerPage.css';

const buildSrcSet = (image, extension) =>
  image.widths
    .map((width) => `${image.basePath}-${width}w.${extension} ${width}w`)
    .join(', ');

const getDefaultSrc = (image) => {
  const preferredWidth = image.widths.find((width) => width >= 1400);
  const fallbackWidth = image.widths[image.widths.length - 1];

  return `${image.basePath}-${preferredWidth ?? fallbackWidth}w.jpg`;
};

const StillPhotographerPage = () => {
  const { slug } = useParams();
  const photographer = getPhotographerBySlug(slug);
  const pageRef = useRef(null);
  const curtainRef = useRef(null);
  const headerRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (!photographer) return;

    document.title = `${photographer.name} | Abó Filmes`;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }

    metaDescription.content = `Galeria still de ${photographer.name} na Abó Filmes.`;

    return () => {
      document.title = 'Abó Filmes';
    };
  }, [photographer]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headerRef.current, galleryRef.current], { opacity: 0, y: 28 });
      gsap.set(curtainRef.current, { scaleY: 1, transformOrigin: 'top center' });

      gsap.timeline()
        .to(curtainRef.current, {
          scaleY: 0,
          duration: 0.8,
          ease: 'power3.inOut',
        })
        .to(
          [headerRef.current, galleryRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power2.out',
          },
          '-=0.12'
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  if (!photographer) {
    return <div className="still-photographer-empty">Fotógrafo não encontrado</div>;
  }

  return (
    <main className="still-photographer-page" ref={pageRef}>
      <div className="still-photographer-curtain" ref={curtainRef}></div>

      <section className="still-photographer-header" ref={headerRef}>
        <h1>{photographer.name}</h1>
      </section>

      <section className="still-photographer-gallery" ref={galleryRef}>
        {photographer.images.map((image, index) => (
          <figure className="still-photographer-shot" key={image.id}>
            <picture>
              <source
                srcSet={buildSrcSet(image, 'webp')}
                sizes="(max-width: 768px) calc(100vw - 32px), min(100vw - 120px, 1200px)"
                type="image/webp"
              />
              <source
                srcSet={buildSrcSet(image, 'jpg')}
                sizes="(max-width: 768px) calc(100vw - 32px), min(100vw - 120px, 1200px)"
                type="image/jpeg"
              />
              <img
                src={getDefaultSrc(image)}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
              />
            </picture>
          </figure>
        ))}
      </section>
    </main>
  );
};

export default StillPhotographerPage;
