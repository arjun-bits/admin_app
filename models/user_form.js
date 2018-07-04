const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: '',
    unique: true,
    required: true,
  },
  password: {
    type: String,
    default: ''
  },
  passwordConf: {
    type: String,
    default: ''
  },
 
});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
        return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
  }
  
   //hashing a password before saving it to the database
   UserSchema.pre('save', function (next) {
    var user = this;
   bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
 });

var User  = mongoose.model('UserForm', UserSchema);

module.exports = User;