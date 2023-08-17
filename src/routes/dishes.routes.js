
const DishesImagesController = require('../controllers/DishesImagesController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const Router = require('express'); //importa o Router da biblioteca
const DishesController = require('../controllers/DishesController');

const uploadConfig = require("../configs/upload");
const multer = require("multer");

//inicializa a rota
const upload = multer(uploadConfig.MULTER);
const dishesRoutes = Router();

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