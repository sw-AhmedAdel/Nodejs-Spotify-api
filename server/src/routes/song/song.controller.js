const {
  GetAllSongs,
  CreateSong ,
  DeleteSong,
  UpdateSong,
  FindSong,
  
} = require('../../models/song.models');
const appError = require('../../handelErros/class.handel.errors');
const filterFeaturs =require('../../services/class.filter');

 
async function httpCreateSong (req ,res ,next) {
  const Song = req.body;
  const newSong = await CreateSong(Song);
  return res.status(201).json({
    status:'success',
    data: newSong
  })
}



async function httpGelAll (req ,res ,next) {
 
  const filter = {...req.query};
  const execludeFileds = ['page','sort','limit'];
  execludeFileds.forEach((el) => delete filter[el]);
  const features = new filterFeaturs(req.query , filter);

  const finalFilter = features.filterFun();
  const sortBy = features.sortBy();
  const {limit , skip} =features.getPagination();
  const Songs = await GetAllSongs(finalFilter , sortBy , limit , skip);
  return res.status(200).json({
    status:'success',
    resulta:Songs.length ,
    data: Songs//.reverse()
  })
}


async function httpUpdateSong (req ,res ,next) {
  const {Songid} = req.params;
 
  const is_exits = await FindSong({
    _id : Songid
  })
  if(!is_exits){
    return next (new appError('Song is not extis'))
  }
  console.log('sd')
  const Song = await UpdateSong(req.body , Songid);
  return res.status(200).json({
    status:'success',
    data: Song
  })
}

async function httpDeleteSong (req ,res ,next) {

  const {Songid} = req.params;
  const is_exits = await FindSong({
    _id : Songid
  })
  if(!is_exits){
    return next (new appError('Song is not extis'))
  } 
   await DeleteSong(Songid);
  return res.status(200).json({
    status:'success',
    messgae:'Song has been deleted'
  })
}


async function httpGetSingleSong (req ,res ,next) {
  const {Songid} = req.params;
  const Song = await FindSong({
    _id : Songid
  })
  if(!Song){
    return next (new appError('Song is not extis'))
  }
  return res.status(200).json({
    status:'success',
    data: Song
  })
}


async function httpGetMyAllLikedSongs(req, res ,next) {
  
  const {Songid} =  req.params;
  const song = await FindSong({_id : Songid});
  if(!song){
    return next(new appError('Song is not exits'));
  }
  let message ;
  const user = req.user;
  
  const index = user.likedSong.indexOf(Songid);
  
  if(index === -1) {
   song.like = song.like  +1;
   await song.save();
   user.likedSong.push(Songid);
   message ='Added to your liked sogs';
  }
  else {
    song.like =song.like - 1;
    await song.save();
    user.likedSong.splice(index , 1);
    message ='removed to your liked sogs';
  }
  await user.save();
  return res.status(200).json({
    status:'succes',
    message,
  })
}

async function httpGetAllLikedSongs(req ,res ,next) {
  const songs = await GetAll({
    _id: req.user.likedSong
  })
  return res.status(200).json({
    status:'success',
    songs
  })
}


module.exports = {

  httpCreateSong,
  httpGelAll,
  httpUpdateSong,
  httpDeleteSong,
  httpGetSingleSong,
  httpGetAllLikedSongs,
  httpGetMyAllLikedSongs
}