// const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  // devtool: 'inline-source-map',
  devtool: 'eval', // react-hot-loader recommend
  devServer: { // https://webpack.js.org/configuration/dev-server/#src/components/Sidebar/Sidebar.jsx
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, 'src/index.html'),
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development'
});
