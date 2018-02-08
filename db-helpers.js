const knexConfig  = require("./knexfile");
const ENV         = process.env.ENV || "development";
const knex        = require("knex")(knexConfig[ENV]);

// knex('polls')
// .returning('id') // check to ensure that value has been inserted
// .insert({email: 'test@test.com', name: 'This is a test!'}).asCallback(function(err, rows){
//   if (err) return console.error(err);
// });


// knex('options')
// .returning('id') // check to ensure that value has been inserted
// .insert({name: 'Go for a walk', value: 1}).asCallback(function(err, rows){
//   if (err) return console.error(err);
// });

knex.select('id').from('polls')
.asCallback(function(err, rows) {
  if (err) return console.error(err);

console.log(rows)
    });


// // knex SQL query
knex.select('*').from('options')
.asCallback(function(err, rows) {
  if (err) return console.error(err);

console.log(rows)
    });
