const webpack = require('webpack');
const { resolve, join } = require('path');
const { getIfUtils, removeEmpty } = require('webpack-config-utils')
const autoprefixer = require('autoprefixer');

const config = env => {
  const { ifProd } = getIfUtils(env)

  return {
    entry: {
      js: './js/index.js',
      vendor: ['react']
    },
    output: {
      path: join(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    context: resolve(__dirname, 'assets'),
    devtool: env.prod ? 'source-map' : 'eval',
    devServer: {
      contentBase: resolve(__dirname, 'assets'),
      hot: true
    },
    bail: env.prod,
    module: {
      loaders: [
        { test: /\.css$/, include: join(__dirname, 'assets/css'), loader: 'style-loader!css-loader!postcss-loader' },
        { test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: [ 'babel-loader' ] },
        { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'file-loader' }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [ resolve('./assets'), 'node_modules' ]
    },
    plugins: removeEmpty([
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify((env.prod) ? 'production' : 'development') }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor.bundle.js'
      }),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          context: __dirname,
          postcss: [
            autoprefixer
          ]
        }
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false },
        sourceMap: false
      }))
    ]),
  }
}

module.exports = config
