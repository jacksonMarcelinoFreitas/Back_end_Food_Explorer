//importa o Router da biblioteca
const Router = require('express');
const DishesController = require('../controllers/DishesController');
const DishesImagesController = require('../controllers/DishesImagesController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const multer = require("multer");
const uploadConfig = require("../configs/upload");

//inicializa a rota
const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

//instacia a classe do controller
const dishesController = new DishesController();
const dishesImagesController = new DishesImagesController();

//cria a rota somente com a barra pois no index.js já contem a rota
//atribui-se a reponsabilidade de gerir os dados ao controller
dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.put("/:id", dishesController.update);
dishesRoutes.patch("/:id", upload.single("image"), dishesImagesController.update);

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