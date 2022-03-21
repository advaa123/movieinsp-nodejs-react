const axios = require("axios");
const { reqUrls } = require("./config");

const setUrl = (reqType, movie, page) => {
  let url = reqUrls[reqType];
  if (reqType === "movie" && movie) {
    return `${url[0]}${movie}${url[1]}`;
  }
  if (reqType === "search" && movie) {
    url = `${url}&query=${movie}`;
  }

  url = `${url}&page=${page}`;
  return url;
};

const getResults = (data) => {
  const movies = data["results"].map((elm) => ({
    id: elm["id"],
    title: elm["title"],
    img: elm["poster_path"],
    backdrop: elm["backdrop_path"],
    overview: elm["overview"],
    popularity: elm["popularity"],
    vote_count: elm["vote_average"],
    video: elm["video"],
    genre_ids: elm["genre_ids"],
  }));

  return { movies, total_pages: data["total_pages"] };
};

const getMovieDetails = (data) => {
  return data;
};

const fetchData = async ({ reqType, movie, page }) => {
  try {
    const url = setUrl(reqType, movie, page);
    const response = await axios.get(url);
    const data = response.data;

    if (reqType === "genres") return data["genres"];
    if (reqType !== "movie") return getResults(data);
    else if (reqType === "movie") return getMovieDetails(data);
  } catch (error) {
    return [];
  }
};

module.exports = { fetchData };
