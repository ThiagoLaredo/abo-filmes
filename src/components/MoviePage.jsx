import React from 'react';
import { useParams } from 'react-router-dom';
import { movies } from '../movies';
import './MoviePage.css';

const MoviePage = () => {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id));

  if (!movie) {
    return <div>Filme não encontrado</div>;
  }

  return (
    <div className="movie-page">
      <h1>{movie.title}</h1>
      <div className="vimeo-embed">
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