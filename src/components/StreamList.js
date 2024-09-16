import React, { useState , useEffect } from 'react'; // Hook useState Initialization useEffect
import { v4 as uuidv4 } from 'uuid'; // Import uuid function
import logo from '../images/Logo.png'; // EZTechMovie logo
import './StreamList.css'; // SteamList page syling

const StreamList = () => {
  const [input, setInput] = useState(''); // Holds input for movies
  const [movies, setMovies] = useState([]); // Stores movie titles  

  useEffect(() => {
    const savedMovies = localStorage.getItem('movies'); // Retrieves movie list to localStorage movies
    const isCleared = localStorage.getItem('isCleared'); // If it has been cleared, starts a new list

    if (savedMovies && isCleared !== 'true') {
        setMovies(JSON.parse(savedMovies)); // IF the movie list has been cleared, do not reload the saved movie list
    }
  }, []);

  useEffect(() => { // This will run only if something changes to movies
    if (movies.length > 0) { // Checks to see if movies is empty before saving the movie list
      localStorage.setItem('movies', JSON.stringify(movies)); // Saves movie list if it is not empty to movies
    }
  },[movies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMovie = { id: uuidv4(), title: input }; // Generates unique id for each movie
      setMovies((prevMovies) => [...prevMovies, newMovie]); // Add the new movie
      setInput(''); // Clear the input field
    }
  };

  const handleSaveandClear = () => {
    // Save current movies to 'permanentMovies' before clearing
    const savedPermanentMovies = JSON.parse(localStorage.getItem('permanentMovies')) || [];
    const updatedPermanentMovies = [...savedPermanentMovies, ...movies]; // Combine existing with new

    localStorage.setItem('permanentMovies', JSON.stringify(updatedPermanentMovies)); // Save combined list

    // Clear the 'movies' list and the localStorage key
    setMovies([]); 
    localStorage.removeItem('movies');
    localStorage.setItem('isCleared', 'true'); // Set flag to indicate clearing
  };

  return (
    <div className="streamlist-container">
      <img src={logo} alt="Logo" className="logo" />
      <h1>StreamList</h1>
      <h2 className="add-movie-message">Add a Movie to Your List Below!</h2>
      <form onSubmit={handleSubmit}> 
        <input
          type="text"
          id="movie-title"
          name="movieTitle"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Movie Title"
        />
        <button type="submit" disabled={!input.trim()}>Submit</button> {/* Disabled when input is empty */}
      </form>

      <div className="movie-list"> 
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-item"> {/* Use uuid as key */}
                {movie.title}
            </div>
          ))
        ) : (
          <p className="no-movies-message">No Movies Added Yet</p>
        )}
        </div>
        <button type="button" onClick={handleSaveandClear}>Save and Clear Movie List</button>
    </div>
  );
};

export default StreamList;