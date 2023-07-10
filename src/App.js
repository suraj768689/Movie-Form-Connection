import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/home';
import Login from './components/Cred/Login';
import Signup from './components/Cred/signup';
import Movie from './components/Recommendedmovies';
import MovieForm from './components/MovieForm/MovieForm';
import RecommendedList from './components/Recommended/RecommendedList';
import TrendingList from './components/Trending/TrendingList';
import GenreMoviesPage from './components/Genre/GenreMoviesPage';



function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route exact path = "/" element = {<Home/>}/>
      <Route path = "/movies" element = {<Home/>}/>
      <Route path = "/add-movie/new" element = {<MovieForm/>} />
      <Route path = "/edit-movie/:id" element = {<MovieForm/>}/>
      <Route path = "/recommend" element = {<RecommendedList/>}/>
      <Route path = "/trend" element = {<TrendingList/>}/>
      <Route path="/genre/:genre" element={<GenreMoviesPage />} />

    </Routes>
  );
}

export default App;