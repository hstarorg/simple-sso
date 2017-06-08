const path = require('path');
const webpack = require('webpack');
const util = require('./util');

module.exports = {
  entry: {
    common: util.root('src/assets/js/common/index.js'),
    config: util.root('src/assets/js/config.js'),
    apps: util.root('src/assets/js/apps.js'),
    'app-detail': util.root('src/assets/js/app-detail.js')
  },
  output: {
    path: util.root('dist/assets'),
    filename: 'js/[name].js',
    chunkFilename: '[id].js'
  },
  devtool: 'cheap-source-map',
  cache: true,
  profile: true,
  resolve: {
    extensions: ['.js', '.vue']
  },
  watchOptions: {
    ignored: /node_modules/
  },

  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ],
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader', options: { loaders: {} } },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
      // { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader' }) },
      // { test: /\.styl$/, use: ExtractTextPlugin.extract({ use: 'css-loader!stylus-loader' }) },
      // { test: /\.less$/, use: ExtractTextPlugin.extract({ use: 'css-loader!less-loader' }) },
      // { test: /\.scss$/, use: ExtractTextPlugin.extract({ use: 'css-loader!sass-loader' }) },
      // { test: /\.sass$/, use: ExtractTextPlugin.extract({ use: 'css-loader!sass-loader?indentedSyntax=true' }) }
    ]
  }
};
