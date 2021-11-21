const { MESSAGE_ERROR3, MESSAGE_ERROR4 } = require('./messageError');

function testEmail(req, res, next, email) {
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // @source https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

  if (!emailRegex.test(email)) {
    return res.status(401).json({ message: MESSAGE_ERROR4 });
  }

  next();
}

function validateLogin(req, res, next) {
  const { password, email } = req.body;

  console.log(`email - ${email} / senha - ${password}`);

  if (email === undefined && typeof (email) !== 'string') {
    return res.status(401).json({ message: MESSAGE_ERROR3 });
  }

  if (password === undefined && typeof (password) !== 'string') {
    return res.status(401).json({ message: MESSAGE_ERROR3 });
  }

  testEmail(email, res, next);
}

module.exports = validateLogin;