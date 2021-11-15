const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities", (req, res, next) => {
  // retrieve all the celebrities from the db
  Celebrity.find().then((celebrities) => {
    console.log(celebrities);
    res.render("celebrities/index", { celebrities });
  });
});

router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new");
});

router.get("/celebrities/:id", (req, res, next) => {
  // retrieve a single celebrity from the db
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      console.log(celebrity);
      res.render("celebrities/show", { celebrity });
    })
    .catch((err) => next(err));
});

router.post("/celebrities/:id/edit", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      occupation: occupation,
      catchPhrase: catchPhrase,
    },
    { new: true }
  ).then((updatedCelebrity) => {
    console.log(updatedCelebrity);
    res.redirect(`/celebrities/${updatedCelebrity._id}`);
  });
});

router.post("/celebrities", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then((newCelebrity) => {
      res.redirect(`/celebrities/${newCelebrity.id}`);
    })
    .catch((err) => next(err));
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => next(err));
});

router.get("/celebrities/:id/edit", (req, res, next) => {
  Celebrity.findById(req.params.id).then((celebrity) => {
    res.render("celebrities/edit", { celebrity });
  });
});

module.exports = router;
