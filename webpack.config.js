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


//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const webpack = require('webpack');
//const path = require('path');
//const nodeExternals = require('webpack-node-externals');
// https://stackoverflow.com/questions/64383909/dirname-is-not-defined-in-node-14-version

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//module.exports = {


export default env => {
   
   return {
      //entry: path.join(__dirname,'./src/client.js'),
      entry: path.join(__dirname, "./src/client.js"),
      mode: process.env.NODE_ENV || "development",

      output: {
         path: path.join(__dirname, '/public'),
         filename: 'bundle.js'
      },
      devServer: {
         port: 3000,
         //contentBase: path.resolve(__dirname, './dist')
         //watchContentBase: true
      },
      module: {
         noParse:/gun\.js$|sea\.js$/,
         rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /nodeModules/,
            use: {
               loader: 'babel-loader'
            }
         }
         ]
      },
      node: {
         //fs: "empty"
      },
      plugins:[
      ]
   }
}