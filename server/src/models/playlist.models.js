const Playlist = require('./playlist.mongo');


async function CreatNewPlaylist(req) {
   const newPlayList = new Playlist({
    ...req.body,
    user: req.user._id
   })
   await newPlayList.save();
   req.user.playlist.push(newPlayList._id);
   await req.user.save();
   return newPlayList;
}
async function GetAllList(filter) {
  return await Playlist.find(filter);
}

async function FindPlayList(filter) {
  const list = await Playlist.findOne(filter);
  return list
}

async function UpdateMyList(updatelist , id) {
  const list = await Playlist.findByIdAndUpdate(id , updatelist , {
    new:true,
    runValidators:true
  })
  return list;
}

async function DeleteMyList(id) {
  await Playlist.findByIdAndDelete(id)
}


async function GetRandomPlaylist(userid) {
  const lists =await Playlist.aggregate([
    {$match: {user : userid}}
    ,
    {$sample:{size: 10}}
  ])
  return lists
}

module.exports = {
  CreatNewPlaylist,
  GetAllList,
  UpdateMyList,
  DeleteMyList,
  FindPlayList,
  GetRandomPlaylist
}