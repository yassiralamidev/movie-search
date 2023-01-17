import './App.css';
import {Login,Signup,Home,Tv,Movies,MovieInfo,TvInfo} from "./pages/index"
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/tv' element={<Tv/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path="/movie/:id" element={<MovieInfo/>}/>
        <Route path="/tv_show/:id" element={<TvInfo/>}/>
      </Routes>
    </div>
  );
}

export default App;
