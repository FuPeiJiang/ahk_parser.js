import {strictEqual} from 'assert'
import ahkParser from '../src/parser/index'
import modifyEverythingToV2 from '../src/modifyEverythingToV2'
import fs from 'fs'

const d = console.debug.bind(console)

const testsPath = `${__dirname}/../mmikeww - AHK-v2-script-converter/`
describe('AHK-v2-script-converter',function() {
  const fileNames = fs.readdirSync(`${testsPath}input`)
  for (let i = 0,len = fileNames.length; i < len; i++) {
    doItFiles(`input/${fileNames[i]}`,`correct/${fileNames[i]}`)
  }
})

function toV2(text) {
  const everything = ahkParser(text.replace(/\r/g,''))
  const converted = modifyEverythingToV2(everything)
  return converted
}
function doIt(v1,v2) {
  it(`\`${v1}\`,\`${v2}\``,function() {
    strictEqual(toV2(v1),v2)
  })
}
function readFileToString(path) {
  return fs.readFileSync(`${testsPath}${path}`).toString()
}
function doItFiles(path1,path2) {
  it(`FILE: '${path1}' vs '${path2}'`,function() {
    d(`doing ${path1}`)
    strictEqual(toV2(readFileToString(path1)),readFileToString(path2))
  })
}
