const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const morgan = require("morgan");
const cors = require("cors");

const socketApi = require("./socketApi")(io);

require("./utils/db");

const moviesRouter = require("./routes/movies");
const movieRouter = require("./routes/movie");
const searchRouter = require("./routes/search");

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use("/movies", moviesRouter);
app.use("/movie", movieRouter);
app.use("/search", searchRouter);

server.listen(3001, () => {
  console.log("listening on *:3001");
});
