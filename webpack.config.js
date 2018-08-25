 var path = require('path');
 var webpack = require('webpack');
 module.exports = {
     entry: './src/index.js',
     output: {
         path: path.resolve(__dirname, 'dist/assets/js'),
         filename: 'app.bundle.js'
     },
     module: {
         rules: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     mode: "development",
     devtool: 'source-map'
 };
