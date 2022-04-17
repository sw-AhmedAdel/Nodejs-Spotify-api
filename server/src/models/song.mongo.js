const mongoose = require('mongoose');
const SongSchema = new mongoose.Schema({
 
  name:{type : String , required: true},
  artist:{type : String , required: true},
  song:{type : String , required: true},
  image:{type : String , required: true},
  duration:{type : String , required: true},
  like:{type: Number , default: 0}

}, {
  timestamps:true,
  toJSON:{virtuals : true},
  toObject:{virtuals:true}
})

SongSchema.index({artist:1});
SongSchema.index({name:1});


const Song = mongoose.model('Song' ,  SongSchema);
module.exports =Song;