/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('submissions', (table) => {
        table.increments('id');
        table.string('comments');
        table.enu('status', ['REVIEWING', 'APPROVED', 'REJECTED']);

        table.integer('task_id');
        table.foreign('task_id').references('id').inTable('tasks');

        table.integer('store_id');
        table.foreign('store_id').references('id').inTable('stores');

        table.integer('user_id');
        table.foreign('user_id').references('id').inTable('users');
        
        table.timestamps();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('submissions');
};
