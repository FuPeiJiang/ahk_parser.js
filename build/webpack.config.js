//@ts-check

'use strict'

const path = require('path')
const rootDir = path.dirname(path.resolve(__dirname)) //it doesn't work without this

/**@type {import('webpack').Configuration}*/
const config = {
  target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
  mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

  entry: `${rootDir}/src/parser/index.ts`, // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    // the bundle is stored in the 'lib' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: `${rootDir}`,
    filename: 'index.js',
    //https://webpack.js.org/guides/author-libraries/#expose-the-library
    library: {
      name: 'ahkParser',
      type: 'umd',
    },
  },
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
