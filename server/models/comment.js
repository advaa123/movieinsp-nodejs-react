const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    content: {
      type: String,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.refreshToken;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.refreshToken;
      },
    },
  }
);

module.exports = mongoose.model("Comment", Comment);
