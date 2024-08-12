import React, { useState, useEffect } from "react";
import axios from "axios";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [editMovieId, setEditMovieId] = useState(null); // Track the ID of the movie being edited

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get("http://localhost:5000/movies");
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovies();
  }, []);

  const handleEdit = async (id, updatedMovie) => {
    try {
      await axios.put(`http://localhost:5000/movies/${id}`, updatedMovie);
      // Update the movie list after successful edit
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === id ? { ...movie, ...updatedMovie } : movie
        )
      );
      alert("Movie updated successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setEditMovieId(null); // Reset the editMovieId state to close the edit form
    }
  };

  return (
    <div>
      <h2>Movie List</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <h3>{movie.movieTitle}</h3>
            <p>
              <strong>Title:</strong> {movie.title}
            </p>
            <p>
              <strong>Director:</strong> {movie.director}
            </p>
            <p>
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p>
              <strong>Release Year:</strong> {movie.releaseYear}
            </p>
            <p>
              <strong>Price:</strong> {movie.price}
            </p>
            {/* Toggleable edit form */}
            {editMovieId === movie._id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const updatedMovie = {
                    director: e.target.director.value,
                    year: e.target.year.value,
                    genre: e.target.genre.value,
                  };
                  handleEdit(movie._id, updatedMovie);
                }}
              >
                <input
                  type="text"
                  name="director"
                  placeholder="Director"
                  defaultValue={movie.director}
                />
                <input
                  type="number"
                  name="year"
                  placeholder="Year"
                  defaultValue={movie.year}
                />
                <input
                  type="text"
                  name="genre"
                  placeholder="Genre"
                  defaultValue={movie.genre}
                />
                <button type="submit">Save</button>
              </form>
            ) : (
              <button onClick={() => setEditMovieId(movie._id)}>Edit</button>
            )}
            {/* Delete button */}
            <button
              onClick={async () => {
                try {
                  await axios.delete(
                    `http://localhost:5000/movies/${movie._id}`
                  );
                  // Update the movie list after successful delete
                  setMovies((prevMovies) =>
                    prevMovies.filter((m) => m._id !== movie._id)
                  );
                  alert("Movie deleted successfully");
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
