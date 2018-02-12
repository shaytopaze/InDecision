"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const api_key = 'key-87fdec77b39658cebf66cdd751724823';
const domain = 'sandbox68f2332894a849ca861de3e185adf06a.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const from_who = 'indecision@indecision';

app.use(express.static(__dirname + '/js'));
app.set('view engine', 'pug');

// Seperated Routes for each Resource

const rank = require("./db-helpers.js");
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

app.post("/", (req, res) => {
  knex('polls')
    .insert({email: req.body.email, question: req.body.question})
    .returning('id')
    .then((results) => {
      const pollID = results[0];
      knex('options')


        .insert([
          {poll_id: results[0], title: req.body.title1, description: req.body.description1},
          {poll_id: results[0], title: req.body.title2, description: req.body.description2},
          {poll_id: results[0], title: req.body.title3, description: req.body.description3}
        ])

        .then((results) => {
          res.redirect(`/${pollID}/links`);
          // Send email to poll maker via mailgun
          res.render("links");
          const data = {
            from: 'InDecision <me@sandbox123.mailgun.org>',
            to: req.body.email,
            subject: 'Hello',
            html: `<html><body><a href='http://localhost:3000/${pollID}/vote'>Voting Page</a><br><a href='http://localhost:3000/${pollID}/results'>Results Page</a></body></html>`
          };
          mailgun.messages().send(data, function (error, body) {
          });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Poll CREATED! Here are your links page
app.get(`/:pollID/links`, (req, res) => {
  knex.select('id')
    .from('polls')
    .then((results) => {
      const ID = req.params.pollID;
      const getPollsID = results;
      res.render("links", {getPollsID});
    });
});

// Voting Page

app.get("/:pollID/vote", (req, res) => {
  knex.select('question')
    .from('polls')
    .where('id', req.params.pollID)
    .then((results) => {
      const getPollsQuestion = results;
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
              knex.select('poll_id')
                .from('options')
                .where('poll_id', req.params.pollID)
                .then((pollIdResults) => {
                  knex.select('id')
                    .from('options')
                    .where('poll_id', req.params.pollID)
                    .then((idResults) => {
                      const templateVars = {
                        getPollOptions: getPollOptions,
                        getPollsQuestion: getPollsQuestion,
                        getDescriptionOptions: getDescriptionOptions,
                        pollIdResults: pollIdResults,
                        idResults: idResults
                      };
                      res.render("vote", {templateVars});
                    });
                });
            });
        });
    });
});

// Grabs votes and inserts into rankings table

app.post("/:pollID/vote", (req, res) => {
  const voteResult = req.body.id;
  rank(voteResult);
  res.redirect("thankyou");
});

app.get("/:pollID/thankyou", (req, res) => {
  res.render("thankyou");
});

// Results of Poll Page

app.get("/:pollID/results", (req, res) => {
  res.render("results");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
































