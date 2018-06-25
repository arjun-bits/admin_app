const keys = require('../config/keys');
const passport = require('passport');

var clientId = keys.outlookClientID;
var clientSecret = keys.outlookClientSecret;
var redirectUri = keys.redirectUri;

var scopes = [
  'openid',
  'profile',
  'offline_access',
];

var credentials = {
  auth: {
    tokenHost: "https://login.live.com",
    tokenPath: "/oauth20_token.srf",
    authorizePath: "/oauth20_authorize.srf"
  },
  options: {
    authorizationMethod: "body"
  },
  client: {
    id: clientId,
    secret: clientSecret
  }
};

passport.serializeUser((user,done) => {
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id)
    .then(user => {
      done(null,user);
    });
});

var oauth2 = require('simple-oauth2').create(credentials);


const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: redirectUri,
    scope: scopes.join(' ')
});

module.exports = oauth2 ;