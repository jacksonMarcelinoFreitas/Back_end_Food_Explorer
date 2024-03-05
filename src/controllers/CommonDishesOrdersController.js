const knex = require("../database/knex");

class DishesController{

  async update(request, response){
    
    const { isLiked, orders } = request.body;
    const { dish_id } = request.params;
    const { id: user_id } = request.user;

    await knex("create_common_dish").update({
      orders,
      isLiked
    }).where({dish_id, user_id});

    return response.json();
  }

}

module.exports = DishesController;

// quero que faca a busca pelo prato independente do filtro
// quuuero que o filtro retorne uma consulta especifica
