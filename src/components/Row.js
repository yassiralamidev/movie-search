import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../style/row.css'
import MovieCard from './MovieCard';

function Row({title,data,imageUrl}) {
  const [movies,setMovies] = useState([])
  const getMovies = () => {
    axios.get(data).then((res) => setMovies(res.data.results.slice(10,14)));
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className='row'>
      <p>{title}</p>
      <div className='row__movies'>
        {movies.length > 0 && 
          movies.map((m,key)=>{
            return <MovieCard key={key} imageUrl={imageUrl} data={m}/>
          })
        }
      </div>
    </div>
  )
}

export default Row