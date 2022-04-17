const express = require('express');
const songRoute = express.Router();

const catchAsync = require('../../authController/catchAsync');
const authenticate = require('../../authController/authenticate');
const authorized = require('../../authController/authorized');

const {
  httpMyProfile,
  httpCreateSong,
  httpGelAll,
  httpUpdateSong,
  httpDeleteSong,
  httpGetSingleSong,
  httpGetMyAllLikedSongs,
  httpLikeDislikeSong
} = require('./song.controller');



/////////// authenticate
songRoute.use(catchAsync(authenticate));
songRoute.get('/' , catchAsync(httpGelAll));
songRoute.get('/get/:Songid', catchAsync(httpGetSingleSong));
songRoute.get('/like/:Songid', catchAsync(httpLikeDislikeSong))
songRoute.get('/like', catchAsync(httpGetMyAllLikedSongs))

songRoute.use(authorized('admin'));
songRoute.post('/', catchAsync(httpCreateSong));
songRoute.patch('/update/:Songid',  catchAsync(httpUpdateSong));
songRoute.delete('/delete/:Songid', catchAsync(httpDeleteSong));



module.exports = songRoute;
