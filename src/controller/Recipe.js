const Recipe = require('../model/Recipe');
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

module.exports = {
  listRecipes,
  getById,
  updateById,
  deleteById,
};