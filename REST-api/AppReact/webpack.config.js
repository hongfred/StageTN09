var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});
var webpack = require('webpack');

//la partie dev permet de refresh direct sur la page, mais il faut l'enlever et le faire avec node/express avant le déploiement de l'app
module.exports = {
	devServer: {//ici
		historyApiFallback: true,
	},//à là
	entry: __dirname + '/app/index.js',
	module: {
		loaders : [
			{
				test:/\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	output: {
		filename:'transformed.js',
		path: __dirname + 'build'
	},
	plugins: [
		HTMLWebpackPluginConfig
	]
};
