const jwt = require('jsonwebtoken');
const { MESSAGE_ERROR2, MESSAGE_ERROR4 } = require('../validations/messageError');
const User = require('../model/User');

const secret = 'tRMf8%%^YNfsfxLqQuGIg';
const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

async function unique(req, res) {
  const { name, email, password } = req.body;
  const userDB = await User.getEmail(email);

  if (userDB.length > 0) {
    return res.status(409).json({ message: MESSAGE_ERROR2 });
  }
  const userCreated = await User.createUser(email, password, name);
  const { _id } = userCreated;

  return res.status(201).json(
    {
      user: {
        name,
        email,
        role: 'user',
        _id,
      },
    },
  );
}

async function access(req, res) {
  const { email, name, password } = req.body;
  const userDB = await User.getEmail(email);

  try {
    if (email === userDB[0].email) console.log('\n');
    if (password === userDB[0].password) console.log('\n');

    const { _id } = userDB[0];
    const token = jwt.sign({ data: { _id, email, name, password } }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: MESSAGE_ERROR4 });
  }
}

async function recipeCreated(req, res) {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, secret);
  const { _id: userId } = decoded.data;
  const userDB = await User.recipeCreated({ name, ingredients, preparation, userId });
  
  const { _id } = userDB.ops[0];

  // console.log(req.body);

  return res.status(201).json({
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: _id.toString(),
    },
  });
}

module.exports = {
  unique,
  access,
  recipeCreated,
};