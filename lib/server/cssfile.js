/**
 * @fileOverview
 * @author dezhao
 */
var path = require('path');
var lessMiddleware = require("less-middleware");


module.exports = lessMiddleware(process.cwd(), {
    preprocess: {
        path: function (pathname, req) {
            var _path = pathname;
            if (_path.indexOf('/build') != -1) {
                _path = pathname.replace(/build/, 'src');
            }
            return _path
        }
    },
    //dest: path.join(process.cwd()),
    debug: true
});