const CommonDishesOrdersController = require('../controllers/CommonDishesOrdersController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const Router = require('express');

const commonDishesOrdersRoutes = Router();
const commonDishesOrdersController = new CommonDishesOrdersController();

commonDishesOrdersRoutes.use(ensureAuthenticated);

commonDishesOrdersRoutes.put("/:dish_id", commonDishesOrdersController.update);

//exporta
module.exports = commonDishesOrdersRoutes;
