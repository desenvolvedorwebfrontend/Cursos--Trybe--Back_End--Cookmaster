const Recipe = require('../model/Recipe');

async function listRecipes(req, res) {
  const allRecipes = await Recipe.listRecipes();

  console.log(allRecipes);

  return res.status(200).send(allRecipes);
}

module.exports = {
  listRecipes,
};