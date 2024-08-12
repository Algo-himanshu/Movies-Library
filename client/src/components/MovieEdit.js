// components/MovieEdit.js

import React, { useState, useEffect } from "react";
import axios from "axios";

function MovieEdit({ match }) {
  const [director, setDirector] = useState("");
  const [year, setYear] = useState(0);
  const [genre, setGenre] = useState("");

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(
          `http://localhost:5000/movies/${match.params.id}`
        );
        const { director, year, genre } = response.data;
        setDirector(director);
        setYear(year);
        setGenre(genre);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovieDetails();
  }, [match.params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/movies/${match.params.id}`, {
        director,
        year,
        genre,
      });
      // Redirect or show success message
      console.log("Movie updated successfully");
      alert("Movie updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default MovieEdit;
