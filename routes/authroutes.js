var oauth2 = require('../services/simple-auth');
const mongoose = require('mongoose');
authHelper = require('./authHelper');
require('../models/Users');
const User = mongoose.model('users');
const keys = require('../config/keys');
require('./sqlroutes')
var redirectUri = keys.redirectUri;

var scopes = [
  'openid',
  'profile',
  'offline_access',
];

module.exports = (app) => {

            const authorizationUri = oauth2.authorizationCode.authorizeURL({
                redirect_uri: redirectUri,
                scope: scopes.join(' ')
            });

            app.get('/auth/outlook', (req, res) => {
                console.log(authorizationUri);
                res.redirect(authorizationUri);
            });

            app.get('/auth/outlook/callback', async (req, res) => {
                const code = req.query.code;
                const options = {
                  code,
                  redirect_uri: redirectUri,
                  scope : scopes.join(' ')
                };

            try {
                const result = await oauth2.authorizationCode.getToken(options);

                console.log('The resulting token: ', result);

                  // const token = oauth2.accessToken.create(result);

                var token = oauth2.accessToken.create({ refresh_token: result.refresh_token, expires_in: 0});

            // 	token.refresh(function(error, result) {
            // 	if (error) {
            // 		console.log("Refresh token error: ", error.message);
            // 		tokenReceived(request, response, error, null);
            // 	} else {
            // 		console.log("New token: ", result.token);
            // 		tokenReceived(request, response, null, result);
            // 	}
            // });

                  email = authHelper.getEmailFromIdToken(result.id_token);

                  User.findOne({emailId:email})
                    .then((existingUser) => {
                      if(existingUser){
                        //We already have a new user
                      }else {
                        new User({emailId : email}).save();
                      }
                    });

                  req.session.access_token = token;
                  req.session.refresh_token = token.token.refresh_token;
                  req.session.email = email;

                  console.log(req.session.refresh_token);
             
            // Check if the token is expired. If expired it is refreshed.
                return res.status(200).json().redirect('/logincomplete');
            		if (token.expired()) {
            		  try {
            		    token =  token.refresh();
            		  } catch (error) {
            		    console.log('Error refreshing access token: ', error.message);
            		  }
            		}

                  return res.status(200).json().redirect('/logincomplete');

                } catch(error) {
                  console.error('Access Token Error', error.message);
                  return res.status(500).json('Authentication failed');
                }
              });

            app.get('/api/current_user',(req,res)=>{
              res.send(req.session.email);

            });

            app.get("/logincomplete", function(req, res) {
              var access_token = req.session.access_token;
              var refresh_token = req.session.refresh_token;
              var email = req.session.email;


              if (access_token === undefined || refresh_token === undefined) {
                console.log("/logincomplete called while not logged in");
                res.redirect("/");
                return;
            }
            connection();
            res.send('Hello<br><p>login complete</p> <br> <a href = "/logout"> logout </a>');
            });

            
            app.get('/logout', function(req, res) {
              req.session.destroy();
              res.redirect('/');
            });


}

// function tokenReceived(req, res, error, token) {
//   if (error) {
//     console.log('ERROR getting token:'  + error);
//     res.send('ERROR getting token: ' + error);
//   }
//   else {
//     // save tokens in session
//     var access_token = token.access_token;
//     var refresh_token = token.refresh_token;
//     var email = authHelper.getEmailFromIdToken(token.id_token);

//     console.log('email',email);
//     console.log('access_token',access_token);
//     console.log('refresh_token',refresh_token);
//   }
// }
