import React, { useState } from "react";
import axios from "axios";

const MovieCard = ({ movie, toggleFavorite, isFavorite, API_KEY }) => {
  const [providers, setProviders] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openDetails = async () => {
    try {
      // Fetch both Watch Providers AND Videos (Trailers) simultaneously
      const [providerRes, videoRes] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers`,
          { params: { api_key: API_KEY } }
        ),
        axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, {
          params: { api_key: API_KEY },
        }),
      ]);

      setProviders(providerRes.data.results?.US || {});

      // Find the first video that is a "Trailer" on YouTube
      const trailer = videoRes.data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailerKey(trailer ? trailer.key : null);

      setShowModal(true);
    } catch (err) {
      console.error("Error fetching movie details", err);
    }
  };

  return (
    <div className="movie-card">
      <button
        className={`fav-button ${isFavorite ? "active" : ""}`}
        onClick={() => toggleFavorite(movie)}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <button className="watch-btn" onClick={openDetails}>
          🎬 Details & Trailer
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-x"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            {trailerKey ? (
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="YouTube trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="no-trailer">No trailer available</div>
            )}

            <h2>{movie.title}</h2>

            <div className="provider-section">
              <h4>Available on:</h4>
              <div className="provider-list">
                {providers?.flatrate ? (
                  providers.flatrate.map((p) => (
                    <div key={p.provider_id} className="provider-item">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${p.logo_path}`}
                        alt={p.provider_name}
                        className="provider-logo"
                      />
                    </div>
                  ))
                ) : (
                  <p>Search for purchase options.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
