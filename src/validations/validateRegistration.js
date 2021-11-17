const { MESSAGE_ERROR1 } = require('./messageError');

function validateRegistration(req, res, next) {
  const { name, email } = req.body;

  console.log(`name: ${name} --- email: ${email}`);

  if (name === undefined && typeof (name) !== 'string') return res.status(400).json({ message: MESSAGE_ERROR1 });
  if (email === undefined && typeof (email) !== 'string') return res.status(400).json({ message: MESSAGE_ERROR1 });


  next();
}

module.exports = validateRegistration;