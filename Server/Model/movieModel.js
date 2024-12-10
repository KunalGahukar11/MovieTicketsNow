const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    poster: { type: String },
    release_date: { type: String },
    genre: { type: [String] },
    rating: { type: Number },
  },
  { timeStamp: true }
);

const movieModel = new mongoose.model("movies", moviesSchema);

module.exports = movieModel;
