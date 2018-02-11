const knexConfig  = require("./knexfile");
const ENV         = process.env.ENV || "development";
const knex        = require("knex")(knexConfig[ENV]);

// function to set rank based on position (needs to be sorted already)

const rank = (votes) => {
  votes.forEach(function(element){
    const option_id = element.id;
    const position = votes.indexOf(element);
    const ranking = (votes.length - position);

 // Inserts ranked data into 'rankings' table   

    knex('rankings')
      .insert({option_id: option_id, rank: ranking})
      .then((result) => {
      });
  });
};

module.exports = rank;
