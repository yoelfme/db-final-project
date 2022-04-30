/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('brands', (table) => {
        table.increments('id');
        table.string('name');
        table.string('logo');
        table.string('contact_name');

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
    return knex.schema.dropTable('brands');
};
