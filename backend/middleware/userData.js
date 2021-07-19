const User = require('../models/users');
module.exports = (req, res, next) => {
  User.findOne({
      _id: req.userId
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'An error occured. Unable to authenticate user'
        });
      }

      req.user = user;
      // console.log(req.user);
      next();
    }).catch(err => {
      res.status(500).json({
        message: 'An error occured. Unable to authenticate user'
      })
    })
}
