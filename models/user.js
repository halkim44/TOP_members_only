var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true},
    isMember: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false}
  }
);

//Export model
module.exports = mongoose.model('user', UserSchema);