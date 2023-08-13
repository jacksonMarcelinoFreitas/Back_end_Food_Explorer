const knex = require("../database/knex");
const AppError = require("../utils/appError");
const {compare} = require("bcryptjs");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
  async create(request, response){
    const { email, password } = request.body;

    //buscando todos os dados do usuário
    const user = await knex("users").where({ email }).first();

    if(!user){
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    //comparando senhas
    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    //criar o token
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({user, token})
  }

}

module.exports = SessionsController;


//Com o jsonwebtoken é possível usar seu métodos "sign"
//parâmetros : ({}, secret, {subject: id, expiresIn});
// const token = sign({}, secret, {
//   subject: String(user.id),
//   expiresIn
// })