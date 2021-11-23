const Recipe = require('../model/Recipe');
const User = require('../model/User');
const { MESSAGE_ERROR6 } = require('../validations/messageError');

async function listRecipes(req, res) {
  const allRecipes = await Recipe.listRecipes();

  console.log(allRecipes);

  return res.status(200).send(allRecipes);
}

async function getById(req, res) {
  const { id } = req.params;
  const idRecipe = await Recipe.getById(id);

  if (idRecipe === null) return res.status(404).json({ message: MESSAGE_ERROR6 });
  return res.status(200).json(idRecipe);
}

/** Atualiza pelo ID */
async function updateById(req, res) {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user[0];
    const update = await Recipe.updateById({ name, ingredients, preparation, id, userId });
    return res.status(200).json(update.value);
  } catch (error) {
    return res.status(500).json({ message: 'error 50' });
  }
}

async function deleteById(req, res) {
  const { id } = req.params;

  const result = await Recipe.deleteById(id);
  res.status(204).send(result);
}

async function uploadFile(id, filename) {
  const img = `localhost:3000/src/uploads/${filename}`;
  const result = await User.uploadFile(id, img);

  return result;
}

async function image(req, res) {
  const { id } = req.params;
  const { filename } = req.file;
  const recipe = await uploadFile(id, filename);
  // if (recipe.message) return res.status(recipe.status).json({ message: recipe.message });

  return res.status(200).json(recipe);
}

module.exports = {
  listRecipes,
  getById,
  updateById,
  deleteById,
  image,
};