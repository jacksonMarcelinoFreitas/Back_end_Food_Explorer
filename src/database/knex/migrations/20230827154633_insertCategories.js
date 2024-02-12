//when the app goes up the insert will be made
exports.up = function(knex) {
  return knex("categories").insert([
    {name: "Salada"},
    {name: "Sobremesa"},
    {name: "Café"},
    {name: "Suco"},
    {name: "Lanche"},
    {name: "Jantar"},
    {name: "Almoço"}
  ])
};

exports.down = function(knex) {
  return knex("categories").del();
};
