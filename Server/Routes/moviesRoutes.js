const express = require("express");
const { createMovies, getAllMovies } = require("../Controller/movieController");
const movieRouter = express.Router();

movieRouter.post("/add-movie", createMovies);

movieRouter.get("/all-movies", getAllMovies);

module.exports = movieRouter;
