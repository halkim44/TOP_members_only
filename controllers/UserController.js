var User = require('../models/user');
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display user create form on GET.
exports.user_signup_get = function (req, res) {
  res.render('signup_form', {
    title: 'Sign Up - Members Only'
  });
};

exports.user_signup_post = [

  // Validate fields.
  body('username').isLength({
    min: 1
  }).trim().withMessage('username must be specified.'),
  body('password').isLength({
    min: 8
  }).trim().withMessage('password must be more than 8 characters.'),

  // Sanitize fields.
  sanitizeBody('username').escape(),
  sanitizeBody('password').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('signup_form', {
        title: 'Sign Up - Members Only',
        author: req.body,
        errors: errors.array()
      });
      return;
    } else {

      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {

        var user = new User({
          username: req.body.username,
          password: hashedPassword,
        });

        user.save(function (err) {
          if (err) {
            return next(err);
          }
          res.redirect('/login');
        });
      });
    }
  },
];

exports.user_login_get = function (req, res) {
  res.render('login_form', {
    title: 'Log In - Members Only'
  });
}