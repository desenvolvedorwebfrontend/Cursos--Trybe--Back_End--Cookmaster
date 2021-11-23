const jwt = require('jsonwebtoken');
const User = require('../model/User');

const segredo = 'tRMf8%%^YNfsfxLqQuGIg';

const validateAdmin = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, segredo);
    const user = await User.getEmail(decoded.data.email);
    
    if (user[0].role === 'admin') next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}; 

module.exports = validateAdmin;