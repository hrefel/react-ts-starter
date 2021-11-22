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

// export default class Movie extends React.Component<{}, MovieTypesState> {

//   constructor(props: any) {

//     super(props);
//     const [movieList, setMovieList] = useState([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [noData, setNoData] = useState(false);

//     this.state = {
//       movie: [],
//     };

//     this.getDataMovie.bind(this);
//   }

//   getDataMovie() {
//     axios
//     .get("http://www.omdbapi.com/?apikey=faf7e5bb&s=Spy&page=1")
//     .then((res) => {

//       const movie = res.data.Search;
//       this.setState({ movie });
//       console.log("state 2 => ",this.state);
//     });
//   }

//   componentDidMount() {
//     try {
//       this.getDataMovie();
//       console.log("state => ", this.state);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   render(): React.ReactNode {
//     const { movie } = this.state;
//     console.log("movie => ",movie);
//     let el = [];

//     for (let i = 0; i < movie.length; i++) {
//       console.log(movie);
//       el.push(
//         <div className="card-movie">
//           <img src={movie[i].Poster} />
//           <div className="card-movie-desc">
//             <span className="movie-title">{movie[i].Title}</span>
//             <span className="movie-year">{movie[i].Year}</span>
//           </div>
//         </div>
//       );
//     }
//     return <div className="content-movie">{el}</div>;
//   }
// }

export default function Movie() {
  const [movieList, setMovieList] = useState<iMovie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [canLoad, setCanLoad] = useState(true)

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

          if(res.data.Response !== "False") {
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

  return (
    <div className="content-movie">
      
      <div className="search">
        <Autocomplete suggestions={["Oranges", "Apples", "Banana", "Kiwi", "Mango"]} />
      </div>
      {movieList.map((movie, i) => (
        <div className="card-movie" key={i}>
          <img
            src={
              movie.Poster === "N/A"
                ? "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"
                : movie.Poster
            }
          />
          <div className="card-movie-desc">
            <span className="movie-title">{movie.Title}</span>
            <span className="movie-year">{movie.Year}</span>
          </div>
        </div>
      ))}
      
      {loading ? <div className="loader-wrapper"><Loader /></div> : ""}
      {/* {noData ? <div className="text-center">no data anymore ...</div> : ""} */}
    </div>
  );
}
