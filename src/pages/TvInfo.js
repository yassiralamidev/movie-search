import React, { useEffect, useState } from 'react'
import '../style/tvInfo.css'
import { Navbar, Footer,CastCard } from "../components";
import { apis, API_KEY} from '../data/api'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Login from '../pages/Login'
import YouTube from "react-youtube";

function TvInfo() {

  const [tv,setTv] = useState([]);
  const [video,setVideo]= useState([]);
  const [cast,setCast] = useState([]);
  let { id } = useParams();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      return <Login />;
    } else {
      let tv_details = axios.get(`${apis.TvDetails}/${id}?api_key=${API_KEY}`)
      let tv_video = axios.get(`${apis.TvDetails}/${id}/videos?api_key=${API_KEY}`);
      let tv_cast = axios.get(`${apis.TvDetails}/${id}/credits?api_key=${API_KEY}`)
      axios.all([tv_details,tv_video,tv_cast]).then(
        axios.spread((...allData)=>{
          const details = allData[0].data
          const video = allData[1].data.results.slice(-1)[0]
          const cast = allData[2].data.cast.slice(0,10)
          setTv(details);
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


  console.log(tv)


  return (
    <>
      <Navbar/>
      {tv && 
        <div className='tvInfo'>
          <div className="tvInfo__banner">
            {tv.backdrop_path && <img src={`${apis.ImageUrl}${tv.backdrop_path}`} alt="" />}
          </div>
          <div className="tvInfo__info">
              <div className="tvInfo__left">
                {tv.poster_path && <img src={`${apis.ImageUrl}${tv.poster_path}`} alt="" />}
              </div>
              <div className="tvInfo__right">
                <p className="title">{tv.name || tv.title}</p>
                <div className="buttons">
                  {tv.homepage && <a className="homepage" href={tv.homepage}><button>Homepage</button></a>}
                </div>
                <p className="tagline">{tv.tagline}</p>
                <p className="overview">{tv.overview}</p>
                <p className="vote">{tv.vote_average}&nbsp;|&nbsp;{tv.vote_count}&nbsp;votes</p>
                <p className="date">First Air Date : {tv.first_air_date}</p>
                <p className='nb_seasons'>Number of seasons :{tv.number_of_seasons}</p>
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
          <div className="tvInfo__video">
              <h2>{video?.name}</h2>
              <YouTube
                className='video'
                opts={opts}
                videoId={video?.key}
              />
            </div>
        </div>
      }
      <Footer/>
    </>
  )
}

export default TvInfo