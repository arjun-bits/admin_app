const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);
var app = express();
require('./services/simple-auth');
const authroutes = require('./routes/authroutes');






app.use(cookieParser());

app.use(session(
  { secret: keys.cookiekey,
    resave: false,
    saveUninitialized: false 
  }));


app.get('/', (req, res) => {
    res.send('Hello<br><a href="/auth/outlook">Log in with Microsoft</a>');
  });
authroutes(app); 

const PORT = process.env.PORT || 5000;

app.listen(PORT);