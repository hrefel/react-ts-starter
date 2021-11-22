import React, { Component, FunctionComponent } from "react";
import "./movie.css";
import axios from "axios";

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

export default class Movie extends React.Component<{}, MovieTypesState> {
  constructor(props: any) {
    super(props);
    this.state = {
      movie: [],
    };

    this.getDataMovie.bind(this);
  }

  getDataMovie() {
    axios
    .get("http://www.omdbapi.com/?apikey=faf7e5bb&s=Spy&page=1")
    .then((res) => {

      const movie = res.data.Search;
      this.setState({ movie });
      console.log("state 2 => ",this.state);
    });
  }

  componentDidMount() {
    try {
      this.getDataMovie();
      console.log("state => ", this.state);
    } catch (error) {
      console.log(error);
    }
  }

  render(): React.ReactNode {
    const { movie } = this.state;
    console.log("movie => ",movie);
    let el = [];

    for (let i = 0; i < movie.length; i++) {
      console.log(movie);
      el.push(
        <div className="card-movie">
          <img src={movie[i].Poster} />
          <div className="card-movie-desc">
            <span className="movie-title">{movie[i].Title}</span>
            <span className="movie-year">{movie[i].Year}</span>
          </div>
        </div>
      );
    }
    return <div className="content-movie">{el}</div>;
  }
}
