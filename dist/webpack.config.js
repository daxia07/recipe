"use strict";var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Dotenv = require('dotenv-webpack');
var CopyPlugin = require('copy-webpack-plugin');


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
    template: "./src/index.html",
    inject: false }),

  new Dotenv(),
  new webpack.LoaderOptionsPlugin({
    debug: true }),

  new CopyPlugin([
  {
    from: path.resolve(__dirname, "src/img"),
    to: path.resolve(__dirname, "dist/img") },

  {
    from: "src/*.css",
    to: "dist/",
    context: "recipe/" }])],




  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_module/,
      use: {
        loader: "babel-loader" } }] },



  // devtool: "source-map"
  devtool: "cheap-module-eval-source-map",
  target: "node" };
//# sourceMappingURL=webpack.config.js.map