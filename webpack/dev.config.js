var path = require('path');
var Webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var utils = require('../lib/utils');

var alias = utils.webpack.alias;
var noParse = utils.webpack.noParse; // 忽略查找出现在其中的js所引入的依赖

module.exports = function(outputPath) {
	var output = outputPath ? outputPath : './build';
	return {
		devtool: 'eval-source-map',
		entry: {},
		output: {
			path: path.resolve(utils.path.cwdPath, output),
			filename: '[name].js'
		},
		resolveLoader: {
			root: path.join(__dirname, "./node_modules")
		},
		externals: { // 使用CDN/远程文件
		},
		module: {
			noParse: noParse, // 独立项[path...] (文件路径) 如果你确定一个模块中没有其它新的依赖就可以配置这项，webpack 将不再扫描这个文件中的依赖
			loaders: [
				// { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
				{
					test: /\.jsx$/,
					loader: 'babel-loader!jsx-loader?harmony'
				}, {
					test: /\.js$/,
					loaders: ['babel-loader']
						// exclude: path.join(utils.path.rootPath, './node_modules')
				}, {
					test: /\.ejs$/,
					loader: "ejs-loader?variable=data",
					exclude: path.join(utils.path.rootPath, './node_modules')
				}, {
					test: /\.less$/,
					loader: "style!css!less-loader"
				}, {
					test: /\.css$/,
					loader: 'style-loader!css-loader'
				}, {
					test: /\.(woff|eot|ttf)$/i,
					loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
				}
			]
		},
		resolve: {
			//require时候自动补全扩展名;
			root: [path.join(utils.path.rootPath, './node_modules'), path.join(utils.path.cwdPath, "./node_modules"), path.join(utils.path.cwdPath, "./src/c/common")],
			extensions: ['', '.js', '.json', '.html'],
			alias: alias // 别名
		},

		plugins: [
			//提供全局的变量，在模块中使用无需用require引入
			
			new Webpack.DefinePlugin({  // 传递环境变量给webpack，用以是一些插件达到最好性能，如：redux
			  'process.env':{
			    'NODE_ENV': JSON.stringify('dev')
			  }
			}),

			/*new Webpack.ProvidePlugin({ // 注释此段代码，将不自动注入zepto，需要用户在js入口处手动写入 var $ = require('zepto');
				$: "webpack-zepto"
			}),
		
			new Webpack.ProvidePlugin({ // 注释此段代码，将不自动注入zepto，需要用户在js入口处手动写入 var _ = require('underscore');
				_: "underscore"
			}),*/

			// new Webpack.optimize.CommonsChunkPlugin('./src/p/library.min.js'),

			new Webpack.NoErrorsPlugin()
		]
	}
};