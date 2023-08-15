const knex = require("../database/knex");
const AppError = require("../utils/appError");
const DiskStorage = require("../providers/DiskStorage");

class DishesImagesController {
  async update(request, response){
    const id = request.params;
    const user_id = request.user.id;
    const imageFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    //busca pelo prato
    const dish = await knex("dishes")
    .where(id).first();

    // busca pelo usuário para autenticar
    const user = await knex("users")
    .where({id: user_id}).first();

    if(!user){
      throw new AppError("Somente usuários autenticados podem mudar a imagem!", 401)
    }

    if(dish.image){
      await diskStorage.deleteFile(dish.image);
    }

    const filename = await diskStorage.saveFile(imageFilename);
    dish.image = filename;

    await knex("dishes").update(dish).where(id);

    return response.json(dish);
  }

}


module.exports = DishesImagesController;