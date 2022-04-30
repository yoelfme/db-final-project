/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id');

        table.string('first_name');
        table.string('last_name');
        table.string('phone_number');
        table.string('email');
        table.boolean('active');

        table.integer('country_id');
        table.foreign('country_id').references('id').inTable('countries');
        
        table.timestamps();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
