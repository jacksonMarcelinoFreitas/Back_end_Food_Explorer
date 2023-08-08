//npx knex migrate:make createDishes -- cria a migrate
//npx knex migrate:latest -- executa a migrate
//npm run migrate -- script criado para executar a migrate

exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id");
  table.text("name");
  table.float("price",[2]);
  table.float("amount",[2]);
  table.integer("order");
  table.boolean("isLiked");
  table.text("description");
  table.text("image");
  table.integer("userId").references("id").inTable("users");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("dishes");
