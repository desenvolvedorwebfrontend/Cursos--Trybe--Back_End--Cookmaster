const regex = new RegExp('[a-z]+@[a-z^0-9].[a-z]{2,3}');
const { MESSAGE_ERROR3, MESSAGE_ERROR4 } = require('./messageError');

function testEmail(email) {
  if (email === undefined) return false;
  if (typeof (email) !== 'string') return false;
  return true;
}

function testPassword(password) {
  if (password === undefined) return false;
  if (typeof (password) !== 'string') return false;
  return true;
}

function validateLogin(req, res, next) {
  const { password, email } = req.body;
  
  if (!testEmail(email)) return res.status(401).json({ message: MESSAGE_ERROR3 });
  if (!testPassword(password)) return res.status(401).json({ message: MESSAGE_ERROR3 });
  if (regex.test(email)) return res.status(401).json({ message: MESSAGE_ERROR4 });
  next();
}

module.exports = validateLogin;