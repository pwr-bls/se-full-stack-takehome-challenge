const express = require('express');
const expressSession = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const routes = require('./api_routes/routes');

const app = express();
app.use(cors());
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
passport.use(new GoogleStrategy({
        clientID: '411794888981-qvcr43mppk8uoi2oaa05k7tdim57007e.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:5001/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // here you can create a user in the database if you want to

        return done(null, profile);
    }
));


const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}`);
});


module.exports = app;
