const express = require('express');
const expressSession = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const routes = require('./api_routes/routes');
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(logger('dev'));

app.use(express.json());


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(expressSession({ secret: 'SECRET', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
    cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});
const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies['auth'];
    }
    return token;
};
const TOKEN_SECRET = 'SECRET';
const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: TOKEN_SECRET,
};
passport.use(
    'jwt',
    new JwtStrategy(opts, (jwt_payload, done) => {
        try {
            console.log('jwt_payload', jwt_payload);
            done(null, jwt_payload);
        } catch (err) {
            done(err);
        }
    }),
);

const port = process.env.PORT || 5002;

app.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}`);
});


module.exports = app;
