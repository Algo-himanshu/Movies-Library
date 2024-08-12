const mongoose = require("mongoose");

const { Schema } = mongoose;

const movieInfo = new Schema({
  title: { type: String },
  director: { type: String },
  genre: { type: String },
  releaseYear: { type: String },
  movieTitle: { type: String },
  price: { type: String },
  // Using `Date` type for timestamps
  timestamps: { type: Date, default: Date.now },
});

module.exports = mongoose.model("movie", movieInfo);
