var express = require('express'),
    util = require('util'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User = require('../../app/models/User');


module.exports = function() {
    if (this.version !== require('locomotive').version) {
        console.warn(util.format('version mismatch between local (%s) and global (%s) Locomotive module', require('locomotive').version, this.version));
    }

    this.set('views', __dirname + '/../../app/views');
    this.set('view engine', 'ejs');
    this.engine('ejs', require('ejs').__express);
    this.datastore(require('locomotive-mongoose'));
    this.use(express.logger());
    this.use(express.favicon());
    this.use(express.static(__dirname + '/../../public'));
    this.use(express.bodyParser());
    this.use(express.methodOverride());
    this.use(express.cookieParser());
    this.use(express.session({ secret: 'these are my ideas' }));
    this.use(passport.initialize());
    this.use(passport.session());
    this.use(this.router);


    passport.use(new GoogleStrategy({
            clientID: "522473818235.apps.googleusercontent.com",
            clientSecret: "kumf-sCLda_FzIeWLg0gscUw",
            callbackURL: "http://localhost:3000/auth/google/callback",
            scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
        },
        function(accessToken, refreshToken, profile, done) {
            var user = {
                googleId: profile.id,
                name: profile.name.givenName,
                email: profile.emails[0].value
            };

            User.findOneAndUpdate({ googleId: profile.id }, user, { upsert: true }, function(err, user) {
                if (err) {
                    return done(err);
                }
                return done(err, user);
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};