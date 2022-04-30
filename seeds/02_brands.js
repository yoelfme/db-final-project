const { faker } = require('@faker-js/faker');

faker.locale = 'es';

const COUNT = 10;
const TABLE_NAME = 'brands'

function randomElement(arr) {
  return arr[
      // We could use Math.random. but this function give us more less predicted numbers
      faker.datatype.number({
          max: Math.max(0, arr.length - 1)
      })
  ];
}

const generate = ({ id: country_id }) => ({
  name: faker.company.companyName(),
  logo: faker.image.business(),
  contact_name: faker.name.findName(),
  country_id: country_id,
  created_at: new Date(),
  updated_at: new Date()
})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del()

  // select some countries from database. so we can create random brands from random countries
  const countries = await knex.table('countries').select().limit(10);
  if (!countries || !countries.length) throw Error("Cannot find countries");

  const brands = Array.from({length: COUNT}, () => {
      const country = randomElement(countries);

      return generate(country);
  });

  return knex(TABLE_NAME).insert(brands); // now insert the generated data 🎉🥳
};
