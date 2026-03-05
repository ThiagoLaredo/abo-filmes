import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { movies } from '../movies';
import './MovieGrid.css';

const MovieGrid = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <div key={movie.id} className="movie-item" onMouseEnter={() => setHoveredId(movie.id)} onMouseLeave={() => setHoveredId(null)}>
          <Link to={`/filme/${movie.id}`}>
            <img src={movie.image} alt={movie.title} />
            {hoveredId === movie.id && <div className="movie-title">{movie.title}</div>}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;