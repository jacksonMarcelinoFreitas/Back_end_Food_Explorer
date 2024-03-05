const sqliteConnection = require('../../sqlite');

//importa os schemas a serem criados
const createUsers = require('./createUsers');
const insertUserAdmin = require('./insertUserAdmin');

async function migrationRun(){

  try {

    const db = await sqliteConnection();
    await db.exec(createUsers);

    const adminExists = await db.get('SELECT * FROM users WHERE name = "admin"'); 

    if (!adminExists) {
      await db.exec(insertUserAdmin);
      console.log('Admin user inserted successfully.');

    } else {
      console.log('Admin user already exists.');
    }
    
  } catch (error) {
    console.error(error);
  }
  
}

module.exports = migrationRun;

//Passa os schemas que serão criados tirando os espaços
  // const schemas = [
  //   createUsers,
  //   insertUserAdmin
  // ].join('; ');

   //faz a conexão e executa os schemas
  // sqliteConnection()
  //   .then(db => db.exec(schemas))
  //   .catch(error => console.log(error));