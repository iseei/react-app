import Webpack from 'webpack';
import Server from 'webpack-dev-server';
import HtmlPlugin from 'html-webpack-plugin';
import InterpolateHtmlPlugin from 'interpolate-html-plugin';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';
// import { version } from './package.json'
// const HtmlPlugin = require('html-webpack-plugin');
// import cssLoader from 'css-loader';
// import { IncomingMessage } from 'http';

const smp = new SpeedMeasurePlugin();
const isDevelopment = process.env.NODE_ENV !== 'production';
const appVersion = process.env.npm_package_version;

const config: Webpack.Configuration & Server.Configuration = {
  mode: 'production',
  entry: {
    vendor: ['react', 'react-dom'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'dist'),
    library: '[name]',
  },
  plugins: [
    new Webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, 'dist/[name].manifest.json'),
    }),
  ],
}

export default smp.wrap(config);
