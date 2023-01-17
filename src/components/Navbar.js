import React, { useState } from "react";
import "../style/navbar.css";
import logo from "../assets/logo.png";
import {
  HomeIcon,
  MovieCreationOutlinedIcon,
  LiveTvIcon,
} from "./icons";
import { NavLink,useNavigate } from "react-router-dom";

function Navbar(){
  const navigate = useNavigate()
  const [scroll,setSroll]= useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setSroll(true)
    } else {
      setSroll(false)
    }
  }
  window.addEventListener('scroll', changeBackground);
  
  const logout=()=>{
    localStorage.removeItem('userId');
    navigate('/login')
  }


  return (
    <div className={scroll ? 'navbar scroll' : 'navbar'}>
      <div className="navbar__left">
        <img src={logo} alt="" />
      </div>
      <div className="navbar__routes">
        <NavLink to="/">
          <HomeIcon sx={{ fontSize: 20 }} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/movies">
          <MovieCreationOutlinedIcon sx={{ fontSize: 20 }} />
          <span>Movies</span>
        </NavLink>
        <NavLink to="/tv">
          <LiveTvIcon sx={{ fontSize: 20 }} />
          <span>TV Series</span>
        </NavLink>
      </div>
      <div className="navbar__right">
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
}

export default Navbar;
