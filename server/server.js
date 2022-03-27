const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CLIENT,
    methods: ["GET", "POST"],
  },
});
const morgan = require("morgan");
const cors = require("cors");

require("./chat/socketApi")(io);
require("./utils/db");
require("./utils/authenticate");
require("./strategies/JwtStrategy");

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);
app.use(passport.initialize());

const moviesRouter = require("./routes/movies");
const movieRouter = require("./routes/movie");
const searchRouter = require("./routes/search");
const trendingRouter = require("./routes/trending");

app.use("/movies", moviesRouter);
app.use("/movie", movieRouter);
app.use("/search", searchRouter);
app.use("/trending", trendingRouter);

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
