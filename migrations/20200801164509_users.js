exports.up = function(knex) {
  return knex.schema
  .createTable('users', table => {
    table.increments('id');
    table.string('name').defaultTo('Anon');
    table.bool('can_control').defaultTo(false);
    table.bool('active').defaultTo(true);
    table.integer('session_id').references('id').inTable('sessions').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
