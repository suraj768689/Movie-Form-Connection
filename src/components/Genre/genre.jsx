import React from 'react';
import {Link } from 'react-router-dom';

const Genre = () => {
  const genres = [
    {
      title: 'Action',
      image: 'https://pbblogassets.s3.amazonaws.com/uploads/2019/07/12130642/John-Wick.jpg',
    },
    {
      title: 'Comedy',
      image: 'https://nofilmschool.com/sites/default/files/styles/facebook/public/screen_shot_2019-06-21_at_2.16.03_pm.png?itok=bcH1ZGO8',
    },
    {
      title: 'Drama',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ7mRDJV0uxIvyCv9__eeZOneM41ybvTA-Sw&usqp=CAU',
    },
    {
      title: 'Horror',
      image: 'https://media.gq.com/photos/59efa5f866e2d56abcd7a055/16:9/w_2560%2Cc_limit/state-of-horror-gq.jpg',
    },
    { 
      title: 'Romance',
      image: 'https://genregeek.weebly.com/uploads/2/8/0/3/28037185/7430436_orig.jpg',
    },
    {
      title: 'Sci-Fi',
      image: 'https://i0.wp.com/www.pandorapost.com/wp-content/uploads/2021/04/science-fiction-genres-and-subgenres.jpg?resize=620%2C358&ssl=1',
    },
    {
      title: 'Thriller',
      image: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg',
    },
    {
      title: 'Animation',
      image: 'https://static.tvtropes.org/pmwiki/pub/images/2e5c6d37_566f_4274_b62d_ebf5fcbd0722.png',
    },
  ];

  return (
    <div className="flex-fill">
      <h2 style={{ color: "gray", paddingLeft:"1.8rem", fontSize:'40px' }}>      Genres</h2>
      <br />
      <div className="container mt-4">
        <div className="row">
          {genres.map((genre, index) => (
            <div className="col-md-3" key={index} style={{paddingBottom:'25px'}}>
              <div className="card">
                <img
                  src={genre.image}
                  className="card-img-top"
                  alt={genre.title}
                  style={{ height: '250px'  }}
                />
                <div className="card-body" style={{ backgroundColor: 'black' }}>
                  <h5 className="card-title" style={{ color: 'white' }}>{genre.title}</h5>
                  <Link to={`/genre/${genre.title}`} className="btn btn-primary" style={{ backgroundColor: '#FFA500', borderColor: '#FFA500', color: 'black' }}>
                    Watch Option
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genre;