require("dotenv").config();

module.exports = {
  client: "postgresql",
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./database/migrations/",
  },
};
