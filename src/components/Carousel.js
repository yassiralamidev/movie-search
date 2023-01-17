import React, { useState, useEffect } from "react";
import "../style/carousel.css";
import axios from "axios";
import { apis } from "../data/api";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

function Carousel() {
  const [data, setData] = useState([]);
  const getPopularMovies = () => {
    axios.get(apis.PopularMovies).then((res) => setData(res.data.results));
  };
  useEffect(() => {
    getPopularMovies();
  }, []);
  const truncate=(str,n)=>{
    return str?.length > n  ? str.substr(0,n-1) + "..." : str;
  }
  let movies = [];
  if (data.length > 0) {
    console.log(data[0]);
    data.forEach((m)=>{
      let movie = <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.212), rgba(0, 0, 0, 0.8)),url(${apis.ImageUrl}${m.backdrop_path})`,
      }}
      className="carousel__item"
    >
      <h2>{m.title}</h2>
      <div>
        <span>{m.vote_average}&nbsp;|&nbsp;{m.vote_count}&nbsp;votes</span>
        <span className="sep">&#8226;</span>
        <span>{m.release_date && new Date(m.release_date).getFullYear()}</span>
      </div>
      <p>{truncate(m.overview,150)}</p>
    </div>
      movies.push(movie);
    })
  }

  console.log(movies)

  return (
    <AliceCarousel
      infinite
      autoPlay
      disableButtonsControls
      disableDotsControls
      mouseTracking
      items={movies}
      autoPlayInterval={2500}
    />
  );
}





export default Carousel;
