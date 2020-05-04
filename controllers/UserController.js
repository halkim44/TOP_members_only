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
  console.log(req.app.locals.baham);

  res.render('login_form', {
    title: 'Log In - Members Only',
    wrongCode: false
  });
}
exports.user_update_member_get = (req, res) => {
  if (req.user) {
    res.render('secret_code_form', {title: 'Become A Member - Member Only'})
  }else {
    res.redirect('/login');
  }
}

exports.user_update_member_post = [

  // Validate fields.
  body('secret_code').isLength({
    min: 1
  }).trim().withMessage('secretcode must be specified.'),

  // Sanitize fields.
  sanitizeBody('secret_code').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      
      res.render('secret_code_form', {
        title: 'Become A Member - Member Only',
        errors: errors.array()
      });
      return;
    } else {
      
      if(process.env.SECRETCODE_MEMBER == req.body.secret_code && !req.user.isMember) {
        // update current user model isMember
        User.findByIdAndUpdate(req.user._id, {isMember: true}, function (err) {
          if (err) return next(err);
          res.redirect('/');
          req.app.locals.memberSucceed = true;
         });
         // alert user is member now and tell how to be admin
      } else if(process.env.SECRETCODE_ADMIN == req.body.secret_code && !req.user.isAdmin) {
        // update current user model isAdmin and isMember
        User.findByIdAndUpdate(req.user._id, {isAdmin: true}, function (err) {
          if (err) return next(err);

          res.redirect('/');
          req.app.locals.adminSucceed = true;
         });

      
         // alert user is Admin now
      } else {
      
        // go back to secret_code_form 
        // alert user of failure
        console.log(req.user);
        res.render('secret_code_form', {
          title: 'Sign Up - Members Only',
          wrongCode: true
        });
      }
      // if secretcode not the right code
      // cancel member subscription
      // if success
      // findByIdAndUpdate User model
    }
  },
];
