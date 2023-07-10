import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom';
import MovieService from '../Service/MovieService'
import "./MovieForm.css";

const MovieForm = () => {

    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState([]);
    const [cast, setCast] = useState([]);
    const [releaseDate, setReleaseDate] = useState('')
    const [description, setDescrition] = useState('')
    const [rating, setRating] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [boc, setBoc] = useState('')
    const [lang, setLang] = useState('')
    const [runtime, setRuntime] = useState('')
    const [producer, setProducer] = useState('')
    const [director, setDirector] = useState('')
    const [isTrending, setIsTrending] = useState('')
    const [isRecommended, setIsRecommended] = useState('')

    
    const nevigate = useNavigate();
    const {id} = useParams();

    const saveOrUpdateMovie = (e) => {
      e.preventDefault();

        const movie = {title, genre, cast, releaseDate, description, rating,imageUrl,boc,lang,runtime,producer,director,isTrending,isRecommended}

        if(id){
            MovieService.updateMovie(id, movie).then((response) => {
                nevigate('/movies')
            }).catch(error => {
                console.log(error)
            })

        }else{
            MovieService.createMovie(movie).then((response) =>{
                console.log(response.data)
                nevigate('/movies');
            }).catch(error => {
                console.log(error)
            })
        }
        
    }

    useEffect(() => {

        MovieService.getMovieById(id).then((response) =>{
            setTitle(response.data.title)
            setGenre(response.data.genre)
            setCast(response.data.cast)
            setReleaseDate(response.data.releaseDate)
            setDescrition(response.data.description)
            setRating(response.data.rating)
            setImageUrl(response.data.imageUrl)
            setBoc(response.data.boc)
            setLang(response.data.lang)
            setRuntime(response.data.runtime)
            setProducer(response.data.producer)
            setDirector(response.data.director)
            setIsTrending(response.data.isTrending)
            setIsRecommended(response.data.isRecommended)
           
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const heading = () => {

        if(id){
            return <h2 className = "text-center">Update Movie</h2>
        }else{
            return <h2 className = "text-center">Add Movie</h2>
        }
    }

    const updateCast = (index, field, value) => {
      setCast((prevCast) =>
        prevCast.map((castMember, i) => {
          if (i === index) {
            return { ...castMember, [field]: value };
          }
          return castMember;
        })
      );
    };

    const addNewCastMember = () => {
      setCast((prevCast) => [
        ...prevCast,
        { starName: '', starImage: '', starRole: '' },
      ]);
    };


    // const handleCastChange = (index, field, value) => {
    //   const newCast = [...cast];
    //   if (index >= 0 && index < newCast.length) {
    //     newCast[index] = { ...newCast[index], [field]: value };
    //   } else {
    //     newCast.push({ starName: '', starImage: '', starRole: '' });
    //     newCast[index] = { ...newCast[index], [field]: value };
    //   }
    //   setCast(newCast);
    // };
    

  const handleGenreChange = (index, e) => {
    const newGenre = [...genre];
    newGenre[index] = e.target.value;
    setGenre(newGenre);
  };

  // const handleAddCast = () => {
  //   setCast([...cast, { starName: '', starImage: '', starRole: '' }]);
  // };

  const handleAddGenre = () => {
    setGenre([...genre, '']);
  };

  

  return (
    <div className="bg-image">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="py-4 text-warning text-center">
            {
               heading()
            }
            </div>
          <form>
            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="movieName"
                  value={title}
                  onChange = {(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="col-sm-6">
                <label className="movieLabel">Director</label>
                <input
                  className="form-control"
                  type="text"
                  name="director"
                  value={director}
                  onChange = {(e) => setDirector(e.target.value)}
                />
              </div>
            </div>


            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Producer</label>
                <input
                  className="form-control"
                  type="text"
                  name="producer"
                  value={producer}
                  onChange = {(e) => setProducer(e.target.value)}
                />
              </div>
              <div className="col-sm-6">
                <label className="movieLabel">Image URL</label>
                <input
                  className="form-control"
                  type="url"
                  name="imageURL"
                  value={imageUrl}
                  onChange = {(e) => setImageUrl(e.target.value)}
                />
              </div>
            </div>


            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Release Date</label>
                <input
                  className="form-control"
                  type="date"
                  min="1990-01-01"
                  // max="2023-06-23"
                  name="releaseDate"
                  value={releaseDate}
                  onChange = {(e) => setReleaseDate(e.target.value)}
                />
             </div>

               <div className="col-sm-6 p-3">
  <label className="movieLabel">Cast</label>
  {cast.map((castMember, index) => (
  <div key={index}>
    <label className="movieLabel">Star Name</label>
    <input
      className="form-control"
      type="text"
      value={castMember.starName}
      onChange={(e) => updateCast(index, 'starName', e.target.value)}
    />
    <div>
      <label className="movieLabel">Star Image URL</label>
      <input
        className="form-control"
        type="text"
        value={castMember.starImage}
        onChange={(e) => updateCast(index, 'starImage', e.target.value)}
      />
    </div>
    <div>
      <label className="movieLabel">Star Role</label>
      <input
        className="form-control"
        type="text"
        value={castMember.starRole}
        onChange={(e) => updateCast(index, 'starRole', e.target.value)}
      />
    </div>
  </div>
))}

  <br />
  <button className="btn btn-dark" type="button" onClick={addNewCastMember}>
  Add Cast
</button>
</div>
</div>


            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Plot Summary</label>
                <textarea
                  rows="3"
                  cols="3"
                  className="form-control"
                  name="plot"
                  value={description}
                  onChange = {(e) => setDescrition(e.target.value)}
                />
              </div>
              <div className="col-sm-6">
               <label className="movieLabel">Genre</label>
               {genre.map((genreType, index) => (
                <div key={index}>
               <input
                  className="form-control"
                   type="text"
                   value={genreType}
                 onChange={(e) => handleGenreChange(index, e)}
                />
              </div>
              ))}
                <br />
                <button
               className="btn btn-dark btn-gradient"
               type="button"
                onClick={handleAddGenre}
               >
               Add Genre
              </button>
                </div>


            </div>
            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Rating</label>
                <select
                  className="form-control"
                  name="rating"
                  value={rating}
                  onChange = {(e) => setRating(e.target.value)}
                >
                  <option value="">Choose one</option>
                  <option value="PG">PG</option>
                  <option value="M">M</option>
                  <option value="E">E</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="movieLabel">Runtime</label>
                <input
                  className="form-control"
                  type="text"
                  name="runtime"
                  value={runtime}
                  onChange = {(e) => setRuntime(e.target.value)}
                />
              </div>
            </div>


            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Language</label>
                <input
                  className="form-control"
                  type="text"
                  name="lang"
                  value={lang}
                  onChange = {(e) => setLang(e.target.value)}
                />
              </div>
              <div className="col-sm-6">
                <label className="movieLabel">Box Office Collection</label>
                <input
                  className="form-control"
                  type="text"
                  name="boc"
                  value={boc}
                  onChange = {(e) => setBoc(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Recommended Movies</label>
                <input
                  className="form-control"
                  type="text"
                  name="isrecommended"
                  value={isRecommended}
                  onChange = {(e) => setIsRecommended(e.target.value)}
                />
              </div>
              <div className="col-sm-6">
                <label className="movieLabel">Trending Movies</label>
                <input
                  className="form-control"
                  type="text"
                  name="istrending"
                  value={isTrending}
                  onChange = {(e) => setIsTrending(e.target.value)}
                />
              </div>
            </div>

            
            <div className="col text-center m-4">
              <button
                className="btn btn-warning btn1"
                type="submit"
                onClick= {(e) => saveOrUpdateMovie(e)}
                >
                Submit
              </button>&nbsp;
              <Link to='/movies' className="btn btn-warning btn1" style={{paddingLeft:"5px"}}> Cancel </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;