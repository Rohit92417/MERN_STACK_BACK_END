let passport = require("passport");
let GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user-model");
const cookiesSession = require("cookie-session");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
      // passReqToCallback: true,
    },
    function (accessToken, refreshToken, profile, done) {
      //check if user already exists in our db
      User.findOne({ email: profile.email }).then((currentUser) => {
        if (currentUser) {
          console.log("user is: " + currentUser);
          done(null, currentUser);
        } else {
          new User({
            name: profile.displayName,
            email: profile.email,
            picture: profile.picture,
          })
            .save()
            .then((newUser) => {
              console.log("new user created" + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
