const express = require("express");
const router = express.Router();
const { fetchData } = require("../utils/utils");

router.get("/:movie", async (req, res, next) => {
  const movies = await fetchData({
    reqType: "search",
    movie: req.params.movie,
    page: 1,
  });
  res.json({ data: movies });
});

router.get("/:movie/:page", async (req, res, next) => {
  page = req.params.page || 1;
  const movies = await fetchData({
    reqType: "search",
    movie: req.params.movie,
    page: page,
  });
  res.json({ data: movies });
});

module.exports = router;