const express = require("express");
const router = express.Router();
const User = require("../models/user");

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require("../authenticate");

const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
    res.statusCode = 500;
    res.send({
      name: "FieldsError",
      message: "All fields are required required (firstName, lastName, username & password)",
    });
  } else {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName || "";
          const token = getToken({ _id: user._id });
          const refreshToken = getRefreshToken({ _id: user._id });
          user.refreshToken.push({ refreshToken });
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.send(err);
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
              res.send({ success: true, token });
            }
          });
        }
      }
    );
  }
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const token = getToken({ _id: req.user._id });
  const refreshToken = getRefreshToken({ _id: req.user._id });
  User.findById(req.user._id).then(
    (user) => {
      user.refreshToken.push({ refreshToken });
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          res.send({ success: true, token });
        }
      });
    },
    (err) => next(err)
  );
});

router.post("/refreshToken", (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  if (refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const userId = payload._id;
      User.findOne({ _id: userId }).then(
        (user) => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              (item) => item.refreshToken === refreshToken
            );

            if (tokenIndex === -1) {
              res.statusCode = 401;
              res.send("Unauthorized");
            } else {
              const token = getToken({ _id: userId });
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId });
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.send(err);
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                  res.send({ success: true, token });
                }
              });
            }
          } else {
            res.statusCode = 401;
            res.send("Unauthorized");
          }
        },
        (err) => next(err)
      );
    } catch (err) {
      res.statusCode = 401;
      res.send("Unauthorized");
    }
  } else {
    res.statusCode = 401;
    res.send("Unauthorized");
  }
});

router.get("/logout", verifyUser, (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  User.findById(req.user._id).then(
    (user) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken
      );

      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
      }

      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS);
          res.send({ success: true });
        }
      });
    },
    (err) => next(err)
  );
});

router.get("/me", verifyUser, (req, res, next) => {
  res.send(req.user);
});

router.post("/favorite/:id", verifyUser, (req, res, next) => {
  const movieId = req.params.id;
  const movieDetails = req.body.movie;

  User.findById(req.user._id).then(
    (user) => {
      const movie = user.favorites.find((item) => item.id == movieId);

      if (!movie) {
        user.favorites.push({
          id: movieDetails.id,
          title: movieDetails.title,
          img: movieDetails.img,
          overview: movieDetails.overview
        });

        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            res.send({ success: true, movie: movieDetails });
          }
        });
      } else {
        res.statusCode = 500;
        res.send({ msg: "This movie is already in favorites.", movieId });
      }
    },
    (err) => next(err)
  );
});

router.delete("/favorite/:id", verifyUser, (req, res, next) => {
  const movieId = req.params.id;

  User.findById(req.user._id).then(
    (user) => {
      const movie = user.favorites.findIndex((item) => item.id == movieId);

      if (movie !== -1) {
        user.favorites.splice(movie, 1);

        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            res.send({ success: true, movie: req.body.movie });
          }
        });
      } else {
        res.statusCode = 500;
        res.send({ msg: "This movie isn't in your favorites.", movieId });
      }
    },
    (err) => next(err)
  );
});

router.get("/favorites", verifyUser, (req, res, next) => {
  res.send(req.user.favorites);
});

module.exports = router;
