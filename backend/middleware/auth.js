const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.jwtToken = jwt.verify(token, process.env.JWT_TOKEN);
    console.log(token)
    next();
  } catch(error) {
    console.log(error)
    res.status(401).json({ error : 'Token invalide.' });
  };
};