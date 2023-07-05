import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GenreMovies = () => {
  const { genre } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/v1/movies/genre/${genre}`);
        setMovies(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMoviesByGenre();
  }, [genre]);

  return (
    <div>
      <h2>Movies of the {genre} genre</h2>
      {movies.map((movie) => (
        <div className="movie-card" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
        </div>
      ))}
    </div>
  );
};

export default GenreMovies;
