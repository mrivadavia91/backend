import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';

const SECRET_KEY = process.env.SECRET_KEY; 

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies?.token || null,
    ]),
    secretOrKey: SECRET_KEY,
};

passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
        try {
            const user = await User.findById(jwtPayload.id);
            if (!user) return done(null, false);
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    })
);
