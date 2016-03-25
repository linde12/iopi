module.exports = {
  entry: './src/js/index.js',
  output: {
    path: '.dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    inline: true,
    contentBase: './dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          // presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
			{
				test: /.*img\/icons.*\.svg$/,
				loader: 'babel!grommet-icon!svgo'
			}
    ]
  }
};
