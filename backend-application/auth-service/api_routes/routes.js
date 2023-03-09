'use strict';
const passport = require('passport');
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = 'SECRET';

module.exports = (app) => {
    app.route('/auth/google').get(passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.route('/auth/google/callback').get(passport.authenticate('google', { failureRedirect: '/error' }),
        function(req, res) {
            const token = jwt.sign({ id: req.user.sub, name: req.user.name, userId: req.user.id }, TOKEN_SECRET, {
                expiresIn: 60 * 60,
            });
            res.cookie('auth', token, { httpOnly: true });
            res.redirect('http://localhost:3000/');

        });

}
