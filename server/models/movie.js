const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Movie = new Schema({
  movieId: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: {
    type: Number,
    default: 0
  },
  ratings: {
    type: mongoose.Mixed,
    // A mixed type object to handle ratings. Each star level is represented in the ratings object
    1: Number, //  the key is the weight of that star level
    2: Number,
    3: Number,
    4: Number,
    5: Number,
    default: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  },
});

module.exports = mongoose.model("Movie", Movie);
