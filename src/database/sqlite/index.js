//importando pacotes do BD
const sqlite3 = require("sqlite3"); //driver de conexao
const sqlite = require("sqlite"); //conectar

//importando pacote para resolver caminhos de arquivo
const path = require("path");

//função assincrona que retorna a conexão
async function sqliteConnection(){
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "food_explorer.db"),
    driver: sqlite3.Database
  });

  return database;
}

module.exports = sqliteConnection;