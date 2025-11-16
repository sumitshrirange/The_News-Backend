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
        scope: ["profile", "email"],
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const userEmail = profile.emails[0].value;
          let user = await User.findOne({ email: userEmail });

          if (user) {
            if (!user.isLoggedIn) {
              user.isLoggedIn = true;
              await user.save();
            }
            return done(null, user);
          } else {
            const newUser = await User.create({
              name: profile.displayName,
              email: userEmail,
              picture: profile.photos[0].value,
              isLoggedIn: true,
              isVerified: true,
            });
            return done(null, newUser);
          }
        } catch (error) {
          console.error("Error during Google strategy processing:", error);
          return done(error, null);
        }
      }
    )
  );
};
