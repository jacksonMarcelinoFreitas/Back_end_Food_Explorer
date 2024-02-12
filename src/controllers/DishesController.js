const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class DishesController{

  async create(request, response){

    const { name, price, description, ingredients, categorie_id } = request.body;
    const imageDishFilename = request.file.filename;
    const user_id = request.user.id; 

    const ingredientsArray = ingredients.split(',');

    const diskStorage = new DiskStorage(); 

    const user = await knex("users")
      .where({id: user_id}).first();

    if(!user){
      throw new AppError("Somente usuários autenticados podem cadastrar pratos!", 401)
    }

    const filename = await diskStorage.saveFile(imageDishFilename);

    //first insert dish
    const [ dish_id ] = await knex("dishes").insert({
      name,
      price,
      description,
      image: filename, 
      categorie_id,
      user_id
    });

    //after insert ingredients array
    const ingredientsInsert = ingredientsArray.map(ingredient => {
      return {
        dish_id,
        user_id,
        name: ingredient
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json('Dish created with success!');
  }

  async update(request, response){

    const { name, price, description, categorie_id, ingredients } = request.body;

    const imageDishFilename = request.file?.filename

    const { id } = request.params;
    const { id: user_id } = request.user;

    const parsedIngredients = JSON.parse(ingredients);

    const data = {
      name, price, description, categorie_id, ingredients, imageDishFilename, id
    }

    console.log(data);

    // const ingredientsArray = ingredients.split(',');

    const diskStorage = new DiskStorage();

    const dish = await knex('dishes').where({ id });

    console.log(dish)

    if (imageDishFilename) {
      var filename = await diskStorage.saveFile(imageDishFilename);
      // Continuar com o código aqui...
    } else {
      // Tratar o caso em que imageDishFilename é undefined
      console.error('O filename é undefined');
      // Ou realizar outras ações apropriadas
    }
    

    const ingredientsUpdate = parsedIngredients.map(ingredient => {
      return {
        name: ingredient.name,
        user_id,
        dish_id: id
      };
    });

    console.log(ingredientsUpdate);

    (async function replaceIngredients() {

      //exclusão de todos os ingredients
      await knex('ingredients')
          .where('dish_id', id)
          .del();

      //inserção novamente
      await knex('ingredients')
      .insert(ingredientsUpdate);

    })();


    await knex("dishes").update({
      name,
      image: filename,
      price,
      categorie_id,
      description,
    }).where({id});

    return response.json();
  }

  //método para mostrar um dish somente e seus ingredientes
  async show(request, response){
    try {

      const { id } = request.params;

      const dish = await knex("dishes").where({ id }).first();

      if (!dish) {
          return response.status(404).json({ error: "Dish not found" });
      }

      const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");

      return response.json({
          dish,
          ingredients
      });

    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  //deletar dishes e ingredients em cascata
  async delete(request, response){

    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.json();
  }

  //tras os pratos e seus ingrdientes para o usuário autenticado
  async index(request, response) {

    const { name, ingredients } = request.query;

    const user_id = request.user.id;

    let dishes;

    if (ingredients) {
      console.log(ingredients)
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
      const dishIngredients = userIngredients.filter(
        ingredient => ingredient.dish_id === dish.id
      );
      return{
        ...dishes,
        ingredients: dishIngredients
      }
    } );

    return response.json(ingredientsWithDishes);
  }

}

module.exports = DishesController;