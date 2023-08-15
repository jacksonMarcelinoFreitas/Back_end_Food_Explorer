const knex = require("../database/knex");

class IngredientsController{
  async index(request, response){
    // const { name } = request.body;
    const { dish_id } = request.params;

    const ingredients = await knex("ingredients").where({dish_id}).orderBy("name");

    return response.json(
      ingredients
    );
  }
}

module.exports = IngredientsController;