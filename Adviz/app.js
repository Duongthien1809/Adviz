//add dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const contactRouter = require('./routes/contacts');
const userRouter = require('./routes/users');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();


//Variable init
const app = express();
const port = process.env.PORT || 8080;


// add static files
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`start listening on ${port}`);
});

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.once('open', () => {
    console.log('Database connected successfully'); 
}).on('error', (err) => {console.error(err);}); 

//add middleware
app.use(cors());
app.use(morgan('dev'));
app.use(session({
	secret: process.env.SECRET_KEY,
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//add routers
app.use(userRouter);
app.use(contactRouter);


// npm joi für Input Validation


module.exports = app;