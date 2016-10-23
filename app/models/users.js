var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var UserSchema = new Schema({

fname: { type: String },
lname: { type: String},
screenName:{type:String},
email: {type: String},
Password: {type:String},
dateRegistered: { type: Date, default: Date.today},
follow: [ {type: Schema.Types.ObjectId}]

});

module.exports =  Mongoose.model('User', UserSchema);
