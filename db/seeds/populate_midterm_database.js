exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rankings').del()
    .then(function() {
      return knex('options').del();
    })
    .then(function() {
      return knex('polls').del();
    })

    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('polls').insert({
          id: 1000000, email: 'test@test.com',
          question: 'What do I want for lunch?',
          admin_link: 'http://adminlink',
          public_link: 'http://publiclink'}),
      ]);
    })
    .then(function () {
      return Promise.all([
        knex('options').insert({
          id: 200000000,
          title: 'Donair Dude',
          description: 'You might hate yourself afterwards',
          poll_id: 1000000}),
        knex('options').insert({
          id: 200000001,
          title: 'Subway',
          description: 'Eat Fresh...',
          poll_id: 1000000})
      ]);
    })
    .then(function () {
      return Promise.all([
        knex('rankings').insert({id: 300000000,
          option_id: 200000001,
          rank: 1}),
        knex('rankings').insert({id: 300000001,
          option_id: 200000000,
          rank: 2})
      ]);
    });
};
