const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')

const autoprefixer = require('autoprefixer')

module.exports = {
  target: 'node',
  entry: ['babel-polyfill', './server.js'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  externals: [webpackNodeExternals()],
  resolve: {
    extensions: ['.jsx', '.json', '.js']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [autoprefixer]
              }
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /(s-alert-default.css|s-alert-css-effects|normalize.css)/,
        loader:
          'style-loader!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'
      },
      {
        test: /\.css$/,
        include: /(s-alert-default.css|s-alert-css-effects|normalize.css)/,
        loader: 'style-loader!css-loader?sourceMap'
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
  //devtool: 'inline-source-map'
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './public/index.html'
  //   })
  // ]
}
