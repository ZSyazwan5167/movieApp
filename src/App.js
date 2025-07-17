import React from "react";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";

import './App.css';
import SearchIcon from './search.svg';

//http://www.omdbapi.com/?i=tt3896198&apikey=16e61d2d

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=16e61d2d";

const movie1 = {    
    "Title": "Spiderman the Verse",
    "Year": "2019",
    "imdbID": "tt12122034",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDBjNWY3OWYtMjk2ZS00NjA2LWE0NzAtOWQxNzBhNjZlMGYyXkEyXkFqcGc@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies("Spiderman");
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}>
                </input>
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0 ? 
                (   
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />))}
                    </div>
                ) 
                : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }

            
        </div>
    );
}

export default App;