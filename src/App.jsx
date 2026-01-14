import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "./App.css";

const API_KEY = "your-api-key-here";
const BASE_URL = "your-base-url";

const GENRES = {
  Action: 28,
  Horror: 27,
  Comedy: 35,
  Drama: 18,
  Fantasy: 14,
  Romance: 10749,
  Mystery: 9648,
  "Sci-Fi": 878,
  Thriller: 53,
  Animation: 16,
};

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [loading, setLoading] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("cinema-soulmate-favs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cinema-soulmate-favs", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `${BASE_URL}/discover/movie`;
        let params = {
          api_key: API_KEY,
          language: "en-US",
          sort_by: "popularity.desc",
          "vote_count.gte": 50,
        };

        if (searchQuery) {
          url = `${BASE_URL}/search/movie`;
          params.query = searchQuery;
        } else {
          // Join array [28, 35] into "28,35" for the API
          params.with_genres = selectedGenres.join(",");
        }

        const response = await axios.get(url, { params });
        setMovies(response.data.results);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchData, 500);
    return () => clearTimeout(timeoutId);
  }, [selectedGenres, searchQuery]);

  const toggleGenre = (genreId) => {
    setSearchQuery("");
    setShowFavoritesOnly(false);
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      prev.find((f) => f.id === movie.id)
        ? prev.filter((f) => f.id !== movie.id)
        : [...prev, movie]
    );
  };

  const displayedMovies = showFavoritesOnly ? favorites : movies;

  return (
    <div className="App">
      <header>
        <h1>Cinema Soulmate</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      <div className="controls">
        <div className="genre-mixer">
          {Object.keys(GENRES).map((name) => {
            const id = GENRES[name];
            const isSelected = selectedGenres.includes(id);
            return (
              <button
                key={id}
                className={`genre-chip ${isSelected ? "active" : ""}`}
                onClick={() => toggleGenre(id)}
              >
                {name} {isSelected && "✕"}
              </button>
            );
          })}
          {selectedGenres.length > 0 && (
            <button
              className="clear-link"
              onClick={() => setSelectedGenres([])}
            >
              Clear All
            </button>
          )}
        </div>

        <button
          className={`view-favs-btn ${showFavoritesOnly ? "active" : ""}`}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          {showFavoritesOnly
            ? "⬅ Back to Discover"
            : `❤️ My Favorites (${favorites.length})`}
        </button>
      </div>

      <main className="movie-grid">
        {loading ? (
          <p className="status-msg">Searching for matches...</p>
        ) : displayedMovies.length > 0 ? (
          displayedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.some((fav) => fav.id === movie.id)}
              API_KEY={API_KEY}
            />
          ))
        ) : (
          <p className="status-msg">
            No movies found. Try a different combination!
          </p>
        )}
      </main>

      <footer className="signature">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://github.com/little-software-engineer"
            target="_blank"
            rel="noopener noreferrer"
          >
            little-software-engineer
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
