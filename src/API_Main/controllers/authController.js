const passport = require('passport');

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleRedirect = (req, res, next) => { passport.authenticate('google', { failureRedirect: '/login', successRedirect: 'http://localhost:3006/' }) (req, res, next)};

exports.redirectOnSuccess = (req, res) => {
    res.redirect('/');
  };

exports.googleLogout = (req, res) => {req.logout(() => {res.send("Logout")})}