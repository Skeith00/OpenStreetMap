var webpack = require('webpack');
var path = require('path')
module.exports = {
	entry: ['./src/main.js'],
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js'
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
		}
	},
	devServer: {
		watchContentBase: true,		
		port: 9000,
		compress: true,
		stats: "errors-only",
		open: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				include: path.resolve(__dirname, './src'),
				options: {
					
					// vue-loader options go here
				}
			},
			{
				test: /\.(png)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
				use: [
					{
					loader: 'url-loader',
					options: {
						limit: 8192
						}
					}
				]
			}
		]
	}
};