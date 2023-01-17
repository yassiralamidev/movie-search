import React, { useState, useEffect } from "react";
import { Navbar, Footer,CastCard } from "../components";
import { useParams } from "react-router-dom";
import "../style/movieInfo.css";
import Login  from "./Login";
import { apis ,API_KEY} from "../data/api";
import axios from "axios";
import YouTube from "react-youtube";

function MovieInfo() {
  const [movie, setMovie] = useState([]);
  const [video,setVideo] = useState([]);
  const [cast,setCast] = useState([]);
  let { id } = useParams();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (!userId) {
      return <Login />;
    } else {
      let movie_details = axios.get(`${apis.MovieDetails}/${id}?api_key=${API_KEY}`)
      let movie_video = axios.get(`${apis.MovieDetails}/${id}/videos?api_key=${API_KEY}`);
      let movie_cast = axios.get(`${apis.MovieDetails}/${id}/credits?api_key=${API_KEY}`)
      axios.all([movie_details,movie_video,movie_cast]).then(
        axios.spread((...allData)=>{
          const details = allData[0].data
          const video = allData[1].data.results.slice(-1)[0]
          const cast = allData[2].data.cast.slice(0,10)
          setMovie(details);
          setVideo(video);
          setCast(cast);
        })
      )
    }
  },[]);


  const opts = {
    height: '300',
    width: '640',
    playerVars: {
      autoplay: 0,
    }
  }

  console.log(movie);

  return (
    <>
      {movie.title &&
        <>
          <Navbar />
          <div className="movieInfo">
            <div className="movieInfo__banner">
              <img src={`${apis.ImageUrl}${movie.backdrop_path}`} alt="" />
            </div>
            <div className="movieInfo__info">
              <div className="movieInfo__left">
                <img src={`${apis.ImageUrl}${movie.poster_path}`} alt="" />
              </div>
              <div className="movieInfo__right">
                <p className="title">{movie.name || movie.title}</p>
                <div className="buttons">
                  {movie.imdb_id && <a className="imdb" href={`https://www.imdb.com/title/${movie.imdb_id}/`}><button>IMDb</button></a>}
                  {movie.homepage && <a className="homepage" href={movie.homepage}><button>Homepage</button></a>}
                </div>
                <div className="genres">
                  {movie.genres.map((g,key)=>{
                    return(
                      <span className="genre" key={key}><span className="sep">&#8226;</span>{g.name}</span>
                    )
                  })}
                  <span className="sep">&#8226;</span>
                </div>
                <p className="tagline">{movie.tagline}</p>
                <p className="overview">{movie.overview}</p>
                <p className="vote">{movie.vote_average}&nbsp;|&nbsp;{movie.vote_count}&nbsp;votes</p>
                <p className="date">Release Date : {movie.release_date}</p>
                <p className="duration">Duration : {movie.runtime} m</p>
              </div>
            </div>
            <>
              {cast.length > 0 && 
                <>
                <h2 className="cast__title">Cast</h2>
                <div className="cast__list">
                  {cast.map((c,key)=>{
                    return(
                      <CastCard imageUrl={apis.ImageUrl} key={key} cast={c}/>
                    )
                  })}
                </div>
                </>
              }
            </>
            <div className="movieInfo__video">
              <h2>{video?.name}</h2>
              <YouTube
                className='video'
                opts={opts}
                videoId={video?.key}
              />
            </div>
          </div>
          <Footer />
        </>
      }
    </>
  );
}

export default MovieInfo;
