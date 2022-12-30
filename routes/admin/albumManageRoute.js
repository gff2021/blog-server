const mongoose = require('mongoose');
const { AlbumModel } = require('../../model/albumModal');

const baseURL = '/pictureStorage/albumManage';

module.exports = function (router) {
    // 新建相册
    router.post(baseURL + '/createAlbum', (req, res) => {
        console.log(req.body);
    });
}