const axios = require("axios");
const { nameOfApi, creator } = require("./important");
const { fetchData } = require("./funcs");

const apiCommands = function (io) {
  const getMessage = (reqType, moviesLength) => {
    if (reqType === "movies-playing")
      return `Here are ${moviesLength} movies that are currently playing.`;
    else if (reqType === "top-rated")
      return `Here are ${moviesLength} top-rated movies:`;
    else if (reqType === "upcoming") return "Upcoming movies:";

    return "";
  };

  const getMovies = async (socket, reqType) => {
    const fetchedMovies = await fetchData({
      reqType: reqType,
      movie: null,
      page: 1,
    });
    const movies = fetchedMovies.movies.map((elm) => elm["title"]);
    io.to(socket.id).emit("server chat message", getMessage(reqType, movies.length));
    io.to(socket.id).emit("server chat message", movies.join(", "));
  };

  const commands = {
    moviesPlaying: async function (socket) {
      getMovies(socket, "movies-playing");
    },

    topRated: async function (socket) {
      getMovies(socket, "top-rated");
    },

    upcoming: async function (socket) {
      getMovies(socket, "upcoming");
    },

    // genres: async function (socket) {
    //   const fetchedMovies = await fetchData("genres");
    //   const movies = fetchedMovies.map((elm) => elm["name"]);
    //   io.to(socket.id).emit("server chat message", `Genres:`);
    //   io.to(socket.id).emit("server chat message", movies.join(", "));
    // },

    apiCreator: function (socket) {
      io.to(socket.id).emit("server chat message", creator);
    },

    showCommands: function (socket) {
      io.to(socket.id).emit("commands", Object.keys(this));
    },

    clearChat: function (socket) {
      io.to(socket.id).emit("user chat message", "clear");
      io.to(socket.id).emit(
        "server chat message",
        `Welcome to ${nameOfApi}! Please make a request.`
      );
      io.to(socket.id).emit("commands", Object.keys(this));
    },
  };

  return {
    "currently playing": commands.moviesPlaying,
    "top rated": commands.topRated,
    "upcoming": commands.upcoming,
    "Who created this API?": commands.apiCreator,
    // "Get genres": commands.genres,
    clear: commands.clearChat,
    "show commands": commands.showCommands,
  };
};

module.exports = apiCommands;
