exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
    .createTable('polls', function (table) {
      table.increments();
      table.string('email');
      table.string('name');
    }),

    knex.schema
    .createTable('options', function (table) {
      table.increments();
      table.string('name');
      table.integer('pollsID').references('id').inTable('polls');
      table.integer('value');
    })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('options'),
    knex.schema.dropTable('polls')

  ]);
};
