import React from 'react'
import '../style/home.css'
import Login from './Login';
import {Navbar,Carousel,Row,Footer} from '../components'
import { apis } from '../data/api';

function Home() {
  const userId = localStorage.getItem('userId');
  if (!userId){
    return <Login/>
  }

  return (
    <>
      <Navbar/>
      <div className='home'>
        <Carousel/>
        <div className='home__rows'>
          <Row title='Now Playing' data={apis.NowPlaying} imageUrl={apis.ImageUrl}/>
          <Row title='Upcomming' data={apis.Upcomming} imageUrl={apis.ImageUrl}/>
          <Row title='Trending Now' data={apis.TrendingNow} imageUrl={apis.ImageUrl}/>
          <Row title='Popular'data={apis.PopularMovies}  imageUrl={apis.ImageUrl}/>
        </div>
        <div className='home__footer'>
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default Home