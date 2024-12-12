const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    poster: { type: String },
    description: { type: String, required: true },
    release_date: { type: String, required: true },
    duration: { type: Number, required: true },
    language: { type: [String], required: true },
    genre: { type: [String], required: true },
    rating: { type: Number },
  },
  { timestamps: true }
);

const movieModel = new mongoose.model("movies", moviesSchema);

module.exports = movieModel;
