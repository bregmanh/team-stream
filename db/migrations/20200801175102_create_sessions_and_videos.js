exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id');
      table.string('name').defaultTo('Anon');
      table.bool('can_control').defaultTo(false);
      table.bool('active').defaultTo(true);
      table.integer('session_id').references('id').inTable('sessions').notNullable();
    }),
    knex.schema.createTable('sessions', table => {
      table.increments('id');
      table.string('title');
      table.bool('active').defaultTo(true);
      table.bool('public').notNullable().defaultTo(true);
    }),
    knex.schema.createTable('videos', table => {
      table.increments('id');
      table.string('url').notNullable();
      table.string('title');
      table.string('thumbnail').notNullable();
      table.string('added_by');
      table.bool('playing');
      table.integer('session_id').references('id').inTable('sessions').notNullable();
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
