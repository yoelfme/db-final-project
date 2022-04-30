/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('stores', (table) => {
        table.increments('id');
        table.string('name');
        table.string('address');
        table.string('state');
        table.string('latitude');
        table.string('longitude');
        table.string('zip');
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
    return knex.schema.dropTable('stores');
};
