//importa o Router da biblioteca
const IngredientsController = require('../controllers/IngredientsController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const Router = require('express');

//inicializa a rota
const ingredientsRoutes = Router();
const ingredientsController = new IngredientsController();
//instacia a classe do controller

//cria a rota somente com a barra pois no index.js já contem a rota
//atribui-se a reponsabilidade de gerir os dados ao controller
ingredientsRoutes.use(ensureAuthenticated);

// ingredientsRoutes.post("/", ingredientsController.create);
ingredientsRoutes.get("/:dish_id", ingredientsController.index);
// ingredientsRoutes.get("/:id", ingredientsController.show);
// ingredientsRoutes.delete("/:id", ingredientsController.delete);
// ingredientsRoutes.put("/:id", ingredientsController.update);

//exporta
module.exports = ingredientsRoutes;
