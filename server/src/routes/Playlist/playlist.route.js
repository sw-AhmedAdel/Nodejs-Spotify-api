const express = require('express');
const listRoute = express.Router();

const catchAsync = require('../../authController/catchAsync');
const authenticate = require('../../authController/authenticate');
const authorized = require('../../authController/authorized');

module.exports = {
  httpCreatNewPlaylist,
  httpGetAllList,
  httpGetMyPlayList,
  httpUpdateMyList,
  httpDeleteList,
  httpAddSongToPlayList,
  httpRemoveSongToPlayList,
  httpGetRandomPlaylist,
  httpGetSongsFromPlayList
}= require('./playlist.controller');

listRoute.use(catchAsync(authenticate));

listRoute.patch('/update/:listid', authorized('user') ,catchAsync(httpUpdateMyList));
listRoute.delete('/delete/:listid', authorized('user'),  catchAsync(httpDeleteList));
listRoute.get('/mylist',authorized('user') , catchAsync(httpGetMyPlayList))
listRoute.post('/', authorized('user') , catchAsync(httpCreatNewPlaylist));
listRoute.post('/add/song/:listid/:songid', authorized('user') ,catchAsync(httpAddSongToPlayList))
listRoute.delete('/remove/song/:listid/:songid', authorized('user') ,catchAsync(httpRemoveSongToPlayList))
listRoute.get('/mysongs/:listid' ,authorized('user') , catchAsync(httpGetSongsFromPlayList) )
listRoute.get('/random', authorized('user') ,catchAsync(httpGetRandomPlaylist));

listRoute.use(authorized('admin'))
listRoute.get('/' , catchAsync(httpGetAllList ))
module.exports = listRoute;