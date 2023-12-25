import React from "react";
import "./App.css";

function App() {
  const [movieName, setMovieName] = React.useState("");
  const [movieData, setMovieData] = React.useState([]);
  console.log("Test...");
  async function fetchData(e) {
    if (e.key === "enter" || e.type === "click") {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${movieName}`
      );
      const data = await response.json();
      setMovieData(data.results);
      setMovieName("");
    }
  }

  return (
    <div className="App">
      <div className="navbar">
        <h4>Movie Search</h4>
        <span>
          <input
            type="text"
            name="search"
            id="movie-search"
            value={movieName}
            placeholder="Search Movie by name.."
            onChange={(e) => setMovieName(e.target.value)}
            autoComplete="off"
          />
          <button onClick={fetchData}>Search</button>
        </span>
      </div>
      <div className="movie-list">
        {movieData.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <h4>{movie.title}</h4>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
            />
            <span className="movie-desc">
              <p>{new Date(movie.release_date).toLocaleDateString("en-GB")}</p>
              <p>{movie.original_language}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
