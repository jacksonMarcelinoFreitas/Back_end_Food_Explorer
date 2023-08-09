//arquivo que vai reunir todos os arquivos de rotas
const { Router } = require("express");

//importa todas as rotas
const usersRoutes = require("./users.routes");
const dishesRoutes = require("./dishes.routes");

//inicializa o Routes
const routes = Router();

//ao ser redirecionado para rota, usa-se a importaçao
routes.use("/users", usersRoutes)
routes.use("/dishes", dishesRoutes)

module.exports = routes;

//As rotas não tem a responsabilidade de lidar com respostas e requisiçoes, devendo estas estar sobre obriagação do controller;