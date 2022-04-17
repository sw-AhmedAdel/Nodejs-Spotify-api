const Song = require('./song.mongo');

async function GetAllSongs(finalFilter , sortBy , limit , skip){
  return await Song.find(finalFilter)
  .sort(sortBy)
  .limit(limit)
  .skip(skip)
}

async function CreateSong(song){
  const newSong = new Song(song);
  await newSong.save();
  return newSong;
}

async function FindSong (filter) {
  return await Song.findOne(filter);
}


async function UpdateSong(editSong , id ){
  const song = await Song.findByIdAndUpdate(id , editSong , {
    new : true,
    runValidators:true,
  })
  return song
}

async function DeleteSong(id ){
  await Song.findByIdAndDelete(id)
}




module.exports = {
  GetAllSongs,
 CreateSong ,
 DeleteSong,
 UpdateSong,
 FindSong,
 
}


