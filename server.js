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

// Poll CREATED! Here are your links page

app.post("/links", (req, res) => {
  knex('polls')
  .insert({email: req.body.email, question: req.body.question})
  .returning('id')
  .then((results) => {
    const pollID = results[0];
    knex('options')
    .insert([
      {poll_id: results[0], title: req.body.title1, description: req.body.description1},
      {poll_id: results[0], title: req.body.title2, description: req.body.description2},
      {poll_id: results[0], title: req.body.title3, description: req.body.description3},
      {poll_id: results[0], title: req.body.title4, description: req.body.description4},
      {poll_id: results[0], title: req.body.title5, description: req.body.description5}
      ])
    .then((results) => {

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
    res.render("links", {getPollsID});
  })
});

// Voting Page

app.get("/:pollID/vote", (req, res) => {
  knex.select('question')
  .from('polls')
  .where('id', req.params.pollID)
  .then((results) => {
    const getPollsQuestion = results
    knex.select('title')
    .from('options')
    .where('poll_id', req.params.pollID)
    .then((titleResults) => {
      const getPollOptions = titleResults;
      knex.select('description')
        .from('options')
        .where('poll_id', req.params.pollID)
        .then((descriptionResults) => {
          const getDescriptionOptions = descriptionResults;
            const templateVars = {
              getPollOptions : getPollOptions,
              getPollsQuestion : getPollsQuestion,
              getDescriptionOptions : getDescriptionOptions
            };
    console.log(templateVars.getPollOptions[0]);
    const optionsObject = templateVars.getPollOptions[0].title;
    // console.log(templateVars.getPollOptions[0]);
  res.render("vote", {templateVars});
      })
    })
  })
});

// app.get("/:id/thankyou", (req, res) => {
//  res.render("thankyou");
// });

// app.post("/:id/results", (req, res) => {
//   // if req.params.id is === polls.id
//   // INSERT value INTO options.value

// })

// Results of Poll Page

app.get("/:id/results", (req, res) => {
  res.render("results");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});












