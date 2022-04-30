const { faker } = require('@faker-js/faker');

faker.locale = 'es';

const COUNT = 100;
const TABLE_NAME = 'users'

function randomElement(arr) {
  return arr[
      // We could use Math.random. but this function give us more less predicted numbers
      faker.datatype.number({
          max: Math.max(0, arr.length - 1)
      })
  ];
}

const generate = ({ id: country_id }) => {

  return  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    phone_number: faker.phone.pho,
    email: faker.internet.email(),
    active: [true, false][Math.floor(Math.random() * 2)],
    country_id: country_id,
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
  const countries = await knex.table('countries').select().limit(10);
  if (!countries || !countries.length) throw Error("Cannot find countries");

  const users = Array.from({length: COUNT}, () => {
      const country = randomElement(countries);

      return generate(country);
  });

  return knex(TABLE_NAME).insert(users); // now insert the generated data 🎉🥳
};
