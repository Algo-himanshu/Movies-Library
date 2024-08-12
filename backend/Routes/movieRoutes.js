// routes/movieRoutes.js

const express = require("express");
const Movie = require("../Models/Movie");

const router = express.Router();

// READ all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching movies");
  }
});

// ADD movie
router.post("/add", async (req, res) => {
  try {
    const { title, director, genre, releaseYear, movieTitle, price } = req.body;
    console.log(req.body);
    const newMovie = new Movie({
      title,
      director,
      genre,
      releaseYear,
      movieTitle,
      price,
    });
    await newMovie.save();
    res.status(201).send("Movie added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding movie");
  }
});

// EDIT movie
router.put("/:id", async (req, res) => {
  try {
    const { director, year, genre } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { director, year, genre },
      { new: true }
    );
    res.json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating movie");
  }
});

// DELETE movie
router.delete("/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting movie");
  }
});

module.exports = router;
