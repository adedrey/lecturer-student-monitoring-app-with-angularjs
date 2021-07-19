const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRouter = require('./routes/auth');
const studentRouter = require('./routes/students');
const lecturerRouter = require('./routes/lecturers');
const MongoDBURI = 'mongodb://127.0.0.1:27017/lapu';
const bodyParser = require('body-parser');
const Admin = require('./models/admin');
const bcrypt = require('bcryptjs');
const facilityRouter = require('./routes/facility');
const app = express();
mongoose.connect(MongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(connect => {
    // console.log('Connected to Database');
    Admin.findOne({
        email: 'lasu@edu.ng'
      })
      .then(user => {
        if (!user) {
          bcrypt.hash('password', 12)
            .then(hashedPassword => {
              const admin = Admin({
                email: 'lasu@edu.ng',
                password: hashedPassword
              });

              admin.save();
            })
            .catch(err => {
              console.log('Error occured 1')
            })
        }
        console.log('connected');
      })
      .catch(err => {
        console.log('Error occured 2')
      })
  })
  .catch(err => {
    console.log('Connection failed');
  })
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/documents', express.static(path.join(__dirname, 'documents')));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, AdminAuthorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
})

app.use(facilityRouter);
app.use(lecturerRouter);
app.use(studentRouter);
app.use(authRouter);
module.exports = app;
