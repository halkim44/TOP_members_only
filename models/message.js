var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    text: {type: String, required: true},
    date_posted: {type: Date},
    user: {type: Schema.Types.ObjectId, ref: 'user'}

  }
);
//Export model
module.exports = mongoose.model('message', MessageSchema);