const { MESSAGE_ERROR1 } = require('./messageError');

const validateRecipe = (req, res, next) => {
  const { body } = req;
  if (!body.ingredients || !body.preparation || !body.name) {
    return res.status(400).json({ message: MESSAGE_ERROR1 });
  }
  next();
};

module.exports = validateRecipe;