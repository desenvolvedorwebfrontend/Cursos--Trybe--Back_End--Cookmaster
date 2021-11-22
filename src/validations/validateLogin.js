/** @source https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail */
const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.([a-z]+))?$/i;
const { MESSAGE_ERROR3 } = require('./messageError');

function testEmail(email) {
  if (email === undefined) return false;
  if (typeof (email) !== 'string') return false;
  return regex.test(email);
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
  next();
}

module.exports = validateLogin;