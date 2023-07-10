import React, { useEffect, useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import MovieService from '../Service/MovieService';
import Navbar from '../Header/navbar';

const GenreMoviesPage = () => {
  const { genre } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    MovieService.getAllGenreMovies(genre)
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [genre]);

  return (
    <div className="flex-fill" >
      <div><Navbar /></div><br />
          <h2 style={{ color: "gray", paddingLeft:"1.8rem" }}>{genre} Movies</h2>
          <br />
           <div className="container mt-4" >
           <div className="row" >
            {movies.map((movies) => (
            <div className="col-md-3" key={movies.id} style={{paddingBottom:'25px'}}>
              <div className="card" >
                <img
                  src={movies.imageUrl}
                  className="card-img-top"
                  alt={movies.title}
                  style={{ height: '300px'}}
                />
                <div className="card-body" style={{ backgroundColor: 'black' }}>
                  <h5 className="card-title" 
                  style={{
                      color: 'wheat',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                    >{movies.title}</h5>
                  <a href="#" className="btn btn-primary" style = {{ backgroundColor: '#FFA500', borderColor: '#FFA500', color:'black' }}>
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

export default GenreMoviesPage;
