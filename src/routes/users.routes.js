const Router = require('express');
const UsersController = require('../controllers/UsersController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.get("/", usersController.index);
usersRoutes.post("/", usersController.create);
usersRoutes.get("/:id", usersController.show);
usersRoutes.delete("/:id", usersController.delete);
usersRoutes.put("/", ensureAuthenticated, usersController.update);

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