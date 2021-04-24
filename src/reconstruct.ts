import fs from 'fs'
import ahkParser from './parser/index'
const d = console.debug.bind(console)


const content: string =
fs.readFileSync('tests/fixes/concat.ahk')
// fs.readFileSync('tests/fixes/assignment.ahk')
// fs.readFileSync('tests/fixes/obj in obj.ahk')
// fs.readFileSync('tests/fixes/obj to map linesCopy.ahk')
// fs.readFileSync('tests/fixes/ILLEGAL nonWhiteSpace.ahk')
// fs.readFileSync('tests/fixes/return looping forever.ahk')
// fs.readFileSync('tests/fix concat wrong line.ahk')
// fs.readFileSync('tests/Variadic Function.ahk')
// fs.readFileSync('tests/ArrAccess.ahk')
// fs.readFileSync('tests/string_getUntilWithInBetweensULTRA.ahk')

const everything = ahkParser(content.toString().replace(/\r/g, ''))
// d(everything)
let reconstructed = ''
for (let i = 0, len = everything.length; i < len; i++) {
  if (everything[i].type === '{ object') {
    reconstructed += 'Map('
  } else if (everything[i].type === '} object') {
    reconstructed += ')'
  } else if (everything[i].type === ': object') {
    reconstructed += ','
  } else if (everything[i].type === 'singleVar') {
    reconstructed += `"${everything[i].text}"`
  } else {
    reconstructed += everything[i].text
  }
}
// d(reconstructed)
writeSync(reconstructed,'reconstructed.ahk')
writeSync(arrOrObjToString(everything),'everything.txt')

function arrOrObjToString(obj) {
  const objDelim = ', ', objDelimLen = objDelim.length
  return innerFunc(obj)
  function innerFunc(obj) {
    var str = ''
    if (typeof obj === 'object')
    {
      if (Array.isArray(obj)) {
        for (let i = 0, len = obj.length; i < len; i++) {
          if (typeof obj[i] === 'object') {
            str += `\n${innerFunc(obj[i])},`
          } else {
            if (typeof obj[i] === 'string') {
              str += `\n'${obj[i]}',` //lol this implicitly calls func.toString()
            } else {
              str += `\n${obj[i]},` //lol this implicitly calls func.toString()
            }
          }
        }
        return `[\n${str.slice(1)}\n]` //remove the first , from string. removes nothing if empty string
      } else {
        for (var p in obj) {
          if (obj.hasOwnProperty(p)) {
            if (typeof obj[p] === 'object') {
              str += `${objDelim}${p}:${innerFunc(obj[p])}`
            } else {
              if (typeof obj[p] === 'string') {
                str += `${objDelim}${p}:'${obj[p]}'` //lol this implicitly calls func.toString()
              } else {
                str += `${objDelim}${p}:${obj[p]}` //lol this implicitly calls func.toString()
              }
            }
          }
        }
        return `{${str.slice(objDelimLen)}}` //remove the first , from string. removes nothing if empty string
      }
    } else {
      return ''
    }
  }
}

function writeSync(content: string, fileName: string) {
  const fs = require('fs')
  fs.writeFileSync(fileName, `${content}`, 'utf-8')
  // console.log('readFileSync complete')
}
