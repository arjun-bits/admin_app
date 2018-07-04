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
const sqlroutes = require('./routes/sqlroutes');
const signroutes = require('./routes/signin');
var bodyParser = require("body-parser");
var cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cookieParser());
app.use(cors());

app.use(session(
  { secret: keys.cookiekey,
    saveUninitialized: false,
    resave:false 
  }));



app.get('/', (req, res) => {
    res.send('Hello<br><a href="/auth/outlook">Log in with Microsoft</a>');
  });

signroutes(app);
authroutes(app);

sqlroutes(app); 



const PORT = process.env.PORT || 5000;

app.listen(PORT);