/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('countries', (table) => {
        table.increments('id');
        table.string('name');
        table.string('country_code', 2);
        table.string('currency_code', 3);
        table.string('currency_symbol', 10);
        table.timestamps();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('countries');
};
