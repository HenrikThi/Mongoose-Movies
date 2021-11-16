const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movies.model");

router.get("/movies/new", (req, res, next) => {
  Celebrity.find().then((celebrities) => {
    res.render("movies/new", { celebrities });
  });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((movies) => {
      res.render("movies/index", { movies });
    });
});

router.post("/movies", (req, res, next) => {
  Movie.create(req.body).then((newMovie) => {
    res.redirect("/movies");
  });
});

router.get("/movies/:id/edit", (req, res, next) => {
  Movie.findById(req.params.id).then((movie) => {
    Celebrity.find().then((celebrities) => {
      res.render("movies/edit", { movie, celebrities });
    });
  });
});

router.get("/movies/:id/cast/edit", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/edit-cast", {movie});
    });
});

module.exports = router;
