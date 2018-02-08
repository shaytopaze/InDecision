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

const polls = {
email: "shay@shay.com",
name: "lighthouse"
};

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/options", (req, res) => {
  const email = req.body.email;
  const pollName = req.body.pollName;
  polls.email = email;
  polls.name = pollName;
 // on submit enter data into database -->
 // INSERT email INTO polls.email
 // INSERT createpoll INTO polls.name
 res.redirect("/options");

  });

app.get("/options", (req, res) => {

  res.render("options", polls);

});



// app.post("/options" (req, res) => {
//   // INSERT polls.id INTO options
//   // INSERT options.name INTO options

//   res.redirect("/:id/links");

// });

// app.get("/:id/links" (req, res) => {
//   res.render("links");
// });

// app.get("/:id/vote" (req, res) => {

// });

// app.post("/:id/vote" (req, res) => {

// });

// app.get("/:id/results" (req, res) => {

// });


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
