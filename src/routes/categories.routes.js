const CategoriesController = require('../controllers/CategoriesController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const Router = require('express');

const categoriesRoutes = Router();
const categoriesController = new CategoriesController();

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.get("/", categoriesController.index);

module.exports = categoriesRoutes;
