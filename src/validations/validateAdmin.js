// const jwt = require('jsonwebtoken');
// const User = require('../model/User');
const { MESSAGE_ERROR8 } = require('./messageError');

function validateAdmin(req, res, next) {
  if (req.user[0].role !== 'admin') {
    return res.status(403).send({ message: MESSAGE_ERROR8 });
  } next();
}

module.exports = validateAdmin;