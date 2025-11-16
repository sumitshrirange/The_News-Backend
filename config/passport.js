const passport = require("passport");

passport.serializeUser((user, done) => {
    done(null, user.id || user._id); 
});

passport.deserializeUser(async (id, done) => {
    done(null, { id: id }); 
});

require("./strategies/google-login")(passport);
require("./strategies/jwt")(passport);

module.exports = passport;