const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {},
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

// User.set("toJSON", {
//   transform: function (doc, ret, options) {
//     delete ret.refreshToken;
//     delete ret.authStrategy;
//     return ret;
//   },
// });

module.exports = mongoose.model("User", User, "users");
