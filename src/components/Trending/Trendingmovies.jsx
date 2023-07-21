import React, { useEffect, useState } from "react";
import "./Trending.css";
import { useRef } from "react";
import { FaStar } from "react-icons/fa";
import MovieServices from "../Services/MovieServices";
import { useNavigate } from "react-router-dom";
import ViewMovieModal from "../moviemodal";

const Trending = (props) => {
  const [rmovie, setRmovie] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isRole, setIsRole] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);



  useEffect(() => {
    if (props.creds != null && props.isLoggedIn) {
      setIsRole(props.creds.user_role[0].authority);
      setIsLoading(false);
    }
  }, [props.creds, props.isLoggedIn]);

  const fetchMovies = async () => {
    MovieServices.getTrending()
      .then((res) => {
        if (Array.isArray(res.data)) {
          setRmovie(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = (id) => {
    console.log("Deleting movie with ID:", id);
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");

    if (confirmDelete) {
      MovieServices.deleteMovie(id)
        .then((res) => {
          window.location.reload();// Refresh after deletion
        })
        .catch((error) => {
          console.error("Error deleting movie:", error);
        });
    }
  };

  const containerRef = useRef(null);
  const scrollLeft = () => {
    containerRef.current.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    containerRef.current.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };
  const handleShowModal = (rmovie) => {
    setSelectedMovie(rmovie)
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  /*const rmovie = [
    {
      title: 'Charulata',
      image: 'http://7artcinema.online.fr/imagesbg/Satyajit_Ray_Charulata_1964_Poster_07.jpg',
      movieId: 'amichinigoj252-2666jsgag-16166kjag$@-agj'
    },
    {
      title: 'Inception',
      image: 'https://irs.www.warnerbros.com/gallery-v2-jpeg/inception_posterlarge_8-1308772917.jpg',
      movieId: 'timegoj252-2666jsgag-16166kjag$@-agj'
    },
    {
      title: 'Interstellar',
      image: 'https://posterspy.com/wp-content/uploads/2022/08/Interstellar_poster.jpg',
      movieId: 'internj252-2666jsgag-16166kjag$@-agj'
    },
    {
      title: 'Spider-Man',
      image: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/d2284deb1c651f0678555eeb30cc10a51726b8e8d6a1eb4b2d12b55d5d0e003c._RI_TTW_.jpg',
      movieId: 'spoiderj252-2666jsgag-16166kjag$@-agj'
    }, {
      title: 'Puss In Boots: The Last Wish',
      image: 'https://www.gippslandtimes.com.au/wp-content/uploads/2023/01/PussinBootsposter_68806.jpg',
      movieId: 'gatoj252-2666jsgag-16166kjag$@-agj'
    }, {
      title: 'Predator 1987',
      image: 'https://image.tmdb.org/t/p/original/9XibNLfmUWCg0PPydmyoCl1KxvF.jpg',
      movieId: 'predatorgoj252-2666jsgag-16166kjag$@-agj'
    },
  ];*/
  const viewAll = () => {
    navigate("/viewall", { state: { rmovie: rmovie, isRole: isRole, isLoggedIn: props.isLoggedIn, title: "Trending movies" } });
  }
  const openMovie = (movieId) => {
    navigate(`/view-movie/${movieId}`, { state: { isRole: isRole, isLoggedIn: props.isLoggedIn } });
  };

  return (
    <>
      <div className="flex-fill">
        <div className="sectionTitle">
          <h3 id="headc">Trending Movies</h3>
          <h3 id="viewAll" onClick={() => viewAll()}>View All</h3>
        </div>
        <br />
        {rmovie.length <= 0 ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/loading.gif"
              style={{ height: 'auto', width: '200px' }}
            />
          </div>
          :
          <div>
            <div className="tscroll-buttons">
              <button className="tscroll-button left" onClick={scrollLeft}>
                <img src={"icons8-arrow-50.png"}></img>
              </button>
            </div>

            <div
              id="recomm"
              className="container mt-4 container-scroll"
              ref={containerRef}
            >
              <div className="row row-scroll">
                {rmovie.map((rmovie, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="card rcards" id={rmovie.movieId}>
                      {isRole == "ROLE_ADMIN" ? (
                        <div className="card-delete">
                          <i onClick={() => handleDelete(rmovie.movieId)}>
                            <img src={"delete.png"} height={25} width={25} />
                          </i>
                        </div>
                      ) : (
                        <></>
                      )}

                      <img
                        src={rmovie.posterUrl}
                        className="card-img-top"
                        onClick={() => openMovie(rmovie.movieId)}
                        alt={rmovie.title}
                        style={{
                          height: "400px",
                          // objectFit: "cover",
                          overflow: "hidden",
                          cursor: 'pointer'
                        }}
                      />
                      <div
                        className="card-body"
                        style={{ backgroundColor: "black" }}
                      >
                        <div className="row">
                          <div className="col-sm-6">
                            <h5
                              className="card-title"
                              style={{
                                color: "wheat",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                width: '14rem'
                              }}
                            >
                              {rmovie.title}
                            </h5>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>

                          <div>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleShowModal(rmovie)}
                              style={{
                                backgroundColor: "#FFA500",
                                borderColor: "#FFA500",
                                color: "black",
                              }}
                            >
                              Watch Option
                            </button>
                          </div>
                          <div className="col-sm-4" style={{ pading: '0.3rem' }}>
                            <span>{rmovie.rating !== null ?
                              rmovie.rating : "NA"}
                              <FaStar style={{ marginBottom: "4px" }} />
                            </span>
                          </div>

                         </div>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="tscroll-buttons-right">
              <button className="tscroll-button right" onClick={scrollRight}>
                <img src={"icons8-right-arrow-50.png"}></img>
              </button>
            </div>
          </div>
        }
        {selectedMovie && <ViewMovieModal showModal={showModal} handleCloseModal={handleCloseModal} movie={{
          image: selectedMovie.posterUrl,
          title: selectedMovie.title,
          description: selectedMovie.movieDesc,
          rating: selectedMovie.rating,
        }} />}
      </div >
    </>
  );
};

export default Trending;
