
const mongoose = require('mongoose');

const playListSchema = new mongoose.Schema({
 name:{type: String , required: true},
 user: {
   type: mongoose.Schema.Types.ObjectId,
   ref:'User',
   required:true,
 },
 desc: {type:String },
 songs:{type: [String]},

}, {
  timestamps: true,
  toJSON:{virtuals: true},
  toObject:{virtuals: true },
})

 

const Playlist = mongoose.model('Playlist', playListSchema);
module.exports = Playlist;