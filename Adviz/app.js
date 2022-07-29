//add dependencies
const express = require('express');
const indexRouter = require('./routes/index');
const path = require('path');
const morgan = require('morgan');
//Variable init
const app = express();
const port = 3000;
app.use(morgan('dev'));
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

module.exports = app;