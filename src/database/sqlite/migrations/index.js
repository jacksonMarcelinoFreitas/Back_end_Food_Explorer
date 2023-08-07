const sqliteConnection = require('../../sqlite');

//importa os schemas a serem criados
const createUsers = require('./createUsers');

async function migrationRun(){
  //Passa os schemas que serão criados tirando os espaços
  const schemas = [
    createUsers
  ].join('');

  //faz a conexão e executa os schemas
  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.log(error));
}

module.exports = migrationRun;