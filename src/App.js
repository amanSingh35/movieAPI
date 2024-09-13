import { useState, useEffect } from 'react';
import './App.css';
import searchIcon from './search.svg';
import MovieCard from './MovieCard';
const API_URL = 'http://www.omdbapi.com/?apikey=bbce9def';

const App = () => {
  const [Movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const searchMovies = async (title) => {
    setLoading(true);
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    
    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setMovies([]);
      console.error(data.Error);
    }
    setLoading(false);
  };

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
          onClick={() => {
            if (searchTerm.trim()) {
              searchMovies(searchTerm);
            }
          }}
        />
      </div>
         
      {loading ? (
        <div className="loading">Loading...</div>
      ) : Movies?.length > 0 ? (
        <div className="container">
          {Movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
