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
  const { email, password } = req.body;
  const userDB = await User.getEmail(email);
  
  const token = jwt.sign({ data: { email, password } }, secret, jwtConfig);

  try {
    if (email === userDB[0].email) console.log('email ok');
    if (password === userDB[0].password) console.log('senha ok');

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: MESSAGE_ERROR4 });
  }
}

module.exports = {
  unique,
  access,
};