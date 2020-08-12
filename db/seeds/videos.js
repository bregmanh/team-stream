exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, thumbnail: '../../../client/src/images/paint-drying-thumbnail.jpeg', session_id: 1},
        {id: 2, thumbnail: '../../../client/src/images/water-boil-video-thumbnail.jpeg', session_id: 2},
      ]);
    });
};