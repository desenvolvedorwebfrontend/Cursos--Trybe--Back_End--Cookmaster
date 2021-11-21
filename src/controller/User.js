const { MESSAGE_ERROR2 } = require('../validations/messageError');
const User = require('../model/User');

async function unique(req, res) {
  const { name, email, password } = req.body;
  const userDb = await User.getEmail(email);

  if (userDb.length > 0) {
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

module.exports = {
  unique,
};