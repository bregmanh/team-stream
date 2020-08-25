// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'teamstream',
      host: 'localhost',
      charset: 'UTF-8',
      user: 'labber',
      password: 'labber'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: 'postgres://retukwxqfdqfpq:56e8de8146ee54612bda747c99dc5b2513c5ee069d7b53d240d6c595a8e3385e@ec2-3-223-9-166.compute-1.amazonaws.com:5432/d6c4t3qvg85bjs',
    // connection: {
      // database: 'my_db',
      // user:     'username',
      // password: 'password'
    // },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
