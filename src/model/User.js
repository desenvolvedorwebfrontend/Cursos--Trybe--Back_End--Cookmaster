const connection = require('./connection');

async function getEmail(email) {
  return connection()
    .then((db) => db.collection('users').find({ email }).toArray())
    .then((result) => (result));
}

async function createUser(email, password, name) {
  return connection()
    .then((db) => db.collection('users').insertOne({ email, password, name }))
    .then((result) => (result));
}

async function recipeCreated(data) {
  return connection()
    .then((db) => db.collection('recipes').insertOne(data))
    .then((result) => (result));
}

module.exports = {
  getEmail,
  createUser,
  recipeCreated,
};