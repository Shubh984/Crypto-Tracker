const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('JWT Payload:', jwt_payload); // Debugging log
    User.findById(jwt_payload._id)
      .then(user => {
        if (user) {
          console.log('User found:', user); // Debugging log
          return done(null, user);
        }
        console.log('User not found'); // Debugging log
        return done(null, false);
      })
      .catch(err => {
        console.log('Error in JWT strategy:', err); // Debugging log
        return done(err, false);
      });
  }));
};
