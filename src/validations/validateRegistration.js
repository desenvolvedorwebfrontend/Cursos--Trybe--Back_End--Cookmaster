const { MESSAGE_ERROR1 } = require('./messageError');

function validateRegistration(req, res, next) {
  const { name, email } = req.body;
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // @source https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

  if (name === undefined && typeof (name) !== 'string') {
    return res.status(400).json({ message: MESSAGE_ERROR1 });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: MESSAGE_ERROR1 });
  }

  next();
}

module.exports = validateRegistration;