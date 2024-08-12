// components/MovieDelete.js

import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function MovieDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:5000/movies/${id}`);
        navigate("/movies");
      } catch (error) {
        console.error(error);
      }
    };

    handleDelete(); // Automatically trigger deletion on component mount
  }, [id, navigate]);

  return (
    <div>
      <h2>Delete Movie</h2>
      <p>Are you sure you want to delete this movie?</p>
    </div>
  );
}

export default MovieDelete;
