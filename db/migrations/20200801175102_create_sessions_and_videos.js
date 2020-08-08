exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.string('id').unique();
      table.string('username').defaultTo('Anon');
      table.bool('active').defaultTo(true);
      table.bool('isHost').defaultTo(false);
      table.string('session_id').references('id').inTable('sessions').notNullable();
    }),
    knex.schema.createTable('sessions', table => {
      table.string('id').unique();
      table.string('title');
      table.bool('active').defaultTo(true);
      table.bool('public').notNullable().defaultTo(true);
      table.integer('time').defaultTo(0);
      table.bool('play').defaultTo(false);
      table.integer('index').defaultTo(0);
    }),
    knex.schema.createTable('videos', table => {
      table.increments('id');
      table.string('videoId').unique();
      table.string('title');
      table.string('thumbnail').notNullable();
      table.string('added_by');
      table.string('session_id').references('id').inTable('sessions').notNullable();
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('videos'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('sessions')
  ])
};
