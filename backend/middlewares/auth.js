require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw 'Invalid authorization';
    }

    //décode le token dans le header authorization
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;

    if ((req.body.userId && req.body.userId !== userId)) {
      throw 'Invalid user ID';
    } else {
      //chercher le user correspondant à l'id et stocke les valeurs id et isAdmin dans req.user
      User.findOne({ where: {id: userId} })
        .then(user => {
          req.user = {
            id: userId,
            isAdmin: user.isAdmin
          }
          next();
        })
        .catch(() => {throw 'Invalid user ID'});
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};