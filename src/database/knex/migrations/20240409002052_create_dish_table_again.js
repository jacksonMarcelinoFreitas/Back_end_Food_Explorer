exports.up = knex => knex.schema.createTable("dishes", table => {
    table.increments("id");
    table.text("name");
    table.text("image");
    table.float("price",[2]);
    table.text("description");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
    table.integer("user_id").references("id").inTable("users") ;
    table.integer("categorie_id").references("id").inTable("categories") ;
  });
  
  
  exports.down = knex => knex.schema.dropTable("dishes");
  