import fs from 'fs'
import ahkParser from './parser/index'
const d = console.debug.bind(console)


const content: string =
// fs.readFileSync('tests/fixes/obj in obj.ahk')
// fs.readFileSync('tests/fixes/obj to map linesCopy.ahk')
// fs.readFileSync('tests/fixes/ILLEGAL nonWhiteSpace.ahk')
// fs.readFileSync('tests/fixes/return looping forever.ahk')
// fs.readFileSync('tests/fix concat wrong line.ahk')
// fs.readFileSync('tests/Variadic Function.ahk')
// fs.readFileSync('tests/ArrAccess.ahk')
fs.readFileSync('tests/string_getUntilWithInBetweensULTRA.ahk')

const everything = ahkParser(content.toString().replace(/\r/g, ''))
let reconstructed = ''
for (let i = 0, len = everything.length; i < len; i++) {
  reconstructed += everything[i].text
}
console.log(reconstructed)

function writeSync(content: string) {
  const fs = require('fs')
  fs.writeFileSync('objectConvertedToMap.ahk', content, 'utf-8')
  console.log('readFileSync complete')
}
