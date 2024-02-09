const DishesImagesController = require('../controllers/DishesImagesController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const DishesController = require('../controllers/DishesController');
const Router = require('express');

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const upload = multer(uploadConfig.MULTER);
const dishesRoutes = Router();

const dishesController = new DishesController();
const dishesImagesController = new DishesImagesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.patch("/:id", upload.single("imageDish"), dishesImagesController.update);
dishesRoutes.post("/", upload.single('imageDish'), dishesController.create);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.put("/:id", dishesController.update);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.get("/", dishesController.index);

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