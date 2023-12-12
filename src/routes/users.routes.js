const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const UsersController = require('../controllers/UsersController');
const Router = require('express');

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.delete("/:id", usersController.delete);
usersRoutes.post("/", usersController.create);
usersRoutes.get("/:id", usersController.show);
usersRoutes.get("/", usersController.index);

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