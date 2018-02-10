const knexConfig  = require("./knexfile");
const ENV         = process.env.ENV || "development";
const knex        = require("knex")(knexConfig[ENV]);


// function to set rank based on position (needs to be in order)



knex.select('*')
  .from('options')
  .where('poll_id', 7)
  .then((result) => {
    console.log(result)
});

// example array of 'options'

[ anonymous { id: 6, title: '1', description: '', poll_id: 7 },
  anonymous { id: 7, title: '2', description: '', poll_id: 7 },
  anonymous { id: 8, title: '3', description: '', poll_id: 7 },
  anonymous { id: 9, title: '4', description: '', poll_id: 7 },
  anonymous { id: 10, title: '5', description: '', poll_id: 7 } ]

// example array for rank

const options = ['a', 'b', 'c', 'd', 'e'];

const rank = () => {
  options.forEach(function(element){
    position = options.indexOf(element);
    console.log(options.length - position)    ;
  }); 
};

rank()

// test query

// knex.select('*')
//   .from('options')
//   .then((result) => {
//     console.log(result)
// });
