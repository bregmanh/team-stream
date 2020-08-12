exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, isHost: true, session_id: 1},
        {id: 2, session_id: 1},
        {id: 3, isHost: true, session_id: 2},
        {id: 4, session_id: 2},
        {id: 5, session_id: 2}
      ]);
    });
};