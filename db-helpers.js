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
    title: 'Option 1',
    desc: 'Description 1',
    poll_id: '1' },
  { id: '2',
    title: 'Option 2',
    desc: 'Description 2',
    poll_id: '1' },
  { id: '3',
    title: 'Option 3',
    desc: 'Description 3',
    poll_id: '1' },
  { id: '4', title: '', desc: '', poll_id: '1' },
  { id: '5', title: '', desc: '', poll_id: '1' } ]


const rank = (votes) => {

  //   console.log('TESTINGTHE MODULE');
  // knex('*')
  //   .from('options')
  //   .where('poll_id', 7)
  //   .then((result) => {

      votes.forEach(function(element){
        const option_id = element.id;
        const position = votes.indexOf(element);
        const ranking = (votes.length - position);
        console.log('Display if rank function works: ', ranking);
        
        knex('rankings')
          .insert({option_id: option_id, rank: ranking})
          .then((result) => {

          });
      });
    // });
};

// console.log(rank(voteResult))

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
