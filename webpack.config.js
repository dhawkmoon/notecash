const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
  entry: [
    './src/js/index.js',
  ],
  output: {

    filename: './js/bundle.js',
		publicPath: '/dist/',
  },
	externals: {
		jquery: 'jQuery',
	},
  devtool: "source-map",
  module: {
    rules: [
			//js
			{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          }
        }
      },
			//css
			{
        test: /\.(sass|scss|css)$/,
        // include: [
				// 	path.resolve(__dirname, 'node_modules'),
				// 	path.resolve(__dirname, 'src/scss/'),
				// ],
        use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [

						{
              loader: "css-loader",
              options: {
                sourceMap: true,
                minimize: true,
                url: false
              }
            },
						'postcss-loader',
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
			// //pug
			// {
			// 	test: /\.(pug|jade)$/,
			// 	include: path.resolve(__dirname, 'src/pug'),
			// 	use: "pug-loader",
			// },
    ]
  },
	//plugins
	plugins: [
    new ExtractTextPlugin({
      filename: './css/styles.css',
      allChunks: true,
    }),
		new CopyWebpackPlugin([{
        from: './src/fonts',
        to: './fonts'
      },
      // {
      //   from: './src/sharing',
      //   to: './sharing'
      // },
      {
        from: './src/i',
        to: './i'
      },
			// {
      //   from: './src/images',
      //   to: './images'
      // },
    ]),

  ]
};
