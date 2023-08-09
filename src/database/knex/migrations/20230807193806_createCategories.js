exports.up = knex => knex.schema.createTable("categories", table => {
  table.increments("id"),
  table.text("name"),
  table.integer("dish_id").references("dishes")
});

exports.down = knex => knex.schema.dropTable("categories");
