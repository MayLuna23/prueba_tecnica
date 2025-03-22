const passport = require('passport');

// const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./jwt.strategy');

// passport.use(LocalStrategy);
passport.use(JwtStrategy);