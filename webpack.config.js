const webpack = require('webpack');
const path = require('path');
const semver = require('semver');

const packageFile = require('./package.json');
const libVersion = packageFile.version;
const libraryName = packageFile.name;

const PRODUCTION = 'production';

let deps = '';

Object.keys(packageFile.dependencies).map((key, index) => {
  deps += `\n ${index + 1}. ${key} - ${packageFile.dependencies[key]}`;
});

let libraryHeaderComment;

function addPlugins(argv) {
  const version = semver.inc(libVersion, argv.env.type) || libVersion;

  libraryHeaderComment = `${libraryName} - v${version}
URL - https://github.com/softvar/secure-ls

The MIT License (MIT)

Copyright (c) 2016-2024 Varun Malhotra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


Dependencies used - ${deps}`;

  const plugins = [
    new webpack.BannerPlugin({
      banner: libraryHeaderComment,
      entryOnly: true,
      stage: webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
    }),
  ];

  return plugins;
}

module.exports = function (_env, argv) {
  return {
    entry: {
      [libraryName]: '/src/index.js',
    },
    devtool: 'source-map',
    mode: argv.mode === PRODUCTION ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: () => {
        if (argv.mode === PRODUCTION) {
          return '[name].min.js';
        }

        return '[name].js';
      },
      library: 'SecureLS',
      libraryTarget: 'umd',
      globalObject: 'this',
      auxiliaryComment: {
        root: ' Root',
        commonjs: ' CommonJS',
        commonjs2: ' CommonJS2',
        amd: ' AMD',
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js'],
    },
    plugins: addPlugins(argv),
  };
};
