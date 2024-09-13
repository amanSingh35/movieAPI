import { useState, useEffect } from 'react';
import './App.css';
import searchIcon from './search.svg';
import MovieCard from './MovieCard';

// Updated API_URL to use HTTPS
const API_URL = 'https://www.omdbapi.com/?apikey=bbce9def';

const App = () => {
  const [Movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Check if data.Search exists before setting state
      setMovies(data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]); // Clear movies if there is an error
    }
  }

  useEffect(() => {
    searchMovies('mission impossible');
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
         
      {
        Movies.length > 0 ? (
          <div className="container">
            {Movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} /> {/* Added key prop */}
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies found</h2>
          </div>
        )
      }
    </div>
  );
}

export default App;
