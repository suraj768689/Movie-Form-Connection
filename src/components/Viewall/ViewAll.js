import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieServices from '../Services/MovieServices';
import ViewMovieModal from '../moviemodal';
import { FaStar } from 'react-icons/fa';
import './ViewAll.css';

const ViewAll = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const location = useLocation();
  const { rmovie, isRole, isLoggedIn, title } = location.state;

  const [movies, setMovies] = useState(rmovie); // Add the state for movies

  const handleDelete = (id) => {
    console.log('Deleting movie with ID:', id);
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');

    if (confirmDelete) {
      MovieServices.deleteMovie(id)
        .then((res) => {
          // Update the movies state to remove the deleted movie
          setMovies((prevMovies) => prevMovies.filter((movie) => movie.movieId !== id));
        })
        .catch((error) => {
          console.error('Error deleting movie:', error);
        });
    }
  };

  const openMovie = (movieId) => {
    navigate(`/view-movie/${movieId}`, { state: { isRole, isLoggedIn } });
  };

  const handleShowModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  return (
    <div className="flex-fill">
      <h2 style={{ color: 'gray', paddingLeft: '1.8rem' }}>{title}</h2>
      <br />
      <div className="container mt-4">
        <div className="row">
          {movies.map((movie) => (
            <div className="col-md-3 coller" key={movie.movieId} style={{ paddingBottom: '25px' }}>
              <div className="card vcard">
                {isRole === 'ROLE_ADMIN' ? (
                  <div className="card-delete">
                    <i onClick={() => handleDelete(movie.movieId)}>
                      <img src={'/delete.png'} height={25} width={25} alt="" />
                    </i>
                  </div>
                ) : (
                  <></>
                )}

                <img src={movie.posterUrl} onClick={() => openMovie(movie.movieId)} className="card-img-top" alt={movie.title} style={{ height: '350px' }} />
                <div className="card-body" style={{ backgroundColor: 'black' }}>
                  <h5
                    className="card-title"
                    style={{
                      color: 'wheat',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    {movie.title}
                  </h5>
                  <a
                    className="btn btn-primary"
                    style={{ backgroundColor: '#FFA500', borderColor: '#FFA500', color: 'black' }}
                    onClick={() => handleShowModal(movie)}
                  >
                    Watch Option
                  </a>
                  <span className="span">
                    {movie.rating !== null ? movie.rating : 'NA'}
                    <FaStar style={{ marginBottom: '4px' }} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMovie && (
        <ViewMovieModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          movie={{
            image: selectedMovie.posterUrl,
            title: selectedMovie.title,
            description: selectedMovie.movieDesc,
            rating: selectedMovie.rating,
          }}
        />
      )}
    </div>
  );
};

export default ViewAll;
