//importa o Router da biblioteca
const Router = require('express');
const UsersController = require('../controllers/UsersController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

//inicializa a rota
const usersRoutes = Router();

//instacia a classe do controller
const usersController = new UsersController();

//cria a rota somente com a barra pois no index.js já contem a rota
//atribui-se a reponsabilidade de gerir os dados ao controller
//não se faz mais necessário colocar o id do usuário diretamente na rota, uma vez que o middleware de autenticação ja tem ele
usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);

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