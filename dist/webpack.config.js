"use strict";var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js" },

  devServer: {
    contentBase: "./dist" },

  plugins: [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "./src/index.html" }),

  new Dotenv()],

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_module/,
      use: {
        loader: "babel-loader" } }] },



  devtool: "source-map" };
//# sourceMappingURL=webpack.config.js.map