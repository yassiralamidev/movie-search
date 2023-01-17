import React,{useState,useEffect} from 'react'
import '../style/tv.css'
import { Navbar, Footer,MovieCard } from "../components";
import { SearchIcon } from "../components/icons";
import { Login } from "../pages/index";
import axios from "axios";
import { apis } from "../data/api";

function Tv() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [tv,setTv] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (!userId) {
      return <Login />;
    } else {
      if (!search) {
        axios
          .get(`${apis.DiscoverTv}&page=${currentPage}`)
          .then((res) => {
            setData(res.data);
            setTv(res.data.results)
          });
      } else {
        axios
          .get(`${apis.SearchTv}&query=${search}&page=${currentPage}}`)
          .then((res) => {
            setData(res.data);
            setTv(res.data.results)
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

  return (
    <>
      <Navbar/>
      <div className='tvPage'>
      <div className="tvPage__header">
          <p>Discover TV Series</p>
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
        <div className="tvPage__list">
          {tv.length > 0 ? tv.map((tv,key)=>{
            return(
              <MovieCard key={key} data={tv} imageUrl={apis.ImageUrl} />
            )
          }) : <h1>Loading</h1>}
        </div>
        <div className="tvPage__buttons">
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
      <Footer/>
    </>
  )
}

export default Tv