const knexConfig  = require("./knexfile");
const ENV         = process.env.ENV || "development";
const knex        = require("knex")(knexConfig[ENV]);


// function to set rank based on position (needs to be in order)

const dummy = [1, 2, 3, 4, 5, 6, 7];

const rank = () => {
  dummy.forEach(function(element){
    position = dummy.indexOf(element);
    console.log(dummy.length - position)    
  }); 
};

// test query

knex.select('*')
  .from('options')
  .then((result) => {
    console.log(result)
});
