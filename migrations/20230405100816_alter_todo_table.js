/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("todo", (table) => {
    table.dropColumn("completed");
    table.string("isComplete");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("todo", (table) => {
    table.dropColumn("isComplete");
    table.string("completed");
  });
};
