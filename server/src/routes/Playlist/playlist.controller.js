const appError = require('../../handelErros/class.handel.errors');
const {filterData} =require('../../services/query');
const {FindSong , GetAllSongs } = require('../../models/song.models');

const {
  CreatNewPlaylist,
  GetAllList,
  UpdateMyList,
  DeleteMyList,
  FindPlayList,
  GetRandomPlaylist
} = require('../../models/playlist.models');


async function httpCreatNewPlaylist(req ,res ,next) {
  const playlist = await CreatNewPlaylist(req);
  return res.status(201).json({
    status:'success',
    data: playlist,
  })
}
async function httpGetAllList(req ,res ,next) {
  const lists = await GetAllList();
  return res.status(200).json({
    status:'success',
    results:lists.length,
    data:lists
  })
}

async function httpGetMyPlayList(req ,res ,next) {
  const lists = await GetAllList({
    _id : req.user.playlist// search for all  id the belongs to playlist and store in user
  })
  return res.status(200).json({
    status:'success',
    results:lists.length,
    data:lists
  })
}

async function httpUpdateMyList(req ,res ,next) {
  const {listid} = req.params;
  const userid = req.user._id;

  const is_exits = await FindPlayList({
    _id:listid,
    user:userid
  })
  if(!is_exits) {
    return next(new appError('list is not exits'))
  }
  const filter = filterData(req.body , 'name','desc');
  const list = await UpdateMyList(filter , listid);
  return res.status(200).json({
    status:'success',
    data : list,
  })
}

async function httpDeleteList (req ,res ,next) {
  const {listid} = req.params;
  const userid = req.user._id;
  const is_exits = await FindPlayList({
    _id:listid,
    user:userid
  })
  if(!is_exits) {
    return next(new appError('list is not exits'))
  }
  await DeleteMyList(listid);
  let index = req.user.playlist.indexOf(listid);
  req.user.playlist.splice(index , 1);
  await req.user.save();
  return res.status(200).json({
    status:'success',
  
  })
}



async function httpAddSongToPlayList(req ,res ,next) {
  const {listid , songid} = req.params;
  console.log(songid)
  const song = await FindSong({_id : songid});
  if(!song) {
  return next(new appError('song list is not exits'));
  }
  const playlist = await FindPlayList({
    _id : listid,
    user:req.user._id
  });

  if(!playlist) {
    return next(new appError('Play list is not exits'));
  }
  let message;
  if(playlist.songs.indexOf(songid) ===-1) {
    playlist.songs.push(songid)
    await playlist.save();
    message='Song has been added'
  }else {
    message='Song alreday exits'
  }
  return  res.status(201).json({
    status:'success',
    message
  })

}


async function httpRemoveSongToPlayList(req ,res ,next) {
  const {listid , songid} = req.params;
  const song = await FindSong({_id : songid});
  if(!song) {
  return next(new appError('song list is not exits'));
  }
  const playlist = await FindPlayList({
    _id : listid,
    user:req.user._id
  });

  if(!playlist) {
    return next(new appError('Play list is not exits'));
  }
  
  const index = playlist.songs.indexOf(songid);
  playlist.songs.splice(index , 1);
  await playlist.save()
  return  res.status(201).json({
    status:'success',
    message:'Song has been removed'
  })
}

async function httpGetRandomPlaylist(req ,res ,next){
  const lists = await GetRandomPlaylist (req.user._id);
  return res.status(200).json({
    status:'success',
    results:lists.length,
    data:lists
  })
}

async function httpGetSongsFromPlayList(req ,res ,next) {
   const {listid}= req.params;
   const playlist = await FindPlayList({
     _id:listid,
     user: req.user._id
   })

   if(!playlist) {
    return next(new appError('Play list is not exits'));
  }

  const songs = await GetAllSongs({_id : playlist.songs});
  return res.status(200).json({
    status:'success',
    songs,
  })

}

module.exports = {
  httpGetMyPlayList,
  httpCreatNewPlaylist,
  httpGetAllList,
  httpUpdateMyList,
  httpDeleteList,
  httpAddSongToPlayList,
  httpRemoveSongToPlayList,
  httpGetRandomPlaylist,
  httpGetSongsFromPlayList

}