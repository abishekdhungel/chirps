var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var ChirpSchema = new Schema({

chirp: { type: String },
chirpAuthor: { type: Schema.Types.ObjectId},
dateCreated: {type:Date, default:Date.now},
likes: {type: Number, default:0},
reChirp: {type: Boolean, default:false}
});

module.exports = Mongoose.model('Chirp', ChirpSchema);
