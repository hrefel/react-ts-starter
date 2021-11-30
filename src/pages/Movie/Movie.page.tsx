import React, {
  Component,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import "./movie.css";
import axios from "axios";
import MovieService from "../../services/Movie.service";
import Autocomplete from "../../component/Autocomplete/Autocomplete";
import Loader from "../../component/Loader/Loader.component";
import Modal from 'react-modal';
import { render } from "react-dom";

interface iMovie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface MovieTypesState {
  movie: any[];
}

// Modal.setAppElemet("#root")
export default function Movie() {
  
  const [movieList, setMovieList] = useState<iMovie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [canLoad, setCanLoad] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  window.onscroll = () => {
    if (
      window.innerHeight + document.body.scrollTop ===
      document.body.offsetHeight
    ) {
      if (!noData && !loading && canLoad) {
        loadMovieList(page);
      }
    }
  };

  useEffect(() => {
    loadMovieList(page);
    
  }, []);

  const loadMovieList = (pages: any) => {
    console.log(pages);
    setLoading(true);
    setTimeout(() => {
      MovieService.getMovieList(pages)
        .then((res: any) => {
          const newPage = pages + 1;
          const newList = movieList.concat(res.data.Search);
          if (res.data.Search.length > 5) {
            setCanLoad(true);
          }
          const items = [
            {
              id: 0,
              name: "Cobol",
            },
            {
              id: 1,
              name: "JavaScript",
            },
            {
              id: 2,
              name: "Basic",
            },
            {
              id: 3,
              name: "PHP",
            },
            {
              id: 4,
              name: "Java",
            },
          ];
          if (res.data.Response !== "False") {
            setMovieList(newList);
            setPage(newPage);
          } else {
            setCanLoad(false);
          }

          if (res.data.length === 0) {
            setNoData(true);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }, 1000);
  };

  const openModal = () => {
    setModalOpen(true);
  }
  
  return (
    <div className="content-movie">
      <div className="search">
        <Autocomplete />
      </div>
      <div className="article-wrapper" onClick={openModal}>
        <div className="wrapper">
          {movieList.map((movie, i) => (
            
            <article onClick={openModal} key={i}>
              <div className="poster">
                <img
                  src={
                    movie.Poster === "N/A"
                      ? "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"
                      : movie.Poster
                  }
                  alt={movie.Title}
                  loading="lazy"
                />
              </div>

              <div className="article-desc">
                <span className="movie-title">{movie.Title}</span>
                <span className="movie-year">{movie.Year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        contentLabel="Example Modal"
      ></Modal>

      {loading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : (
        ""
      )}
      {/* {noData ? <div className="text-center">no data anymore ...</div> : ""} */}
    </div>
  );
}
