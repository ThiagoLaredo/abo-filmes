import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { movies } from '../movies';
import './MovieGrid.css';

// Registra o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const MovieGrid = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const gridRef = useRef(null);
  const itemsRef = useRef([]); // Array para armazenar as referências de cada item

  useEffect(() => {
    // Cria uma animação para cada item do grid
    itemsRef.current.forEach((item) => {
      if (!item) return; // segurança

      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%', // Quando o topo do item estiver a 80% da viewport
            toggleActions: 'play none none none', // Toca apenas uma vez ao entrar
            once: true, // Garante que a animação ocorra uma única vez
          },
        }
      );
    });

    // Limpeza: mata todos os ScrollTriggers ao desmontar o componente
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []); // Array vazio = executa apenas na montagem

  return (
    <div className="movie-grid" ref={gridRef}>
      {movies.map((movie, index) => {
        const basePath = movie.image.replace(/\.webp$/, '');
        return (
          <div
            key={movie.id}
            className="movie-item"
            ref={(el) => (itemsRef.current[index] = el)} // Atribui a referência
            onMouseEnter={() => setHoveredId(movie.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Link to={`/filme/${movie.id}`}>
              <picture>
                <source
                  srcSet={`${basePath}-500w.webp 500w, ${basePath}-1000w.webp 1000w`}
                  sizes="(max-width: 480px) 456px, (max-width: 768px) 362px, 373px"
                  type="image/webp"
                />
                <source
                  srcSet={`${basePath}-500w.jpg 500w, ${basePath}-1000w.jpg 1000w`}
                  sizes="(max-width: 480px) 456px, (max-width: 768px) 362px, 373px"
                  type="image/jpeg"
                />
                <img
                  src={`${basePath}-500w.jpg`}
                  alt={movie.title}
                  loading="lazy"
                />
              </picture>
              {hoveredId === movie.id && (
                <div className="movie-title">{movie.title}</div>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MovieGrid;