require("dotenv").config();

const users = new Set();
const nameOfApi = process.env.NAME_OF_API;
const creator = process.env.CREATOR;
const apiKey = process.env.MOVIES_API_KEY;
const MONGO_DB = process.env.MONGO_DB_CONNECTION_STRING;

const reqUrls = {
  'movies-playing': `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&region=US`,
  'top-rated': `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`,
  'upcoming': `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&region=US`,
  'genres': `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`,
  'search': `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&include_adult=false`,
  'movie': ['https://api.themoviedb.org/3/movie/', `?api_key=${apiKey}&language=en-US`]
};

const possibleRequests = Object.keys(reqUrls);

module.exports = { users, nameOfApi, creator, reqUrls, possibleRequests, MONGO_DB};
