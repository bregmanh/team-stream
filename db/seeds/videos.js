exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('videos').del()
    .then(function () {
      // Inserts seed entries
      return knex('videos').insert([
        {id: 100, thumbnail: 'https://i.ytimg.com/vi/PLOPygVcaVE/default.jpg', session_id: 1},
        {id: 101, thumbnail: 'https://i.ytimg.com/vi/cf02KSCTT9Y/default.jpg', session_id: 2},
      ]);
    });
};