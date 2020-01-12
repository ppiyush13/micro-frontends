const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackRequireFrom = require('webpack-require-from');
const EntryChunkLoader = require('./plugin/EntryChunkLoader');
const ChunksWebpack = require('./plugin/ChunksWebpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

/*module.exports = {
	devtool: 'source-map',
	entry: './plugin/load.js',
	output: {
		path: path.resolve(__dirname, 'micro-dist'),
		filename: 'js/[name].js',
		jsonpFunction: 'webpackJsonpmf1',
	},
	devServer: {
		hot: false,
		port: 9001,
		injectClient: false,
		injectHot: false,
		historyApiFallback: true,
		contentBase: './micro-dist',
	},
};*/

module.exports =
{
	devtool: 'source-map',
	entry: [
		'./src/plugin/load.js',
	],
	output: {
		path: path.resolve(__dirname, 'micro-dist'),
		filename: '[name].js',
		chunkFilename: '[name].[contenthash:8].chunk.js',
		//filename: 'mf-bundle.js',
		jsonpFunction: 'webpackJsonpmf1',
	},
	externals: {
		'react': 'react',
		'styled-components': 'StyledComponents',
		'react-router-dom': 'ReactRouter',
		'loadjs': 'loadjs',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	plugins: [
		new CleanWebpackPlugin(),
		new WebpackRequireFrom({
			variableName: 'MICROFRONT_END_BASE_URL_MF1'
		}),
		//new ChunksWebpack(),
		new HtmlWebPackPlugin({
			template: "./public/index.html",
			filename: "./index.html"
		}),
		new EntryChunkLoader({
			filename: 'entryChunk.js'
		}),
	],
	devServer: {
		hot: false,
		port: 9001,
		injectClient: false,
		injectHot: false,
		historyApiFallback: true,
		contentBase: './micro-dist',
	},
	optimization: {
		namedModules: true,
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'async',
					/* test: (module, chunks, cacheGroupKey) => {						
						if(chunks.filter(({name}) => name === 'main').length === 0) {
							if(module.userRequest) {
								return !!module.userRequest.match(/[\\/]node_modules[\\/]/);
							}
							return false;
						}
						else {
							return false;
						}
					}, */
				},
			},
		},
	},
};
