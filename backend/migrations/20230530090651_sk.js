/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();

      table.string("name");
      table.string("email");
      table.string("hashPassword");
    })
    .createTable("posts", (table) => {
      table.increments("id").primary();

      table.string("title");
      table.string("content");

      table
        .integer("authorId")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .index();
    })
    .createTable("comments", (table) => {
      table.increments("id").primary();

      table.string("content");

      table
        .integer("postId")
        .unsigned()
        .references("id")
        .inTable("posts")
        .onDelete("CASCADE")
        .index();

      table
        .integer("authorId")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .index();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("posts")
    .dropTableIfExists("comments");
};
