"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
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

// const polls = {
// id: "randomID",
// email: "shay@shay.com",
// name: "lighthouse"
// };

// const options = {
//   id: "randomID",
//   name: "shay",
//   pollsID: polls.id,
//   value: 1
// };

const getPollsID =
knex.select('id')
.from('polls')
.where(`email`, `req.body.email`)

const getPollsName =
knex.select('name')
.from('polls')
.where(`email`, `req.body.email`)

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Create Options Page
app.post("/options", (req, res) => {
  // const email = req.body.email;
  // const pollName = req.body.pollName;
  // polls.email = email;
  // polls.name = pollName;
  knex('polls')
  .insert({email: req.body.email, pollName: req.body.pollName})
  .then((results) => {
    return results;
  })


 res.redirect(`/${getPollsID}/options`);

  });

app.get("/:id/options", (req, res) => {

  res.render("options", {pollsID: req.params.id});
  // How to pass poll table info into options page?

});

// Post Created, Links Created Page
app.post("/:id/links", (req, res) => {
  // req.body.options1 etc....

  // INSERT polls.id INTO options
  // INSERT options.name INTO options
  knex('options')
  .insert({id: req.body.id, name: req.body.name})
  .then((results) => {
    return results;
  })
  // How to pass options to link page?
});

// app.get("/:id/links", (req, res) => {

//   res.render("links", {polls});

// });

// app.get("/:id/vote", (req, res) => {
//   res.render("vote");
// });

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


