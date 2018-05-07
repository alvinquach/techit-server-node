const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = (passport) => {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    };

    passport.use(new JwtStrategy(opts, function(payload, done) {
        if (!payload || !payload.id || !payload.position) {
            return done(null, false);
        }
        const user = {
            _id: payload.id,
            username: payload.username,
            position: payload.position
        };
        if (payload.unitId) {
            user.unit = payload.unitId;
        }
        return done(null, user);
    }));
};

const authenticate = (passport) => {
    return passport.authenticate('jwt', { session: false });
};

module.exports = {
    config,
    authenticate
}