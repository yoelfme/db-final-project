const { faker } = require('@faker-js/faker');

faker.locale = 'es';

const COUNT = 250;
const TABLE_NAME = 'submissions'

function randomElement(arr) {
  return arr[
      // We could use Math.random. but this function give us more less predicted numbers
      faker.datatype.number({
          max: Math.max(0, arr.length - 1)
      })
  ];
}

const generate = (task, store, user) => {

  console.log(user)
  // const created_at = faker.date.betweens('2021-01-01T00:00:00.000Z', '2022-07-01T00:00:00.000Z', 1)[0]

  const {id: task_id, created_at: task_created_at} = task
  const {id: store_id} = store
  const {id: user_id} = user

  const created_at = faker.date.soon(40, task_created_at)

  return {
    comments: faker.lorem.sentences(3),
    status: ['REVIEWING', 'APPROVED', 'REJECTED'][Math.floor(Math.random() * 3)],
    task_id: task_id,
    store_id: store_id,
    user_id: user_id,
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
  const tasks = await knex.table('tasks').select().limit(1000);
  if (!tasks || !tasks.length) throw Error("Cannot find tasks");

  const users = await knex.table('users').select().limit(100);
  if (!users || !users.length) throw Error("Cannot find users");

  const stores = await knex.table('stores').select().limit(50);
  if (!stores || !stores.length) throw Error("Cannot find stores");

  const submissions = Array.from({length: COUNT}, () => {
      const task = randomElement(tasks);
      const store = randomElement(stores);
      const user = randomElement(users);

      return generate(task, store, user);
  });
 
  console.log(submissions)

  return knex(TABLE_NAME).insert(submissions); // now insert the generated data 🎉🥳
};
