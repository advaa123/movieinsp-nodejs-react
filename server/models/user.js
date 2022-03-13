const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {},
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.refreshToken;
        delete ret.salt;
        delete ret.hash;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.refreshToken;
        delete ret.salt;
        delete ret.hash;
      },
    },
  }
);

module.exports = mongoose.model("User", User, "users");
