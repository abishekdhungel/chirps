var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Bcrypt= require ('bcryptjs')
var UserSchema = new Schema({
    
fname: { type: String, required:true },
lname: { type: String, required: true},
screenName:{type:String, required: true},
email: {type: String,required:true, unique:true}, 
Password: {type:String, required:true},
dateRegistered: { type: Date, default: Date.today},
follow: [ {type: Schema.Types.ObjectId, ref:'User'}]
});

UserSchema.pre('save', function (next) {
    var person = this;
    if (this.isModified('Password') || this.isNew) { 
       Bcrypt.genSalt(10, function (err, salt) {
            if (err) { 
               return next(err); 
           }
           
        Bcrypt.hash(person.Password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                person.Password = hash;
                next();
            });
        });
    } else { 
       return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    Bcrypt.compare(passw, this.Password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports =  Mongoose.model('User', UserSchema);