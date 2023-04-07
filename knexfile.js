// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mssql",
    connection: {
      // server: "localhost",
      host: "127.0.0.1",
      port: 1433,
      database: "nodejs_DB",
      user: "admin",
      password: "Admin@123",
      options: {
        trustedConnection: true,
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

// module.exports = {
//   development: {
//     client: process.env.DB_CLIENT,
//     connection: {
//       // server: "localhost",
//       host: process.env.DB_HOST,
//       port: process.env.DB_PORT,
//       database: process.env.DB_NAME,
//       user: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       options: {
//         trustedConnection: true,
//       },
//     },
//     pool: {
//       min: process.env.DB_MINPOOL,
//       max: process.env.DB_MAXPOOL,
//     },
//     migrations: {
//       tableName: process.env.DB_MIGRATION_TABLENAME,
//     },
//   },
// };
