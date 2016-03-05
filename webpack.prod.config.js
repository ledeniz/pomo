var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: null,
  entry: [
    './assets/js/index'
  ],
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'assets/js'),
        exclude: path.join(__dirname, 'node_modules/')
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'assets/css'),
        loader: 'style-loader!css-loader'
      }
    ]
  }
}

