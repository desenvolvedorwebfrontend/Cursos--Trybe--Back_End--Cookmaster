const { ObjectId } = require('mongodb');
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

async function uploadFile(id, image) {
  return connection()
    .then((db) => db.collection('recipes')
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { image } }))
    .then((result) => ({ ...result.value, image }));
}

async function createAdmin({ name, email, password }) {
  return connection()
    .then((db) => db.collection('users').insertOne({ email, password, name, role: 'admin' }))
    .then((result) => (result));
}

module.exports = {
  getEmail,
  createUser,
  recipeCreated,
  uploadFile,
  createAdmin,
};