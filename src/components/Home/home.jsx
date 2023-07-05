import React from 'react';
import Navbar from '../Header/navbar';
import Footer from '../Footer/footer';
import Trending from '../Trending/Trendingmovies';
import Genre from '../Genre/genre';
import Recommended from '../Recommended/Recommended';

const Home = () => {
  return (
    <>
      <Navbar />
      <br />
      <Recommended />
      <br />
      <Trending />
      <br />
      <Genre />
      <br />
      <Footer />
    </>
  );
}

export default Home;