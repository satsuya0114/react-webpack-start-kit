const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  // context: path.resolve(__dirname, 'src'), // 整個檔案都以src 為基礎資料夾
  // --- 以下這段在webpack 4.0 up 可寫可不寫
  // entry: path.resolve(__dirname, 'src'), // entry 不寫 則default 為 ./src
  // output: { // output 不寫 則default 為 ./dist
  //   filename: 'output.[hash].bundle.js',
  //   path: path.resolve(__dirname, 'dist'),
  //   publicPath: '/'
  // },
  // ---
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
          'style-loader',
          'css-loader',
          'postcss-loader',
        ]
      }, {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // This plugin should be used only on production builds without style-loader in the loaders chain, especially if you want to have HMR in development.
          // Here is an example to have both HMR in development and your styles extracted in a file for production builds.
          'css-loader',
          'less-loader',
          'postcss-loader',
        ]
      }, {
        test: /\.(sa|sc)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ]
      }, {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: { // https://webpack.docschina.org/configuration/resolve/
    alias: {
      containers: path.resolve(__dirname, 'src/containers/'),
    },
    extensions: [
      '.js',
      '.jsx'
    ],
    modules: [
      path.resolve(__dirname, 'src/'),
      path.resolve(__dirname, 'node_modules/'),
    ]
  },
  optimization: { // https://webpack.js.org/configuration/optimization/#optimization-minimizer
    minimizer: [ // Allows you to override the default minimizer by providing a different one or more customized UglifyjsWebpackPlugin instances.
      new UglifyJSPlugin({
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({}), // Since extract-text-webpack-plugin only bundles (merges) text chunks, if its used to bundle CSS, the bundle might have duplicate entries (chunks can be duplicate free but when merged, duplicate CSS can be created).
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new webpack.NamedChunksPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ]
};