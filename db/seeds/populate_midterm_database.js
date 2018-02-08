
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('polls', 'options', 'rankings').del()
  
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('polls').insert({
          id: 1, email: 'test@test.com', 
          question: 'What do I want for lunch?', 
          admin_link: 'http://adminlink', 
          public_link: 'http://publiclink'}),
      ]);
    })
        .then(function () {
          return Promise.all([
        knex('options').insert({
          id: 1, 
          title: 'Donair Dude', 
          description: 'You might hate yourself afterwards', 
          poll_id: '1'}),
        knex('options').insert({id: 2, 
          title: 'Subway', 
          description: 'Eat Fresh...', 
          poll_id: '1'})
      ]);
    })
        .then(function () {
          return Promise.all([
        knex('rankings').insert({id: 1, 
          option_id: 2, 
          rank: 1}),
        knex('rankings').insert({id: 2, 
          option_id: 1, 
          rank: 2})
      ]);
    });
};
