module.exports = {
    development: {
      client: 'sqlite3',
      useNullAsDefault: true, // needed for sqlite
      connection: { filename: './database/auth.db3' },      
      migrations: {
        directory: './database/migrations',
        tableName: 'dbmigrations',
      },
      seeds: { directory: './database/seeds' },
  },

  testing: {
    client: 'sqlite3',
    useNullAsDefault: true, // needed for sqlite
    connection: { filename: './database/auth-test.db3' },   
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
},
   
};
