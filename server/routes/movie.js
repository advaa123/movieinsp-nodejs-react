const express = require("express");
const router = express.Router();
const { fetchData } = require("../funcs");
const Movie = require("../models/movie");
const Comment = require("../models/comment");
const User = require("../models/user");
const { verifyUser } = require("../../auth/authenticate");

const calculateRatings = (rateObj) => {
  let total = 0;
  let sum = 0;
  for (const [key, value] of Object.entries(rateObj)) {
    total += value;
    sum += value * parseInt(key);
  }

  return total === 0 ? 0 : (sum / total).toFixed(2);
};

router.get("/:id", async (req, res, next) => {
  const movie = await fetchData({
    reqType: "movie",
    movie: req.params.id,
  });
  if (!movie["id"]) res.status(404).send("Cannot GET /movie/" + req.params.id);
  else res.json({ data: movie });
});

router.post("/liked/:id", async (req, res, next) => {
  const id = req.params.id;
  const filter = { movieId: id };
  const update = { $inc: { likes: 1 } };

  const movie = await Movie.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  });

  await movie.save();
  res.json({ success: true, movie });
});

router.put("/like/:id", async (req, res, next) => {
  const id = req.params.id;
  const filter = { movieId: id };
  const update = { $inc: { likes: 1 } };

  const movie = await Movie.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  });

  await movie.save();
  res.json({ success: true, movie });
});

router.delete("/like/:id", async (req, res, next) => {
  const id = req.params.id;
  const filter = { movieId: id };
  const update = { $inc: { likes: -1 } };

  const movie = await Movie.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  });

  await movie.save();
  res.json({ success: true, movie });
});

router.put("/rate/:id", async (req, res, next) => {
  const rate = parseInt(req.body.rate);
  const rates = `ratings.${rate}`;
  const id = req.params.id;
  const filter = { movieId: id };
  const update = {
    $inc: { [rates]: 1 },
  };

  let movie = await Movie.findOneAndUpdate(
    filter,
    {},
    {
      setDefaultsOnInsert: true,
      upsert: true,
      new: true,
    }
  );

  movie = await Movie.findOneAndUpdate(filter, update, {
    new: true,
  });

  res.json({ success: true, movie, rating: calculateRatings(movie.ratings) });
});

router.get("/rate/:id", async (req, res, next) => {
  const id = req.params.id;
  let movie = await Movie.findOne({ movieId: id });
  if (movie)
    res.json({ success: true, movie, rating: calculateRatings(movie.ratings) });
  else res.status(404).send({ msg: "This movie hasn't been rated." });
});

router.post("/comment", async (req, res, next) => {
  const content = req.body;

  if (!content || !content.postedBy || !content.movieId || !content.content.trim()) {
    return res.status(404).send({success: false});
  }

  let movie = await Movie.findOneAndUpdate(
    { movieId: content.movieId },
    {},
    {
      setDefaultsOnInsert: true,
      upsert: true,
      new: true,
    }
  );

  const user = User.findById(req.body.postedBy, (err, result) => {
    if (err) res.status(404).json({ success: false, err });
    else {
      const comment = new Comment({
        movieId: movie._id,
        postedBy: result._id,
        content: content.content.trim(),
      });

      comment.save(async (err, doc) => {
        if (err) return res.json({ success: false, err });
        movie.comments.push(doc);

        movie.save((error, movie) => {
          if (error) return res.json({ success: false, error });
        });

        return res.status(200).json({ success: true, doc });
      });
    }
  });
});

router.get("/:id/comments", async (req, res, next) => {
  const id = req.params.id;
  const movie = await Movie.findOne({ movieId: id });
  if (movie) {
    Comment.find({ movieId: movie._id })
      .populate({ path: "postedBy", select: "username" })
      .exec((err, result) => {
        if (err) return res.status(500).json({ success: false });
        return res.json({ success: true, comments: result });
      });
  }
  else res.status(404).send({ success: false });
});

// router.get("/:id/comments", async (req, res, next) => {
//   const id = req.params.id;
//   Movie.find({ movieId: id })
//     .populate({
//       path: "comments",
//       select: "comments",
//       populate: { path: "postedBy", select: "username" },
//     })
//     .exec((err, comments) => {
//       if (err) return res.status(500).json({ success: false, err });
//       else if (comments.length === 0)
//         return res.status(404).json({
//           success: false,
//           msg: "there are no comments for this movie",
//         });
//       return res.json({ success: true, comments: comments });
//     });
// });

// router.get("/:id/comments", async (req, res, next) => {
//   const id = req.params.id;
//   let movie = await Movie.findOne({ movieId: id });
//   if (movie) {
//     res.json({ success: true, comments: movie.comments });
//   }
//   else res.status(404).send({ success: false });
// });

module.exports = router;
