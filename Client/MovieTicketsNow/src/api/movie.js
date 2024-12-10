import { axiosInstance } from ".";

// to add movies by admin
export const addMovie = async (value) => {
  try {
    const movie = await axiosInstance.post("/api/movies/add-movie", value);
    return movie.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

// to get movies
export const getAllMovies = async () => {
  try {
    const movies = await axiosInstance.get("/api/movies/all-movies");
    return movies.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};
