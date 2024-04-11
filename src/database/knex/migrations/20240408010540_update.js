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
  