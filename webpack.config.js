const path = require('path');

module.exports = {
	mode: 'production',
	entry: './index.js',
	output: {
		path: path.resolve('./release'),
		filename: 'index.js',
		libraryTarget: 'commonjs2',
	},
	resolve: {
		extensions: ['.js'],
	},

	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				use: 'babel-loader',
			},
			{
				test: /\.worker\.(c|m)?js$/i,
				loader: 'worker-loader',
				options: {
					inline: 'no-fallback',
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	target: 'web',
	externals: { react: 'react' },
};
