import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieService from '../Service/MovieService';
import Navbar from '../Header/navbar';

const TrendingList = () => {
  const [tmovie, setTmovie] = useState([]);

  useEffect(() => {
    getAllTrendingMovie();
  }, []);

  const getAllTrendingMovie = () => {
    MovieService.getAllTrendingMovie()
      .then((response) => {
        setTmovie(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex-fill">
      <div>
        <Navbar />
      </div>
      <br />
      <h2 style={{ color: 'gray', paddingLeft: '1.8rem' }}>Trending Movies</h2>
      <br />
      <div className="container mt-4">
        <div className="row">
          {tmovie.map((movie) => (
            <div className="col-md-3" key={movie.id} style={{ paddingBottom: '25px' }}>
              <div className="card">
                <img
                  src={movie.imageUrl}
                  className="card-img-top"
                  alt={movie.title}
                  style={{ height: '300px' }}
                />
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
                    href="#"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#FFA500', borderColor: '#FFA500', color: 'black' }}
                  >
                    Watch Option
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingList;
