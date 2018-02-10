const knexConfig  = require("./knexfile");
const ENV         = process.env.ENV || "development";
const knex        = require("knex")(knexConfig[ENV]);


// function to set rank based on position (needs to be in order)

knex.select('*')
  .from('options')
  .where('poll_id', 7)
  .then((result) => {
    // console.log(result)
  });

// example array of 'options'. Rank table:  ID, OPTIONS_ID, RANK

// const dummyData = [
//   { id: 6, title: '1', description: '', poll_id: 7 },
//   { id: 7, title: '2', description: '', poll_id: 7 },
//   { id: 8, title: '3', description: '', poll_id: 7 },
//   { id: 9, title: '4', description: '', poll_id: 7 },
//   { id: 10, title: '5', description: '', poll_id: 7 } ]

const rank = () => {
    
  knex('*')
    .from('options')
    .where('poll_id', 7)
    .then((result) => {

      result.forEach(function(element){
        const option_id = element.id;
        const position = result.indexOf(element);
        const ranking = (result.length - position);
        console.log('Display if rank function works: ', ranking);
        
        knex('rankings')
          .insert({option_id: option_id, rank: ranking})
          .then((result) => {

          });
      });
    });
};

// example array for rank

// const options = ['a', 'b', 'c', 'd', 'e'];

// const rank = () => {
//   options.forEach(function(element){
//     position = options.indexOf(element);
//     console.log(options.length - position)    ;
//   });
// };

// rank();

// test query

knex.select('*')
  .from('rankings')
  .then((result) => {
    console.log(result);
  });
