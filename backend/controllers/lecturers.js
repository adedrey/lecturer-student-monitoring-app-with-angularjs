const Token = require('../models/token');
const Facility = require('../models/facility');
const Student = require('../models/students');
const Lecturer = require('../models/users');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
exports.getToken = (req, res, next) => {
  //...
  Token.find()
    .then(tokens => {
      res.status(200).json({
        token: tokens
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'An unknown error occured!'
      })
    })
}
exports.postGenerateToken = (req, res, next) => {
  // ...
  const token_no = req.body.token_no;
  for (var i = 0; i < token_no; i++) {
    crypto.randomBytes(12, (err, Buffer) => {
      if (err) {
        return res.status(401).json({
          message: 'An unknown error occured'
        })
      }
      let token = Buffer.toString('hex');
      const newToken = new Token({
        token: token
      })
      newToken.save();
    });
  }
  res.status(200).json({
    message: 'Successful'
  })

}
exports.getLecturer = (req, res, next) => {
  Lecturer.find()
    .then(lecturers => {
      res.status(200).json({
        lecturers: lecturers
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'An unknown error occured!'
      })
    })
}
exports.deleteLecturer = (req, res, next) => {
  Lecturer.findOneAndDelete({
      _id: req.params.id
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'An unlnown error occured'
        })
      }
      res.status(200).json({
        message: 'Deleted successfully'
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'An unknown error occured!'
      })
    })
}

exports.getGraph = (req, res, next) => {
  Student.countDocuments()
    .then(totalStudents => {
      return Lecturer.countDocuments()
        .then(totalLecturers => {
          return Facility.countDocuments()
            .then(totalFacilities => {
              res.status(200).json({
                graph: {
                  totalStudents: totalStudents,
                  totalFacilities: totalFacilities,
                  totalLecturers: totalLecturers
                }
              })
            })
            .catch(err => {
              res.status(500).json({
                message: 'An unknown error occured!'
              });
            });
        })
        .catch(err => {
          res.status(500).json({
            message: 'An unknown error occured!'
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        message: 'An unknown error occured!'
      });
    });
}

exports.getProfile = (req, res, next) => {
  Lecturer.findOne({
      _id: req.user
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'User not found!'
        })
      }
      res.status(200).json({
        user: user
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'An unknown error occured!'
      })
    })
}

exports.postProfile = (req, res, next) => {
  const name = req.body.name;
  const rank = req.body.rank;
  const password = req.body.password;
  const new_password = req.body.new_password;
  Lecturer.findOne({
      _id: req.user
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'User not found!'
        })
      }
      user.name = name;
      user.rank = rank;
      if (password && password !== '') {
        bcrypt.compare(password, user.password)
          .then(doMatch => {
            if (!doMatch) {
              return res.status(401).json({
                message: 'Password does not match'
              });
            }
            return bcrypt.hash(new_password, 12)
              .then(hashedPassword => {
                user.password = hashedPassword;
                return user.save()
                  .then(result => {
                    res.status(200).json({
                      user: result
                    });
                  })
                  .catch(err => {
                    console.log(1, err);
                    res.status(500).json({
                      message: 'An unknown error occured!'
                    })
                  })
              })
              .catch(err => {
                console.log(2, err);
                res.status(500).json({
                  message: 'An unknown error occured!'
                })
              })
          })
          .catch(err => {
            console.log(3, err);
            res.status(500).json({
              message: 'An unknown error occured!'
            })
          })
      } else {
        user.save()
          .then(result => {
            res.status(200).json({
              user: result
            })
          })
          .catch(err => {
            console.log(4, err);
            res.status(500).json({
              message: 'An unknown error occured!'
            })
          })
      }
    })
    .catch(err => {
      console.log(5, err);
      res.status(500).json({
        message: 'An unknown error occured!'
      })
    })
}
