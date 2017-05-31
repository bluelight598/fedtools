#!/usr/bin/env node

'use strict';

require('shelljs/global');
/**
 * 
 * @fileOverview npm安装及更新
 * @author leo.yy
 * 
 */
var path = require('path');
var colors = require('cli-color');

var rootPath = path.join(__dirname, '../../');

function deleteTnpmInfo(output) {
	// return output.replace(/^.+WARNING.*tnpm 推荐[\s\S]+tnpm@stable/ig, '');
	return output;
}

module.exports = {
	update: function(settings, callback) { // 自动更新模块
		console.log(colors.blue('正在自动执行 npm update && npm dedupe 以更新依赖模块版本……'));
		var initTime = new Date().getTime();

		exec('cd ' + rootPath + ' && npm update && npm dedupe -d', {
			async: true,
			silent: settings.quiet
		}, function(code, output) {
			var nowTime = new Date().getTime();
			console.log(colors.blue('耗时:' + (nowTime - initTime)/1000),'s');
			console.log(colors.green('npm update && npm dedupe 执行完毕!'));
			callback && callback();
		});
	},
	install: function(settings, callback) { // 重新安装指定模块
		console.log(colors.blue('正在自动执行 npm install ' + settings.moduleName + ' --force 以强制重新安装依赖模块……'));
		var initTime = new Date().getTime();

		exec('cd ' + rootPath + ' && npm install ' + settings.moduleName + ' --force', {
			async: true,
			silent: settings.quiet
		}, function(code, output) {
			var nowTime = new Date().getTime();
			console.log(colors.blue('耗时:' + (nowTime - initTime)/1000),'s');
			console.log(colors.green('npm install ' + settings.moduleName + ' --force 执行完毕!'));
			callback && callback();
		});
	}
};