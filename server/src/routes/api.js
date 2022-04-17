const express = require('express');
const api = express.Router();
const userRoute = require('./user/user.route');
const songRoute = require('./song/song.route');
const listRoute= require('./Playlist/playlist.route');

api.use('/playlist' , listRoute)
api.use('/songs', songRoute);
api.use('/users', userRoute);

module.exports = api;