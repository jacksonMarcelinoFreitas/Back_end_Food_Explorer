const knex = require("../database/knex");

class DishesController{
  async create(request, response){
    const {name, price, orders, isLiked, description, image, ingredients} = request.body;
    const {user_id} = request.params;

    //ao fazer o insert o knex tras o código id gerado para o registro
    const [dish_id] = await knex("dishes").insert({
      name,
      price,
      orders,
      isLiked,
      description,
      image,
      user_id
    });

    //mapeando os ingredientes, criando um novo array que contém tanto o id do prato quanto o ingrediente
    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        dish_id,
        user_id,
        name: ingredient
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.json();
  }

  // async update(request, response){

  // }

};

module.exports = DishesController;