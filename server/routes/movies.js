const express = require("express");
const router = express.Router();
const { possibleRequests } = require("../utils/config");
const { fetchData } = require("../utils/utils");

router.get("/:request", async (req, res, next) => {
  if (possibleRequests.includes(req.params.request)) {
    const data = await fetchData({
      reqType: req.params.request,
      movie: null,
      page: 1,
    });
    req.params.request === "genres"
      ? res.json({ genres: data })
      : res.json({ data: data });
  } else {
    res.status(404).send("Cannot GET /" + req.params.request);
  }
});

router.get("/:request/:page", async (req, res, next) => {
  if (possibleRequests.includes(req.params.request)) {
    const page = req.params.page || 1;

    const data = await fetchData({
      reqType: req.params.request,
      movie: null,
      page: page,
    });
    res.json({ data });
  } else {
    res.status(404).send("Cannot GET /" + req.params.request);
  }
});

module.exports = router;
