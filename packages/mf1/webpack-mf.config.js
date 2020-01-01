const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackRequireFrom = require('webpack-require-from');
const HashedChunkidsPlugin = require('webpack-hashed-chunkids');

module.exports = {
	devtool: 'source-map',
	entry: './src/App.jsx',
	output: {
		path: __dirname + '/micro-dist',
		filename: 'mf-bundle.js',
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
		new HashedChunkidsPlugin({
			hashDigestLength: 16,
		}),
		new WebpackRequireFrom({
			variableName: 'MICROFRONT_END_BASE_URL_MF1'
		}),
	],
	optimization: {
		splitChunks: {
			name: false,
		}
	},
};