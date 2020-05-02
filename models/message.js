var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    text: {type: String, required: true},
    date_posted: {type: Date},
    user: {type: Schema.Types.ObjectId, ref: 'user'}

  }
);

MessageSchema
.virtual('date_posted_formatted')
.get(function () {
  return moment(this.date_posted).format('LLLL');
});

//Export model
module.exports = mongoose.model('message', MessageSchema);