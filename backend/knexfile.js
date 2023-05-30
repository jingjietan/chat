// Update with your config settings.

require("dotenv").config()
const parse =  require("pg-connection-string").parse

const config = parse(process.env.DATABASE_URL)
// config.ssl = { rejectUnauthorized: false }

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: config,
  },

  staging: {
    client: "pg",
    connection: config,
    // migrations: {
    //   tableName: "knex_migrations",
    // },
  },

  production: {
    client: "pg",
    connection: config,
    // migrations: {
    //   tableName: "knex_migrations",
    // },
  },
};
