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

module.exports = {
  listRecipes,
  getById,
};