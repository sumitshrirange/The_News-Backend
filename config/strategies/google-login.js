const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
const User = require("../../models/user.model");

dotenv.config();

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, done) {
        console.log("User Profile Data:", profile);
        try {
          const user = await User.findOneAndUpdate(
            { email: profile.emails[0].value },
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              picture: profile.photos[0].value,
              password: null,
              isLoggedIn: true,
              isVerified: true,
            },
            { upsert: true, new: true }
          );
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};
