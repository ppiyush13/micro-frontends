const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackRequireFrom = require('webpack-require-from');
const HashedChunkidsPlugin = require('webpack-hashed-chunkids');
const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: './src/App.jsx',
	output: {
		path: __dirname + '/micro-dist',
		filename: 'mf-bundle.js',
		jsonpFunction: 'webpackJsonpmf2',
	},
	externals: {
		'react': 'react',
		'styled-components': 'StyledComponents',
		'react-router-dom': 'ReactRouter'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	plugins: [
		new CleanWebpackPlugin(),
		//new webpack.HashedModuleIdsPlugin(),
		/* new HashedChunkidsPlugin({
			hashDigestLength: 16,
		}), */
		new WebpackRequireFrom({
			variableName: 'MICROFRONT_END_BASE_URL_MF2'
		}),
	],
	/* optimization: {
		splitChunks: {
			name: false,
		}
	}, */
};