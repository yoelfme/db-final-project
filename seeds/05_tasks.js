const { faker } = require('@faker-js/faker');

faker.locale = 'es';

const COUNT = 1000;
const TABLE_NAME = 'tasks'

function randomElement(arr) {
  return arr[
      // We could use Math.random. but this function give us more less predicted numbers
      faker.datatype.number({
          max: Math.max(0, arr.length - 1)
      })
  ];
}

const generate = ({ id: brand_id }, { id: store_id }) => {
  const created_at = faker.date.betweens('2021-01-01T00:00:00.000Z', '2022-07-01T00:00:00.000Z', 1)[0]
  return {
    title: faker.lorem.words(4),
    description: faker.lorem.sentences(3),
    rewardAmount: parseFloat(faker.finance.amount(10, 75)),
    status: ['OPEN', 'RESERVED', 'CLOSED'][Math.floor(Math.random() * 3)],
    brand_id: brand_id,
    store_id: store_id,
    created_at: created_at,
    updated_at: created_at
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del()

  // select some countries from database. so we can create random brands from random countries
  const brands = await knex.table('brands').select().limit(50);
  if (!brands || !brands.length) throw Error("Cannot find brands");

  const stores = await knex.table('stores').select().limit(50);
  if (!stores || !stores.length) throw Error("Cannot find stores");

  const tasks = Array.from({length: COUNT}, () => {
      const brand = randomElement(brands);
      const store = randomElement(stores);

      return generate(brand, store);
  });

  return knex(TABLE_NAME).insert(tasks); // now insert the generated data 🎉🥳
};
