const passport = require("passport");
const { Strategy: JwtStrategy } = require("passport-jwt");
const User = require("../../models/user.model");

const cookieExtracter = (req) => req.cookies?.token;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: cookieExtracter,
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const user = await User.findById(payload.sub);
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};
