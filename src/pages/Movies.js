import React, { useEffect, useState } from "react";
import "../style/movies.css";
import { Navbar, Footer ,MovieCard} from "../components";
import { SearchIcon } from "../components/icons";
import { Login } from "../pages/index";
import axios from "axios";
import { apis } from "../data/api";

function Movies() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [movies,setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (!userId) {
      return <Login />;
    } else {
      if (!search) {
        axios
          .get(`${apis.DiscoverMovies}&page=${currentPage}`)
          .then((res) => {
            setData(res.data);
            setMovies(res.data.results)
          });
      } else {
        axios
          .get(`${apis.SearchMovie}&query=${search}&page=${currentPage}}`)
          .then((res) => {
            setData(res.data);
            setMovies(res.data.results)
          });
      }
    }
  }, [search, userId, currentPage]);

  const previous = () => {
    if (currentPage > 1) {
      window.scroll(0, 0);
      setCurrentPage(currentPage - 1);
    }
  };
  const next = () => {
    if (currentPage < data.total_pages) {
      window.scroll(0, 0);
      setCurrentPage(currentPage + 1);
    }
  };
  // console.log(currentPage);
  // console.log(data);
  return (
    <>
      <Navbar />
      <div className="moviesPage">
        <div className="moviesPage__header">
          <p>Discover Movies</p>
          <div className="inputField">
            <SearchIcon />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search something here..."
            />
          </div>
        </div>
        <div className="moviesPage__list">
          {movies.length > 0 ? movies.map((movie,key)=>{
            return(
              <MovieCard key={key} data={movie} imageUrl={apis.ImageUrl}/>
            )
          }) : <h1>Loading</h1>}
        </div>
        <div className="moviesPage__buttons">
          <button
            onClick={previous}
            className={currentPage === data.page ? "disabled" : null}
            disabled={currentPage === data.page ? true : false}
          >
            Previous
          </button>
          <button
            onClick={next}
            className={currentPage === data.total_pages ? "disabled" : null}
            disabled={currentPage === data.total_pages ? true : false}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Movies;
