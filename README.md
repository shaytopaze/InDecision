# InDecision

## Created by Shay, Nick & Pablo

## Overview 

InDecision is a A web app that helps groups of friends to vote on a preferred choice (using ranked voting), for example: "What movie should we see next Friday?". 

## Requirements

a user can create a poll with multiple choices
each choice can have a title and optional description
the creator must enter an email
when a poll is finished being created, the user is given two links: an administrative link (which lets them access the results) and a submission link (which the user sends to their friends)
the links are also sent to the creator via email (using mailgun)
when a user visits the submission link, they enter their name if required (see extensions) and see a list of the choices for that poll
the user can rank the choices (by drag and drop, or some other method) and then submits the poll
each time a submission is received, the creator is notified with an email (which includes the administrative link and a link to the results)
the results are ranked using the Borda Count method: https://en.wikipedia.org/wiki/Borda_count
note: this app does not follow the typical user authentication process: voters don't need to register or log in and the only way to access the polls or see the results is via links

## Screenshots

!["Create Poll"](https://github.com/shaytopaze/Midterm/blob/master/docs/createPoll.png?raw=true)

!["Poll Created, Administrative Links Provided"](https://github.com/shaytopaze/Midterm/blob/master/docs/links.png?raw=true)

!["Vote"](https://github.com/shaytopaze/Midterm/blob/master/docs/vote.png?raw=true)

!["Thanks for Voting"](https://github.com/shaytopaze/Midterm/blob/master/docs/thanks.png?raw=true)

!["Results"](https://github.com/shaytopaze/Midterm/blob/master/docs/results.png?raw=true)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:3000/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Bootstrap
- Bodyparser
- Dotenv
- EJS
- Express
- Jquery-UI
- Knex
- Knex-logger
- Mailgun-js
- Pug
- Pg
- Node-sass-middleware
- Morgan
