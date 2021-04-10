//@ts-check

'use strict'

const libraryName = 'ahk_parser.js'

const path = require('path')
const rootDir = path.resolve(__dirname)

/**@type {import('webpack').Configuration}*/
const config = {
  plugins: [
    new DtsBundlePlugin(),
  ],
  target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
  mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

  entry: './src/index.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    // the bundle is stored in the 'lib' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    //https://webpack.js.org/guides/author-libraries/#expose-the-library
    library: {
      name: 'webpackNumbers',
      type: 'umd',
    },
  },
  devtool: 'nosources-source-map',
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
}
module.exports = config
// https://stackoverflow.com/questions/41931610/generate-bundle-typescript-definition-file-with-webpack?answertab=active#tab-top
function DtsBundlePlugin() {}
DtsBundlePlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function(){
    var dts = require('dts-bundle')

    dts.bundle({
      name: libraryName,
      main: `${rootDir}/src/**/*.d.ts`,
      out: `${rootDir}/index.d.ts`,
      removeSource: true,
      outputAsModuleFolder: true, // to use npm in-package typings
    })
  })
}