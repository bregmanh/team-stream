
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sessions').del()
    .then(function () {
      // Inserts seed entries
      return knex('sessions').insert([
        {id: 1, title: 'Cute Cat Videos', active: true, public: true},
        {id: 2, title: 'David Blaine Magic', active: true, public: true},
        {id: 3, title: 'Lonely Room', active: true, public: true},
        {id: 4, title: 'GAME OF THRONES BEST SCENES', active: true, public: true},
        {id: 5, title: 'Friends Only!', active: true, public: false},
      ]);
    });
};
