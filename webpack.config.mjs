/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://dev.to/deadwing7x/setup-a-react-app-with-webpack-and-babel-4o3k
// https://www.robinwieruch.de/minimal-react-webpack-babel-setup/
// https://www.npmjs.com/package/webpack-node-externals
// https://stackoverflow.com/questions/42730879/does-content-base-is-deprecated-from-webpack-dev-server-while-using-webpack
// https://medium.com/tomincode/hiding-critical-dependency-warnings-from-webpack-c76ccdb1f6c1
// https://www.npmjs.com/package/webpack-node-externals
// https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5

//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const webpack = require('webpack');
//const path = require('path');
//const nodeExternals = require('webpack-node-externals');
// https://stackoverflow.com/questions/64383909/dirname-is-not-defined-in-node-14-version

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
//import {SourceMapDevToolPlugin } from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//module.exports = {
export default function env(){
   return {
      //target:"node", // nodejs
      //target:"web", // web browser
      //entry: path.join(__dirname,'./src/client.js'),
      entry:[ path.join(__dirname, "./src/client/client.js")],
      mode: process.env.NODE_ENV || "development",
      devtool: "source-map",
      output: {
         path: path.join(__dirname, '/public'),
         filename: 'bundle.js'
      },
      //devServer: {
         //port: 3000,
         //contentBase: path.resolve(__dirname, './dist')
         //watchContentBase: true
         //historyApiFallback: true
      //},
      module: {
         noParse:/gun\.js$|sea\.js$/,
         rules: [
         {
            test: /\.(mjs|js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader'//,
               //options: {
                  //presets: [
                    //['@babel/preset-env', {
                      //"targets": "defaults" 
                    //}],
                    //'@babel/preset-react'
                  //]
               //}
            }
         },
         {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
         ]
      },
      node: {
         //fs: "empty"
      },
      plugins:[
         //new SourceMapDevToolPlugin({
            //filename: "[file].map"
         //}),
      ],
      //resolve: {
         // configuration options
         //fallback: {
            //"fs": false,
            //"url": false,
            //"path": false,
            //"http": false,
            //"buffer": false,
            //"util": false,
            //"tls": false,
            //"net": false,
            //"zlib": false,
            //"stream": false,
            //"crypto": false,
            //"crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
         //}
      //},
   }
}
