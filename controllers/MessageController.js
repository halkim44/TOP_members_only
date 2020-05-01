var Message = require('../models/message');

const {
  body,
  validationResult
} = require('express-validator/check');
const {
  sanitizeBody
} = require('express-validator/filter');

// Display Author create form on GET.
exports.message_create_post = [

  // Validate fields.
  body('title').isLength({
    min: 1
  }).trim().withMessage('title must be specified.'),
  body('text').isLength({
    min: 1
  }).trim().withMessage('text must be specified.'),

  // Sanitize fields.
  sanitizeBody('title').escape(),
  sanitizeBody('text').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.redirect('/');
      return;
    } else {

      var message = new Message({
        title: req.body.title,
        text: req.body.text,
        date_posted: new Date(),
        user: req.user._id,
      });

      message.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    }
  },
];