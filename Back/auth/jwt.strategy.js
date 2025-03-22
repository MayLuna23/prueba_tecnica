require("dotenv").config();
const { Strategy, ExtractJwt } = require('passport-jwt');
const jwtSecret = process.env.SECRET;

const options = {
  //jwrFromRequest is function that accepts a request as the only parameter and returns either the JWT as a string or null.
  //Define how the JWT will be extracted from the request
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload)
});


module.exports = JwtStrategy;