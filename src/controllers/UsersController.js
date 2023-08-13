const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/appError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
  async create(request, response){
    //pego os valores vindos do corpo
    const {name, email, password, isAdmin} = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExists){
      throw new AppError("Este email já está em uso!");
    }

    const hashedPassword = await hash(password, 8);

    await database.run("INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)",[name, email, hashedPassword, isAdmin]);

    return response.status(201).json();
  }

  async update(request, response){
    const { name, email, isAdmin, password, old_password }  = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection()
    const user = await database.get('SELECT * FROM users WHERE ID = (?)', [user_id])

    console.log(user);

    if (!user) {
      throw new AppError('Usuario nao encontrado')
    }

    const userWithUpdatedEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este e-mail ja esta em uso')
    }

    if( password && !old_password){
      throw new AppError("Informe a senha antiga para definir a nova senha!")
    }

    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere!");
      }

      user.password = await hash(password, 8);
    }

    //evitar preencher vazio
    user.name = name ?? user.name
    user.email = email ?? user.email
    user.isAdmin = isAdmin ?? user.isAdmin

    await database.run(`
    UPDATE users SET
    name = ?,
    email = ?,
    isAdmin = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ? `, [user.name, user.email, user.isAdmin, user.password, id]);

    return response.status(200).json();

  }

}

module.exports = UsersController;

//Padrao para a criaçao dos controllers
// máximo 5 métodos
// Métodos
// -- (INDEX) listar vários registros  = GET
// -- (SHOW) listar um registro específico  = GET
// -- (CREATE) criar um registro  = POST
// -- (UPDATE) atualizar um registro  = PUT
// -- (DELETE) deletar um registro  = DELETE