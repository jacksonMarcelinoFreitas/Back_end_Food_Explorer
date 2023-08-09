//importa o Router da biblioteca
const Router = require('express');
const DishesController = require('../controllers/DishesController');

//inicializa a rota
const dishesRoutes = Router();

//instacia a classe do controller
const dishesController = new DishesController();

//cria a rota somente com a barra pois no index.js já contem a rota
//atribui-se a reponsabilidade de gerir os dados ao controller
dishesRoutes.post("/:user_id", dishesController.create);
// dishesRoutes.put("/:id", dishesController.update);

//exporta
module.exports = dishesRoutes;


//Midleware
// -- utiliza-se passando como parametro na rota
// -- usersRoutes.post("/", myMiddleware, usersController.create);
// -- ou usersRoutes.use(myMiddleware);

// function myMiddleware(request, response, next){
//   console.log("Passou pelo midleware");
//   console.log(request.body);
//   next();
// }