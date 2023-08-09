exports.up = knex => knex.schema.createTable("ingredients", table => {
  table.increments("id"),
  table.varchar("name"),
  table.integer("user_id").references("id").inTable("users"),
  table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE"),
  table.datetime("created_at").default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("ingredients");