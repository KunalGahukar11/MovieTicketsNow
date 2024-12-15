const express = require("express");
const app = express();
require("dotenv").config(); // loading env variables

const userRouter = require("./Routes/userRoutes");
const dbConnection = require("./Config/dbConfig");
const movieRouter = require("./Routes/moviesRoutes");
const theatreRouter = require("./Routes/theatreRoutes");

dbConnection();

/** Routes */
app.use(express.json()); // parse JSON bodies
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);

app.listen(8082, (err) => {
  if (!err) {
    console.log("server is up and running");
  } else {
    console.log("Something wrong", err);
  }
});
