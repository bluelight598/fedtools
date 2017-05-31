var path = require('path');
var webpackDevMiddleware = require('webpack-dev-middleware');
var Webpack = require('webpack');
var webpackDevConfig = require('../../webpack/dev.config')();
var utils = require('../utils');

module.exports = function (req, res, next) {
    var filePath = req.path;
    if (/index\.js$/.test(filePath)) {
        var entryObj = {};
        var pageName = filePath.substring(1, filePath.length - 3);
        entryObj[pageName] = './' + pageName;
        // 定义全集load 目录; 吧node_modules目录加入到require中;
        webpackDevConfig.resolve.root = [path.join(utils.path.cwdPath, 'src'), path.join(__dirname, '../node_modules')]; // 必须是绝对路径
        webpackDevConfig.entry = entryObj;
        webpackDevConfig.output.path = path.join(utils.path.cwdPath, 'bulid');
        return webpackDevConfig;
    } else {
        next();
    }
};