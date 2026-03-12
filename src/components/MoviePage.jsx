import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { movies } from '../movies';
import './MoviePage.css';

const MoviePage = () => {
  const { slug } = useParams();
  const movie = movies.find(m => m.slug === slug);
  const pageRef = useRef(null);
  const curtainRef = useRef(null);
  const titleRef = useRef(null);
  const videoRef = useRef(null);

  // Atualizar metatags dinâmicos
  useEffect(() => {
    if (!movie) return;

    // Atualizar title
    document.title = `${movie.title} | Abó Filmes`;

    // Atualizar ou criar meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = `Vídeo Institucional "${movie.title}" produzido pela Abó Filmes. Confira nosso portfólio!`;

    // Cleanup: restaurar title padrão ao desmontar
    return () => {
      document.title = 'Abó Filmes';
    };
  }, [movie]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, videoRef.current], { opacity: 0, y: 28 });
      gsap.set(curtainRef.current, { scaleY: 1, transformOrigin: 'top center' });

      const tl = gsap.timeline();

      tl.to(curtainRef.current, {
        scaleY: 0,
        duration: 0.8,
        ease: 'power3.inOut',
      })
        .to(
          [titleRef.current, videoRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power2.out',
          },
          '-=0.1'
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  if (!movie) {
    return <div>Filme não encontrado</div>;
  }

  return (
    <div className="movie-page" ref={pageRef}>
      <div className="movie-page-curtain" ref={curtainRef}></div>
      <h1 ref={titleRef}>{movie.title}</h1>
      <div className="vimeo-embed" ref={videoRef}>
        <iframe
          src={`https://player.vimeo.com/video/${movie.vimeoId}`}
          width="640"
          height="360"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={movie.title}
        ></iframe>
      </div>
    </div>
  );
};

export default MoviePage;