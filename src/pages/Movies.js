import React, { useState, useEffect } from 'react'; // Hook useState for movie list and useEffect for pulling data from localStorage
import './Movies.css'; // Page style file

const Movies = () => {
  const [movies, setMovies] = useState([]); // movies stores the movie list and setMovies updates the list

  useEffect(() => { // Loading movie list from localStorage
    const savedMovies = localStorage.getItem('permanentMovies');
    if (savedMovies) {
      console.log('Loaded movies from permanentMovies:', JSON.parse(savedMovies));
      setMovies(JSON.parse(savedMovies));
    }
  }, []);

  return ( // Displays list of movies retrieved
    <div className="movies-container">
      <h1>My Saved Movies To Watch</h1>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              {movie.title} {/* Access movie titles property for each object */}
            </div>
          ))
        ) : (
          <p className="no-movies">No movies saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
