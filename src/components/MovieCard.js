import React from "react";
import "../style/movieCard.css";
import { useNavigate } from "react-router-dom";

function MovieCard({ data, imageUrl }) {
  const navigate = useNavigate();
  const getInfos = () => {
    if (data.first_air_date) {
      console.log('TV')
      navigate(`/tv_show/${data.id}`);
    }else{
      console.log('movie')
      navigate(`/movie/${data.id}`);
    }
  };

  return (
    <div onClick={getInfos} className="movieCard">
      <img src={`${imageUrl}${data.poster_path}`} alt="poster" />
      <p className="title">{data.name || data.title}</p>
    </div>
  );
}

export default MovieCard;
