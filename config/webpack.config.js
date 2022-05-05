const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const openBrowser = require('react-dev-utils/openBrowser');
let target = 'web';
const host = 'localhost';
const port = '3000';
const plugins = [
  new HtmlWebpackPlugin({
    title: 'Crypto Module',
    template: path.resolve(__dirname, '../public/index.html'),
  }),
  new MiniCssExtractPlugin(),
  new CleanWebpackPlugin(),
];
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'index_bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    client: {
      overlay: true,
    },
    port,
    hot: false,
    onAfterSetupMiddleware() {
      openBrowser(`http://${host}:${port}`);
    },
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: plugins,
  target: target,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
};
