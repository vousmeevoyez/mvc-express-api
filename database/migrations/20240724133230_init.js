/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("email", "320").notNullable().unique();
    table.string("firstName", "255").notNullable();
    table.string("lastName", "255").nullable();
    table.string("phoneNumber", "12").nullable();
    table.string("password").nullable();
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function down(knex) {
  return knex.schema.dropTable("users");
};
