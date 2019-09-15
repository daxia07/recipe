const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: ["babel-polyfill", "./src/js/index.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/index.js",
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    devServer: {
        contentBase: "./dist"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            inject: false
        }),
        new Dotenv(),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new CopyPlugin([
            {
                from: path.resolve(__dirname,"src/img"),
                to: path.resolve(__dirname,"dist/img"),
            },
            {
                from: "src/*.css",
                to: "dist/",
                context: "recipe/"
            }
            ]
        )
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_module/,
            use: {
                loader: "babel-loader"
            }
        },
            {
            test: /\.(png|jpe?g|gif)$/i,
            exclude: /(node_module|bower_components)/,
            use: {
                loader: "file-loader",
                options: { name: '[name].[ext]'}
            },
        }
        ],
    },
    // devtool: "source-map"
    devtool: "cheap-module-eval-source-map",
    target: "web"
};
