// validateJWT.js
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { MESSAGE_ERROR7 } = require('./messageError');

const segredo = 'tRMf8%%^YNfsfxLqQuGIg';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: MESSAGE_ERROR7 });

  try {
    const decoded = jwt.verify(token, segredo);
    const user = await User.getEmail(decoded.data.email);
    const { _id: userId } = user[0];
    const { _id: idDecoded } = decoded.data;

    if (userId === idDecoded) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};