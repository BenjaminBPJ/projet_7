const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.jwtToken = jwt.verify(token, process.env.JWT_TOKEN);
    next();
    /*const userId = decodedToken.userId;   
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      req.userIdAuth = userId;
      next();
    };*/
  } catch(error) {
    res.status(401).json({ error : 'Token invalide.' });
  };
};