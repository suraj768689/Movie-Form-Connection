
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import MovieService from '../Service/MovieService'
import './Recommended.css';
import { useRef } from 'react';

const Recommended = () => {

  // let isRole = "USER";
  // const handleDelete = (id) => {
  //   alert(id);
  // }


  const containerRef = useRef(null);
  const scrollLeft = () => {
    containerRef.current.scrollBy({
      left: -500,
      behavior: 'smooth'
    });
  };
  const scrollRight = () => {
    containerRef.current.scrollBy({
      left: 500,
      behavior: 'smooth'
    });
  };

  const [rmovie, setRmovie] = useState([])

    useEffect(() => {

      getAllRecommendedMovie();
    }, [])

    const getAllRecommendedMovie = () => {
        MovieService.getAllRecommendedMovie().then((response) => {
            setRmovie(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    const deleteMovie = (movieId) => {
       MovieService.deleteMovie(movieId).then((response) =>{
        getAllRecommendedMovie();

       }).catch(error =>{
           console.log(error);
       })
        
    }

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


  const openMovie = (movieId) => {
    alert(movieId)
  }




  return (
    <>
      <div className="flex-fill">
      <Link to = "/add-movie/new" className = "btn btn-primary mb-2" style={{marginLeft:"1.8rem"}} > Add Movies </Link>
        <div className="sectionTitle">
          <h3 id="headc">Recommended Movies</h3>
          <Link to="/recommend" id="viewAll" style={{textDecoration: 'none' ,fontSize:'38px'}}>View All</Link>
        </div>
        <br />
        <div className="scroll-buttons" style={{paddingTop:'176px'}}>
          <button className="scroll-button left" onClick={scrollLeft}>
            <img src={'icons8-arrow-50.png'} ></img>
          </button>

        </div>

        <div id='recomm' className="container mt-4 container-scroll" ref={containerRef}>



          <div className="row row-scroll">
            {rmovie.map((rmovie, id) => (
              <div className="col-md-3" key={id}>
                <div className="card rcards" id={rmovie.movieId} >


                  {/* {isRole == "ADMIN" ? <div className="card-delete">
                    <i
                      onClick={() => handleDelete(index)}
                    ><img src={'delete.png'} height={25} width={25} /></i>
                  </div>
                    : <></>} */}




                  <img
                    src={rmovie.imageUrl}
                    className="card-img-top"
                    alt={rmovie.title}
                    style={{ height: '400px', overflow: 'hidden' }}
                  />
                  <div className="card-body" style={{ backgroundColor: 'black' }}>
                    <h5 className="card-title" style={{ color: 'wheat', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{rmovie.title}</h5>
                    <a onClick={() => openMovie(rmovie.movieId)} className="btn btn-primary" style={{ backgroundColor: '#FFA500', borderColor: '#FFA500', color: 'black',fontSize:'14px',marginRight:"4px"}}>
                      Watch Option
                    </a>
                    <Link  className="btn btn-primary btn-sm" style={{ color: 'black' }} to={`/edit-movie/${rmovie.id}`}>Edit</Link>;
                    <button onClick = {() => deleteMovie(rmovie.id)} className="btn btn-secondary btn-sm" style={{ color: 'black', margin: 'right' }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
            {/* {isRole == "ADMIN" ? <div className='col-md-3 addRecommCon' >
              <div className="card addRecomm" >
                <img
                  src={'add\(1\).png'}
                  className="card-img-top"
                  alt={rmovie.title}
                  style={{ height: '70px', objectFit: 'contain', overflow: 'clip' }}
                />
              </div>
            </div> : <></>} */}
          </div>


        </div>

        <div className="scroll-buttons-right" style={{paddingTop:'24px'}}>
          <button className="scroll-button right" onClick={scrollRight}>
            <img src={'icons8-right-arrow-50.png'}></img>
          </button>
        </div>


      </div>
    </>
  );
};

export default Recommended;