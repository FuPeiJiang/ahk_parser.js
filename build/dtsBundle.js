const libraryName = 'ahk_parser.js'
const dts = require('dts-bundle')

const path = require('path')
const rootDir = path.dirname(path.resolve(__dirname)) //it doesn't work without this

dts.bundle({
  name: libraryName,
  main: `${rootDir}/src/parser/**/*.d.ts`,
  out: `${rootDir}/index.d.ts`,
  outputAsModuleFolder: true, // to use npm in-package typings
})