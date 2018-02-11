const knexConfig  = require("./knexfile");
const ENV         = process.env.ENV || "development";
const knex        = require("knex")(knexConfig[ENV]);

// function to set rank based on position (needs to be in order)

// knex.select('*')
//   .from('options')
//   .where('poll_id', 7)
//   .then((result) => {
//     // console.log(result)
//   });

// example array of 'options'. Rank table:  ID, OPTIONS_ID, RANK

const voteResult = [ { id: '1',
    title: 'Create the results page',
    desc: '',
    poll_id: '1' },
  { id: '2',
    title: 'Help Shay with mailgun',
    desc: '',
    poll_id: '1' },
  { id: '3', title: 'Grab dinner', desc: '', poll_id: '1' },
  { id: '4', title: 'Cry', desc: '', poll_id: '1' },
  { id: '5', title: 'All of the above', desc: '', poll_id: '1' } ];



const rank = (votes) => {
      // console.log(v)
  //   console.log('TESTINGTHE MODULE');
  // knex('*')
  //   .from('options')
  //   .where('poll_id', 7)
  //   .then((result) => {
      votes.forEach(function(element){
        // console.log("bluberriessss", element)
        const option_id = element.id;
        const position = votes.indexOf(element);
        const ranking = (votes.length - position);
        // console.log('Display if rank function works: ', ranking);
        
        knex('rankings')
          .insert({option_id: option_id, rank: ranking})
          .then((result) => {

          });
      });
    // });
};

// rank(voteResult);

// console.log("blue", rank(voteResult))

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

module.exports = rank
