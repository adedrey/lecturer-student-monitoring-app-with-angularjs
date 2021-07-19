const Student = require('../models/students');
exports.getStudents = (req, res, next) => {
  // ...
  Student.find()
  .then(students => {
    res.status(200).json({
      students: students
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'An unknown error occured!'
    })
  })
}

exports.postStudent = (req, res, next) => {
  // ...
  const name = req.body.name;
  const matric_no = req.body.matric_no;
  const department = req.body.department;
  Student.findOne({
      matric_no: matric_no
    })
    .then(student => {
      if (student) {
        return res.status(401).json({
          message: 'Matric number already exist'
        });
      }
      const newStudent = new Student({
        name: name,
        matric_no: matric_no,
        department: department
      });
      newStudent.save()
      .then(result => {
        res.status(200).json({
          student: result
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'An unknown error occured!'
        })
      })
    }).catch(err => {
      res.status(500).json({
        message: 'An unknown error occured!'
      })
    })
}

exports.deleteStudent = (req, res, next) => {
  // ...
  const studentId = req.params.id;
  Student.findOneAndDelete({_id: studentId})
  .then(result => {
    if(!result) {
      res.status(401).json({
        message: 'Unable to delete'
      })
    }
    res.status(200).json({
      message: 'Deleted Successfully'
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'An unknown error occured!'
    })
  })
}
