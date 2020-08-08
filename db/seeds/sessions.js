
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sessions').del()
    .then(function () {
      // Inserts seed entries
      return knex('sessions').insert([
        {id: 1, title: 'Funny Cat Videos', active: true, public: true},
        {id: 2, title: 'David Blaine Magic', active: true, public: false},
      ]);
    });
};
