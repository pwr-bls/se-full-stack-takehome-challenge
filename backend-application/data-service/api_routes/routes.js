'use strict';
const passport = require('passport');
const favouritesControllers = require('../controller/favourites');

module.exports = (app) => {
    app.route('/greetme').get((req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log('error is', err);
                res.status(500).send('An error has occurred, we cannot greet you at the moment.');
            }
            else {
                res.send({ success: true, id: user.userId, fullName: `${user.name.givenName} ${user.name.familyName}` })
            }
        })(req, res, next);
    });
    app.route('/logout').post((req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log('error is', err);
                res.status(500).send('An error has occurred, we cannot greet you at the moment.');
            }
            else {
                res.clearCookie('auth');
                req.session.destroy(function() {

                });
                req.logOut({}, () => {
                    res.send({ success: true })
                });
            }
        })(req, res, next);
    });
    app.route('/user/favourites').get(favouritesControllers.get);
    app.route('/user/favourites').post(favouritesControllers.add);
    app.route('/user/favourites').delete(favouritesControllers.remove);
}
