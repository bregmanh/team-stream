exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sessions').del()
    .then(function () {
      // Inserts seed entries
      return knex('sessions').insert([
        {id: 1, title: 'Watch Paint Dry'},
        {id: 2, title: 'Wait for water to boil'}
      ]);
    });
};