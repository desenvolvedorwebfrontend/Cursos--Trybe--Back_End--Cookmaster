const { MESSAGE_ERROR2, MESSAGE_ERROR4 } = require('../validations/messageError');
const User = require('../model/User');

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
  const { email /** , password */ } = req.body;
  // const email = 'teste@este.com';
  const userDB = await User.getEmail(email);
  
  console.log(userDB);

  if (userDB.length === 0) {
    return res.status(401).json({ message: MESSAGE_ERROR4 });
  }

  try {
    if (email === userDB[0].email) console.log('email encontrado');
  } catch (error) {
    console.log('email não encontrado');
  }

  return res.status(200).send('aprovado no validateLogins');
}

module.exports = {
  unique,
  access,
};