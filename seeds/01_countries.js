const { faker } = require('@faker-js/faker');

faker.locale = 'es';

const COUNT = 5;
const TABLE_NAME = 'countries'

const generate = () => ({
  name: faker.address.country(),
  country_code: faker.address.countryCode(),
  currency_code: faker.finance.currencyCode(),
  currency_symbol: faker.finance.currencySymbol(),
  created_at: new Date(),
  updated_at: new Date()
})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('submissions').del()
  await knex('tasks').del()
  await knex('brands').del()
  await knex('users').del()
  await knex('stores').del()


  await knex(TABLE_NAME).del()


  return knex(TABLE_NAME).insert(
    Array.from({ length: COUNT}, () => {
      return generate();
    })
  )
};
