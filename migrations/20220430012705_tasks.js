/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tasks', (table) => {
        table.increments('id');

        table.string('title');
        table.string('description');
        table.decimal('rewardAmount');
        table.enu('status', ['OPEN', 'RESERVED', 'CLOSED']);

        table.integer('brand_id');
        table.foreign('brand_id').references('id').inTable('brands');

        table.integer('store_id');
        table.foreign('store_id').references('id').inTable('stores');
        
        table.timestamps();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('tasks');
};
