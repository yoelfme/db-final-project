const { faker } = require('@faker-js/faker');

faker.locale = 'es';

const COUNT = 20;
const TABLE_NAME = 'stores'

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
  address: faker.fake('{{address.streetAddress}}, {{address.secondaryAddress}}, {{address.cityName}}, {{address.zipCode}}'),
  state: faker.address.state(),
  latitude: faker.address.latitude(),
  longitude: faker.address.longitude(),
  zip: faker.address.zipCode().toString(),
  active: [true, false][Math.floor(Math.random() * 2)],
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

  const stores = Array.from({length: COUNT}, () => {
      const country = randomElement(countries);

      return generate(country);
  });
  
  return knex(TABLE_NAME).insert(stores); // now insert the generated data 🎉🥳
};
