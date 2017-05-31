var http = require('http');
var path = require('path');
var express = require('express');
var Webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var GetCatalog = require('./getCatalog'); // 获取并展示目录结构 中间件
var cssFile = require('./cssfile');
var getWebpackDevConfig = require('./getWebpackDevConfig');
var colors = require('cli-color');
var utils = require('../utils');

module.exports = {
    start: function(config) {
        var app = new express();
        var port = config.port;

        app.get('/build/**.css', cssFile);
        app.get('/src/**.css', cssFile);
        app.get('/src/**/index.js', function(req, res, next) {
            if (/\/\@cdnhost[\/\s\S]+\@version/g.test(req.path)) { // 当开发环境请求带有@version的入口js时，重定向到移除@version/的路径
                // 新版的
                var filePath = req.path.replace(/\/\@cdnhost[\/\s\S]+\@version/g, '');
                res.redirect(filePath);
                return;
            }
            var webpackDevConfig = getWebpackDevConfig(req, res, next);
            var complier = new Webpack(webpackDevConfig);
            var middleware = new webpackDevMiddleware(complier, {
                lazy: true,
                noInfo: config.queit || false,
                quiet: false,
                stats: {
                    colors: true
                }
            });
            middleware(req, res, next);
        });

        app.use('/', GetCatalog);
        app.use(express.static(utils.path.cwdPath));
        var server = app.listen(port, function() {
            console.log(colors.green('请复制地址到浏览器中 http://127.0.0.1:' + port, '进行调试'));
        });
    }
};