//add dependencies
const express = require('express');
const indexRouter = require('./routes/index');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Contact = require('./models/contactmodel');
const { result } = require('lodash');

//Variable init
const app = express();
const port = 3000;

//connect with database via mongoose
const dbURI = 'mongodb+srv://adviz:test123@advizdb.0ucgdi5.mongodb.net/adviz?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then((result) => app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }))
  .catch((err) => console.log(err))


//add middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use('/', indexRouter);

//mongoose and mongo sandbox routes
app.get('/add-contact', (req, res) => {
  const contact = new Contact({
    firstName: "Bob public admin",
    lastName: "B.",
    street: "Kirchenallee 34",
    postCode: "20099",
    city: "Hamburg",
    country: "Deutschland",
    phone: "+49123456789",
    birthday: "1995-01-20",
    isPrivate: false,
  });
  contact.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err)
    })
})


module.exports = app;