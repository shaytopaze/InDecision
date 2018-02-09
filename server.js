"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 3000;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home Page / Create Polls Page

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/links", (req, res) => {
  // console.log("question:", req.body.question);
  console.log("posted to links");

  knex('polls')
  .insert({email: req.body.email, question: req.body.question})
  .returning('id')
  .then((results) => {
    // console.log("poll insert results", results);
    const pollID = results[0];
    knex('options')
    .insert({poll_id: results[0], title: req.body.title , description: req.body.description})
    .then((results) => {
      // return results;
      res.redirect(`/${pollID}/links`);
    })
    .catch((err) => {
      console.log("this is completely intolerable, I am outta here");
      res.status(500).send(err);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("bad error");
  });
});

app.get(`/:pollID/links`, (req, res) => {

  knex.select('id')
  .from('polls')
  .then((results) => {
    const ID = req.params.pollID;
    const getPollsID = results;
    // console.log(getPollsID);
    // console.log("hey im here" + getPollsID[ID].id);
    // console.log("ID" + ID);
    res.render("links", {getPollsID});
  })
});






// 1) why is doing DB queries in global scope a crazy idea? (non-immediate problem)
// 2) either way, how do we get the information we need (for app.get('links'))?
// 3) Jeremy says there's a design problem that will prevent that, so there's some
//      @$%^^ assumption we're making that is wrong.  Must find that assumption.

app.get("/:pollID/vote", (req, res) => {
  knex.select('question')
  .from('polls')
  .where('id', req.params.pollID)
  .then((results) => {
    const getPollsQuestion = results
    console.log(getPollsQuestion);
  res.render("vote", {getPollsQuestion});

  })

});

// app.get("/:id/thankyou", (req, res) => {
//  res.render("thankyou");
// });

// app.post("/:id/results", (req, res) => {
//   // if req.params.id is === polls.id
//   // INSERT value INTO options.value

// })

// app.get("/:id/results", (req, res) => {
//   res.render("results");
// });

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});










