module.exports = {
    development: {
      client: 'sqlite3',
      useNullAsDefault: true, // needed for sqlite
      connection: { filename: './database/auth.db3' },
      useNullAsDefault: true,
      migrations: {
        directory: './database/migrations',
        tableName: 'dbmigrations',
      },
      seeds: { directory: './database/seeds' },
  },
   
};
