var passport = require('passport');

// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes() {
    this.root('pages#main');

    this.get('/auth/google',
        passport.authenticate('google'));

    this.get('/auth/google/callback',
        passport.authenticate('google', { successRedirect: '/', failureRedirect: '/error' }));

    this.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

};