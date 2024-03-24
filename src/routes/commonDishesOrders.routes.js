const CommonDishesOrdersController = require('../controllers/CommonDishesOrdersController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const Router = require('express');

const commonDishesOrdersRoutes = Router();
const commonDishesOrdersController = new CommonDishesOrdersController();

commonDishesOrdersRoutes.use(ensureAuthenticated);

commonDishesOrdersRoutes.put("/orders", commonDishesOrdersController.update);
commonDishesOrdersRoutes.get("/orders", commonDishesOrdersController.indexOrder);
commonDishesOrdersRoutes.get("/orders/dishes", commonDishesOrdersController.indexOrderDishes);

// commonDishesOrdersRoutes.update("/orders", commonDishesOrdersController.indexOrderDishes);

//exporta
module.exports = commonDishesOrdersRoutes;
