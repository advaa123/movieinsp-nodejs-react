const express = require("express");
const router = express.Router();
const { fetchData } = require("../utils/utils");

router.get("/", async (req, res, next) => {
  const movies = await fetchData({
    reqType: "trending",
    movie: null,
    page: 1,
  });
  res.json({ data: movies });
});

module.exports = router;