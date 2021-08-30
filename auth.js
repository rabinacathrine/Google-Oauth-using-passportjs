const passport = require('passport')
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = "808171486025-l3ukm5eq9hjtdtphf7pn5sn6qutap4c3.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "JD2DBe2dikkKoBI4DsJj-WCc"
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
   
      return done(null, profile);
  }
));

passport.serializeUser(function(user,done){
    done(null,user)
})
passport.deserializeUser(function(user,done){
    done(null,user)
})