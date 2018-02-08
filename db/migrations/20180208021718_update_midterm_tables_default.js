
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
    .createTable('polls', function (table) {
      table.increments();
      table.string('email').notNull();
      table.string('question').notNull();
      table.string('admin_link');
      table.string('public_link');
    }),

    knex.schema
    .createTable('options', function (table) {
      table.increments();
      table.string('title').notNull();
      table.string('description');
      table.integer('poll_id').references('id').inTable('polls');
    }),
    
    knex.schema
    .createTable('rankings', function (table) {
      table.increments();
      table.integer('option_id').references('id').inTable('options');
      table.integer('rank');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('rankings'),
    knex.schema.dropTable('options'),
    knex.schema.dropTable('polls')
  ]);
};
