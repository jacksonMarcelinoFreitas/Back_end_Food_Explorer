//importa o Router da biblioteca
const Router = require('express');
const UsersController = require('../controllers/UsersController');

//inicializa a rota
const usersRoutes = Router();

//instacia a classe do controller
const usersController = new UsersController();

//cria a rota somente com a barra pois no index.js já contem a rota
//atribui-se a reponsabilidade de gerir os dados ao controller
usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

//exporta
module.exports = usersRoutes;


//Midleware
// -- utiliza-se passando como parametro na rota
// -- usersRoutes.post("/", myMiddleware, usersController.create);
// -- ou usersRoutes.use(myMiddleware);

// function myMiddleware(request, response, next){
//   console.log("Passou pelo midleware");
//   console.log(request.body);
//   next();
// }