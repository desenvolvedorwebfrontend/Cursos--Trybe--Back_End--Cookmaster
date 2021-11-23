// const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function listRecipes() {
  return connection()
  .then((db) => db.collection('recipes').find({}).toArray())
  .then((result) => result);
}

module.exports = {
  listRecipes,
};

// /** Busca todos os produtos do banco. */
// async function getAll() {
//   return connection()
//     .then((db) => db.collection('recipes').find().toArray())
//     .then((product) => product.map(({ _id, name, quantity }) => ({ _id, name, quantity })));
// }

// /** Busca produto por ID */
// async function getById(id) {
//   if (!ObjectId.isValid(id)) return null;

//   return connection()
//     .then((db) => db.collection('recipes').findOne(new ObjectId(id)))
//     .then((product) => product);
// }

// /** Cria os produtos do banco. */ 
// async function create(name, quantity) {
//   return connection()
//     .then((db) => db.collection('recipes').insertOne({ name, quantity }))
//     .then((product) => product.ops[0]);
// }

// /** Busca pelo Nome */
// async function findByName(name) {
//   return connection()
//   .then((db) => db.collection('recipes').findOne({ name }));
// }

// /** Atualiza pelo ID */
// async function updateById({ id, name, quantity }) {
//   if (!ObjectId.isValid(id)) return null;

//   return connection()
//   .then((db) => db.collection('recipes')
//     .updateOne(
//       { id: `${ObjectId(id)}` },
//       { $set: { name, quantity } },
//       { _id: 1, name: 1, quanitty: 1 },
//     ));
// }

// /** Exclui produto por ID */
// async function deleteById(id) {
//   if (!ObjectId.isValid(id)) return null;

//   return connection()
//   .then((db) => db.collection('recipes')
//     .deleteOne({ _id: new ObjectId(id) }));
// }

// const findByName = async (firstName, middleName, lastName) => {
//   // Determinamos se devemos buscar com ou sem o nome do meio
//   const query = middleName
//     ? { firstName, middleName, lastName }
//     : { firstName, lastName };

//   // Executamos a consulta e retornamos o resultado
//   const author = await connection()
//     .then((db) => db.collection('authors').findOne(query));

//   // Caso nenhum author seja encontrado, devolvemos null
//   if (!author) return null;

//   // Caso contrário, retornamos o author encontrado
//   return getNewAuthor(author);
// };

// // Converte o nome dos campos de snake_case para camelCase

// const serialize = (authorData) => ({
//   id: authorData.id,
//   firstName: authorData.first_name,
//   middleName: authorData.middle_name,
//   lastName: authorData.last_name,
// });

// Cria uma string com o nome completo do autor
// const getNewAuthor = (authorData) => {
//   const { id, firstName, middleName, lastName } = authorData;

//   const fullName = [firstName, middleName, lastName]
//     .filter((name) => name)
//     .join(' ');

//   return {
//     id,
//     firstName,
//     middleName,
//     lastName,
//     name: fullName,
//   };
// };
