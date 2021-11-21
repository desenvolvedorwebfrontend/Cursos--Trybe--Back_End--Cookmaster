function unique(req, res) {
  const { email } = req.body;

  console.log('caindo no user');
  
  return res.status(200).send('caindo no user');

  // next();
}

module.exports = {
  unique,
};