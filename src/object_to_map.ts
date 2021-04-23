import fs from 'fs'
import ahkParser from './parser/index'
const d = console.debug.bind(console)


const content: string =
// fs.readFileSync('tests/fixes/obj to map linesCopy.ahk')
// fs.readFileSync('tests/fixes/ILLEGAL nonWhiteSpace.ahk')
// fs.readFileSync('tests/fixes/return looping forever.ahk')
// fs.readFileSync('tests/fix concat wrong line.ahk')
// fs.readFileSync('tests/Variadic Function.ahk')
// fs.readFileSync('tests/ArrAccess.ahk')
fs.readFileSync('tests/string_getUntilWithInBetweensULTRA.ahk')
// fs.readFileSync('tests/decimal.ahk')
// fs.readFileSync('tests/semicolon in string.ahk')
// fs.readFileSync('tests/the test1.ahk')
// fs.readFileSync('tests/func call.ahk')
// fs.readFileSync('tests/literal objects.ahk')
// fs.readFileSync('tests/arrays.ahk')
// fs.readFileSync('tests/operators.ahk')
// fs.readFileSync('tests/string concat.ahk')
// fs.readFileSync('tests/assignment expression.ahk')
// fs.readFileSync('tests/break hotkey.ahk')
// fs.readFileSync('tests/js html.ahk')
// fs.readFileSync('tests/assignment or statement.ahk')
// fs.readFileSync('tests/ahk_explorer.ahk')
// fs.readFileSync('tests/legal.ahk')
// fs.readFileSync('tests/yolo.ahk')

const lines = ahkParser(content.toString().replace(/\r/g, ''))
const newContent = lines.join('\n')
// d(newContent)
writeSync(newContent)

function writeSync(content: string) {
  const fs = require('fs')
  fs.writeFileSync('objectConvertedToMap.ahk', content, 'utf-8')
  console.log('readFileSync complete')
}
