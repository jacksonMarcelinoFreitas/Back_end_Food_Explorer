//arquivo de configuração para criar a conexão do knex com o bd
//gerado pelo npx knex init

const path = require("path")

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "food_explorer.db")
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDeffault: true
  }

};
