import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/home';
import Login from './components/Cred/Login';
import Signup from './components/Cred/signup';
import Movie from './components/Recommendedmovies';
import MovieForm from './components/MovieForm/MovieForm';


function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route exact path = "/" element = {<Home/>}></Route>
      <Route path = "/movies" element = {<Home/>}></Route>
      <Route path = "/add-movie/new" element = {<MovieForm/>} ></Route>
      <Route path = "/edit-movie/:id" element = {<MovieForm/>}></Route>
      {/* <Route exact path="/" element={<Genre/>} />
      <Route exact path="/movies/genre/:genre" element={<GenreMovies/>} /> */}
    </Routes>
  );
}

export default App;