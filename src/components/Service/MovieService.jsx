import axios from 'axios'

const MOVIE_BASE_REST_API_URL = 'http://localhost:8090/api/v1/movies';
const MOVIE_BASE_REST_API_URL_TRENDING = 'http://localhost:8090/api/v1/movies/trending';
const MOVIE_BASE_REST_API_URL_RECOMMENDED = 'http://localhost:8090/api/v1/movies/recommended';
const MOVIE_BASE_REST_API_URL_GENRE = 'http://localhost:8090/api/v1/movies//genre'

class MovieService{

    getAllMovies(){
        return axios.get(MOVIE_BASE_REST_API_URL)
    }

    createMovie(movie){
        return axios.post(MOVIE_BASE_REST_API_URL, movie)
    }

    getMovieById(movieId){
        return axios.get(MOVIE_BASE_REST_API_URL + '/' + movieId);
    }

    updateMovie(movieId, movie){
        return axios.put(MOVIE_BASE_REST_API_URL + '/' +movieId, movie);
    }

    deleteMovie(movieId){
        return axios.delete(MOVIE_BASE_REST_API_URL + '/' + movieId);
    }

    getAllTrendingMovie(){
        return axios.get(MOVIE_BASE_REST_API_URL_TRENDING);
    }

    getAllRecommendedMovie(){
        return axios.get(MOVIE_BASE_REST_API_URL_RECOMMENDED);
    }

    getAllGenreMovies(genre){
        return axios.get(MOVIE_BASE_REST_API_URL_GENRE+'/'+genre);
    }
}
export default new MovieService();