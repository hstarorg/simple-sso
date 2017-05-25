const path = require('path');
const webpack = require('webpack');
const util = require('./util');

module.exports = {
  devtool: 'cheap-source-map',
  cache: true,
  profile: true,
  resolve: {
    extensions: ['.js']
  },
  watchOptions: {
    ignored: /node_modules/
  },
  entry: {
    apps: util.root('src/assets/js/apps.js')
  },
  output: {
    path: util.root('dist/assets'),
    filename: 'js/[name].js',
    chunkFilename: '[id].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
      // { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader' }) },
      // { test: /\.styl$/, use: ExtractTextPlugin.extract({ use: 'css-loader!stylus-loader' }) },
      // { test: /\.less$/, use: ExtractTextPlugin.extract({ use: 'css-loader!less-loader' }) },
      // { test: /\.scss$/, use: ExtractTextPlugin.extract({ use: 'css-loader!sass-loader' }) },
      // { test: /\.sass$/, use: ExtractTextPlugin.extract({ use: 'css-loader!sass-loader?indentedSyntax=true' }) }
    ]
  }
};
