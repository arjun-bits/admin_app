const User = require('../models/user_form');

module.exports = (app) => {
  /*
   * Sign up
   */
  app.post('/signup', function(req,res){
    if(req.body.password !== req.body.passwordConf){
      var err = new Error('Passwords do not match.');
      err.status = 400;
      return res.send("passwords dont match");
    }


    if (req.body.email && req.body.password && req.body.passwordConf) {
  
      var userData = {
        email: req.body.email,
        password: req.body.password,
      }
      console.log(userData);
      User.findOne({email:req.body.email})
      .then((existingUser) => {
        if(existingUser){
          //We already have a new user
        }else {
          User.create(userData, function (error, user) {
            if (error) {
              return res.send(error);
                 } else {
                   return res.redirect('/');
                 }
               });
        }
      });      
    }
  });

  app.post('/signin',function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    User.authenticate(email,password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return res(err);
      } else {
        req.session.userId = user._id;
        req.session.email = user.email;

        return res.status(200).json().redirect('/');
      }
    });

  });

  app.get('/current_user',(req,res)=>{
    res.send(req.session.email);
  });
}