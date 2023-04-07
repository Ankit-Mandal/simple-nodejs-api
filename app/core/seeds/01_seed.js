/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("todo").del();

  await knex("todo").insert([
    {
      title: "dogs",
      description: "take the dogs to the field",
      completed: false,
    },
    {
      title: "essay",
      description: "write an essay on app development",
      completed: false,
    },
    {
      title: "clean",
      description: "clean my bed sheets",
      completed: false,
    },
  ]);
};
