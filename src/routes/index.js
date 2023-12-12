const { Router } = require("express");

const usersRoutes = require("./users.routes");
const dishesRoutes = require("./dishes.routes");
const sessionsRoutes = require("./sessions.routes");
const ingredientsRoutes = require("./ingredients.routes");

const routes = Router();

routes.use("/users", usersRoutes)
routes.use("/dishes", dishesRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/dish/ingredients", ingredientsRoutes)

module.exports = routes;
