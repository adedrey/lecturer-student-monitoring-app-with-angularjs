const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin');
const Token = require('../models/token');
exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const address = req.body.address;
  const reg_token = req.body.token;
  const email = req.body.email;
  const password = req.body.password;
  const phone_no = req.body.phone_no;
  const department = req.body.department;
  const rank = req.body.rank;
  Token.findOne({
      token: reg_token
    })
    .then(token => {
      if (!token) {
        return res.status(401).json({
          message: 'Invalid Token'
        })
      }
      return User.findOne({
          email: email
        })
        .then(user => {
          if (user) {
            return res.status(401).json({
              message: 'Email already exist!'
            })
          }
          return bcrypt.hash(password, 12).then(hashedPassword => {
              const newUser = new User({
                name: name,
                address: address,
                email: email,
                password: hashedPassword,
                phone_no: phone_no,
                rank: rank,
                department: department
              });
              return newUser.save()
                .then(result => {
                  if (!result) {
                    return res.status(401).json({
                      message: 'An unknown err occurred'
                    })
                  }
                  return Token.findOneAndDelete({
                      token: reg_token
                    })
                    .then(tokenResult => {
                      console.log('Token', token)
                      console.log("Result", tokenResult)
                      if (!tokenResult) {
                        return res.status(401).json({
                          message: 'An error occured'
                        })
                      }
                      res.status(200).json({
                        message: 'Registration successful!'
                      })
                    }).catch(err => {
                      res.status(500).json({
                        message: 'An unknown error occured!'
                      })
                    })

                })
                .catch(err => {
                  res.status(500).json({
                    message: 'An unknown error occured!'
                  })
                })
            })
            .catch(err => {
              res.status(500).json({
                message: 'An unknown error occured!'
              })
            })

        })
        .catch(err => {
          res.status(500).json({
            message: 'An unknown error occured!'
          })
        })
    })
    .catch(err => {
      req.status(500).json({
        message: 'An unknown error occured!'
      })
    })

}

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
      email: email
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Email or Password incorrect does not!'
        })
      }

      bcrypt.compare(password, user.password)
        .then(doMatch => {
          if (!doMatch) {
            return res.status(401).json({
              message: 'Email or Password incorrect does not!'
            })
          }
          const token = jwt.sign({
            name: user.name,
            userId: user._id
          }, 'secret_key_should_be_longer', {
            expiresIn: '1h'
          });
          res.status(200).json({
            token: token,
            expiresIn: "3600"
          })
        })
        .catch(err => {
          res.status(500).json({
            message: 'An unknown error occured!'
          })
        })
    })
    .catch(err => {
      res.status(500).json({
        message: 'An unknown error occured!'
      })
    })
}


/*

This source code is for handling the Admin Authentication

*/


exports.postAdminLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Admin.findOne({
      email: email
    })
    .then(admin => {
      if (!admin) {
        return res.status(401).json({
          message: 'Email of password incorrect'
        });
      }
      bcrypt.compare(password, admin.password)
        .then(doMatch => {
          if (!doMatch) {
            return res.status(401).json({
              message: 'Email of password incorrect'
            })
          }
          const token = jwt.sign({
            adminId: admin._id
          }, 'secret_to_the_admin_must_not_be_known', {
            expiresIn: '1h'
          });
          res.status(200).json({
            token: token,
            expiresIn: '3600'
          })
        })
        .catch(err => {
          res.status(500).json({
            message: 'Auth failed'
          });
        })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Auth failed'
      })
    })
}
