const knex = require("../database/knex");

class DishesController{
  async create(request, response){
    const {name, price, orders, isLiked, description, image, ingredients} = request.body;
    const user_id = request.user.id;

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

  async update(request, response){
    const {name, price, orders, isLiked, description, image, category } = request.body;
    const { id } = request.params;
    const { user_id } = request.user.id;

    //validar se está vazio
    await knex("dishes").update({name, price, orders, isLiked, description, image, category}).where({id});

    return response.json();
  }

  //método para mostrar um dish somente e seus ingredientes
  async show(resquest, response){
    const {id} = resquest.params;

    const dish = await knex("dishes").where({id}).first();
    const ingredients = await knex("ingredients").where({dish_id: id}).orderBy("name");

    return response.json({
      ...dish,
      ingredients
    });
  }

  //deletar dishes e ingredients em cascata
  async delete(request, response){
    const {id} = request.params;

    await knex("dishes").where({id}).delete();

    return response.json();
  }

  async index(request, response) {
    const { name, ingredients } = request.query;

    const user_id = request.user.id;

    let dishes;

    if (ingredients) {
      const filterIngredients = ingredients.split(',').map(tag => tag.trim());

      dishes = await knex("ingredients")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.user_id"
        ])
        .where("dishes.user_id", user_id)
        .whereLike("dishes.name", `%${name}`)
        .whereIn("ingredients.name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .orderBy("dishes.name", "asc")
    } else {
      dishes = await knex("dishes")
        .where({ user_id })
        .whereLike("name", `%${name}`)
        .orderBy("name", "asc");
    }

    const userIngredients = await knex("ingredients").where({user_id});
    const ingredientsWithDishes = dishes.map(dish => {
      const dishIngredients = userIngredients.filter(ingredient => ingredient.dish_id === dish.id);

      return{
        ...dishes,
        ingredients: dishIngredients
      }
    } );

    return response.json(ingredientsWithDishes);
  }

}

module.exports = DishesController;