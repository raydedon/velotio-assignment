const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pathsToClean = ['public', 'views'];
const cleanOptions = {
	root: path.resolve(__dirname),
	verbose: true,
	dry: false
};
const paths = require('./config/paths');


module.exports = {
	context: path.resolve(__dirname, 'public'),
	devtool: 'source-map-loader',
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json", ".scss"]
	},
	entry: {
		main: '../src/app/index.tsx'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader', // Run post css actions
						options: {
							plugins: function() { // post css plugins, can be exported to postcss.config.js
								return [
									require('precss'),
									require('autoprefixer')
								];
							}
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.(png|jpg|gif|ttf|eot|woff2?|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			},
			{
				test: /\.(ts|tsx)$/,
				include: paths.appSrc,
				use: [
					{
						loader: require.resolve('ts-loader'),
						options: {
							// disable type checker - we will use it in fork plugin
							transpileOnly: true,
						},
					},
				],
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(pathsToClean, cleanOptions),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new HtmlWebpackPlugin({
			title: 'React redux app',
			template: '../src/views/index.ejs',
			hash: true,
			cache: true,
			favicon: '../src/images/favicon.ico'
		})
	]
};