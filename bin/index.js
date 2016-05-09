#!/usr/bin/env node

var program = require('commander');
var colors = require('colors');
var appInfo = require('./../package.json');

program
	.allowUnknownOption() //不报错误
	.version(appInfo.version)
	.usage('FEDTools前端开发工具')
	.option('-c, --config [type]', '配置文件地址')
	.option("-l, --local", "本地构建")
	.parse(process.argv);

/*program
	.command('fed [cmd]')
	.alias('fed')
	.description('FEDTools前端开发工具')
	.action(function(cmd, options) {
		console.log(" _____ _____ ____ _____           _     ");
		console.log("|  ___| ____|  _ \\_   _|__   ___ | |___ ");
		console.log("| |_  |  _| | | | || |/ _ \\ / _ \\| / __|");
		console.log("|  _| | |___| |_| || | (_) | (_) | \\__ \\");
		console.log("|_|   |_____|____/ |_|\\___/ \\___/|_|___/");
		if (cmd == 'dev') {
			console.log(colors.green('开启调试模式'));
			console.log(colors.green(program.config));
			console.log(colors.green(program.local));
		} else if (cmd == 'build') {
			console.log(colors.green('开启构建'));
			var env = '远端';
			if (program.local) {
				env = '本地';
			}
			console.log(colors.green('开启' + env + '构建'));
		}

	}).on('--help', function() {
		console.log('  Examples:');
		console.log('');
		console.log('    fed dev,开启本地开发模式');
		console.log('    fed build -l,进行本地构建');
		console.log('');
		process.exit(1);
	});*/

program
	.command('build')
	.alias('b')
	.description('进行构建')
	.action(function(cmd, options) {
		console.log(" _____ _____ ____ _____           _     ");
		console.log("|  ___| ____|  _ \\_   _|__   ___ | |___ ");
		console.log("| |_  |  _| | | | || |/ _ \\ / _ \\| / __|");
		console.log("|  _| | |___| |_| || | (_) | (_) | \\__ \\");
		console.log("|_|   |_____|____/ |_|\\___/ \\___/|_|___/");
		console.log(colors.green('开启构建'));

		var env = '远端';
		if (program.local) {
			env = '本地';
		}
		console.log(colors.green('开启' + env + '构建'));

	}).on('--help', function() {
		console.log('  Examples:');
		console.log('');
		console.log('    fed build -l,进行本地构建');
		console.log('');
		process.exit(1);
	});

program
	.command('dev')
	.alias('b')
	.description('进行开发')
	.action(function(cmd, options) {
		console.log(" _____ _____ ____ _____           _     ");
		console.log("|  ___| ____|  _ \\_   _|__   ___ | |___ ");
		console.log("| |_  |  _| | | | || |/ _ \\ / _ \\| / __|");
		console.log("|  _| | |___| |_| || | (_) | (_) | \\__ \\");
		console.log("|_|   |_____|____/ |_|\\___/ \\___/|_|___/");

		console.log(colors.green('开启开发模式'));

	}).on('--help', function() {
		console.log('  Examples:');
		console.log('');
		console.log('    fed dev,开启本地开发模式');
		console.log('');
		process.exit(1);
	});

program.parse(process.argv);