//npx knex migrate:make createDishes -- cria a migrate
//npx knex migrate:latest -- executa a migrate
//npm run migrate -- script criado para executar a migrate
//npx knex migrate:down --down
//npx knex migrate:up --up

exports.up = knex => knex.schema.createTable("create_common_dish", table => {
  table.increments("id");
  table.integer("orders").defaultTo(0); //quantidade de pedidos para o prato
  table.boolean("isLiked").defaultTo(false); //se o prato está favoritado ou não
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
  table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("create_common_dish");
