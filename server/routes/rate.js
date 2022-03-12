const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const Rating = require("../models/rating");

router.post("/:id", (req, res, next) => {
    const body = req.body
  res.json({ success: true, body });
});

module.exports = router;
