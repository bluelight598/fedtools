var inquirer = require('inquirer');
// var buildInfos = require('../lib/util/getEntry')(userConfig.version);
var buildInfos = {
	autoGetEntry: {
		'src/p/Perfectinformation/0.0.1/index': './src/p/Perfectinformation/index.js',
		'src/p/about/0.0.1/index': './src/p/about/index.js',
		'src/p/apply-loan/0.0.1/index': './src/p/apply-loan/index.js',
		'src/p/apply-result/0.0.1/index': './src/p/apply-result/index.js',
		'src/p/authorize-protocol/0.0.1/index': './src/p/authorize-protocol/index.js',
		'src/p/completeInfo/0.0.1/index': './src/p/completeInfo/index.js',
		'src/p/contract/0.0.1/index': './src/p/contract/index.js',
		'src/p/feedback/0.0.1/index': './src/p/feedback/index.js',
		'src/p/helpcenter/0.0.1/index': './src/p/helpcenter/index.js',
		'src/p/housing-fund/0.0.1/index': './src/p/housing-fund/index.js',
		'src/p/idcheck/0.0.1/index': './src/p/idcheck/index.js',
		'src/p/index/0.0.1/index': './src/p/index/index.js',
		'src/p/information/0.0.1/index': './src/p/information/index.js',
		'src/p/loading/0.0.1/index': './src/p/loading/index.js',
		'src/p/loan-detail/0.0.1/index': './src/p/loan-detail/index.js',
		'src/p/loan-stages/0.0.1/index': './src/p/loan-stages/index.js',
		'src/p/loan-term/0.0.1/index': './src/p/loan-term/index.js',
		'src/p/loan_explain/0.0.1/index': './src/p/loan_explain/index.js',
		'src/p/my/0.0.1/index': './src/p/my/index.js',
		'src/p/myLoan/0.0.1/index': './src/p/myLoan/index.js',
		'src/p/my_index/0.0.1/index': './src/p/my_index/index.js',
		'src/p/mysetting/0.0.1/index': './src/p/mysetting/index.js',
		'src/p/review-results/0.0.1/index': './src/p/review-results/index.js',
		'src/p/service/0.0.1/index': './src/p/service/index.js',
		'src/p/social-insurance/0.0.1/index': './src/p/social-insurance/index.js',
		'src/p/test/0.0.1/index': './src/p/test/index.js'
	},
	autoGetHtml: {
		keys: ['src/p/Perfectinformation/0.0.1/index',
			'src/p/about/0.0.1/index',
			'src/p/apply-loan/0.0.1/index',
			'src/p/apply-result/0.0.1/index',
			'src/p/authorize-protocol/0.0.1/index',
			'src/p/completeInfo/0.0.1/index',
			'src/p/contract/0.0.1/index',
			'src/p/feedback/0.0.1/index',
			'src/p/helpcenter/0.0.1/index',
			'src/p/housing-fund/0.0.1/index',
			'src/p/idcheck/0.0.1/index',
			'src/p/index/0.0.1/index',
			'src/p/information/0.0.1/index',
			'src/p/loading/0.0.1/index',
			'src/p/loan-detail/0.0.1/index',
			'src/p/loan-stages/0.0.1/index',
			'src/p/loan-term/0.0.1/index',
			'src/p/loan_explain/0.0.1/index',
			'src/p/my/0.0.1/index',
			'src/p/myLoan/0.0.1/index',
			'src/p/my_index/0.0.1/index',
			'src/p/mysetting/0.0.1/index',
			'src/p/register-protocol/0.0.1/index',
			'src/p/review-results/0.0.1/index',
			'src/p/service/0.0.1/index',
			'src/p/social-insurance/0.0.1/index',
			'src/p/test/0.0.1/index'
		],
		jsEntry: {
			'src/p/Perfectinformation/0.0.1/index': './src/p/Perfectinformation/index.js',
			'src/p/about/0.0.1/index': './src/p/about/index.js',
			'src/p/apply-loan/0.0.1/index': './src/p/apply-loan/index.js',
			'src/p/apply-result/0.0.1/index': './src/p/apply-result/index.js',
			'src/p/authorize-protocol/0.0.1/index': './src/p/authorize-protocol/index.js',
			'src/p/completeInfo/0.0.1/index': './src/p/completeInfo/index.js',
			'src/p/contract/0.0.1/index': './src/p/contract/index.js',
			'src/p/feedback/0.0.1/index': './src/p/feedback/index.js',
			'src/p/helpcenter/0.0.1/index': './src/p/helpcenter/index.js',
			'src/p/housing-fund/0.0.1/index': './src/p/housing-fund/index.js',
			'src/p/idcheck/0.0.1/index': './src/p/idcheck/index.js',
			'src/p/index/0.0.1/index': './src/p/index/index.js',
			'src/p/information/0.0.1/index': './src/p/information/index.js',
			'src/p/loading/0.0.1/index': './src/p/loading/index.js',
			'src/p/loan-detail/0.0.1/index': './src/p/loan-detail/index.js',
			'src/p/loan-stages/0.0.1/index': './src/p/loan-stages/index.js',
			'src/p/loan-term/0.0.1/index': './src/p/loan-term/index.js',
			'src/p/loan_explain/0.0.1/index': './src/p/loan_explain/index.js',
			'src/p/my/0.0.1/index': './src/p/my/index.js',
			'src/p/myLoan/0.0.1/index': './src/p/myLoan/index.js',
			'src/p/my_index/0.0.1/index': './src/p/my_index/index.js',
			'src/p/mysetting/0.0.1/index': './src/p/mysetting/index.js',
			'src/p/register-protocol/0.0.1/index': false,
			'src/p/review-results/0.0.1/index': './src/p/review-results/index.js',
			'src/p/service/0.0.1/index': './src/p/service/index.js',
			'src/p/social-insurance/0.0.1/index': './src/p/social-insurance/index.js',
			'src/p/test/0.0.1/index': './src/p/test/index.js'
		}
	}
}

var userConfig = {"appName":"xiaqiu","publish":{"daily":[{"host":"192.168.180.10","path":"/opt/www/build/"}],"pre":[{"host":"123.57.42.161","path":"/opt/www/build/"}],"online":[{"host":"101.201.199.232","path":"/opt/www/build/"},{"host":"123.57.74.74","path":"/opt/www/build/"}]},"version":"0.2.1","auto-entry":true,"bid-js-entry":{},"alias":{"zepto":"webpack-zepto"},"extract-common-to-path":false};

var deployJSON = null;

inquirer.prompt([{
	type: 'input',
	name: 'username',
	message: '请输入您的用户名:'
}, {
	type: 'password',
	name: 'password',
	message: '请输入您的密码:'
}, {
	type: 'list',
	name: 'env',
	message: '请选择发布环境:',
	choices: ['本地生成部署配置', '日常环境', '预发环境', '线上环境']
}, {
	type: 'checkbox',
	name: 'selectedEntry',
	message: '请选择需要进行构建的页面:',
	choices: buildInfos.autoGetHtml.keys
}]).then(function(answers) {
	deployJSON = answers;
	deployJSON.htmlEntry = [];
	deployJSON.jsEntry = {};

	// if (true || !program.args[0].buildall) { // 通过选择进行build
	if (true) { // 通过选择进行build
		answers.selectedEntry.forEach(function(se, index) {
			for (var htmlKey in buildInfos.autoGetHtml.jsEntry) {
				if (htmlKey.split(se).length > 1) {
					var tmpSrc = './' + htmlKey + '.html';
					if (userConfig.version) {
						tmpSrc = tmpSrc.replace(userConfig.version + '/', '');
					}
					if (buildInfos.autoGetHtml.jsEntry[htmlKey]) {
						deployJSON.jsEntry[htmlKey] = buildInfos.autoGetHtml.jsEntry[htmlKey];
					}
					deployJSON.htmlEntry.push(tmpSrc);
					break;
				}
			}
		});
	} else { // buildall 自动根据匹配规则（匹配所有src/p/**/index.js）寻找JS入口文件并打包
		deployJSON.jsEntry = buildInfos.autoGetEntry;
	}
	console.log('done!!!!!!')
	return deployJSON;
}).then(function(data){
	console.log(data);
	console.log('then')
});
