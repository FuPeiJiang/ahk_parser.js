import fs from 'fs'
import ahkParser from './parser/index'
const d = console.debug.bind(console)


const content: string =
fs.readFileSync('tests3/idkAnymore18.ahk')
// fs.readFileSync('tests3/idkAnymore17.ahk')
// fs.readFileSync('tests3/idkAnymore16.ahk')
// fs.readFileSync('tests3/idkAnymore15.ahk')
// fs.readFileSync('tests3/idkAnymore14.ahk')
// fs.readFileSync('tests3/idkAnymore13.ahk')
// fs.readFileSync('tests3/hotkey.ahk')
// fs.readFileSync('tests3/while.ahk')
// fs.readFileSync('tests3/if is integer.ahk')
// fs.readFileSync('tests3/idkAnymore12.ahk')
// fs.readFileSync('tests3/if func call.ahk')
// fs.readFileSync('tests3/idkAnymore11.ahk')
// fs.readFileSync('tests3/idkAnymore10.ahk')
// fs.readFileSync('tests3/comma in arr access.ahk')
// fs.readFileSync('tests3/comma are allowed in function call.ahk')
// fs.readFileSync('tests3/ternary broken.ahk')
// fs.readFileSync('tests2/idkAnymore9.ahk')
// fs.readFileSync('tests2/arrIndex assignment skipCommaV2Expr.ahk')
// fs.readFileSync('tests2/idkAnymore8.ahk')
// fs.readFileSync('tests2/idkAnymore7.ahk')
// fs.readFileSync('tests/func call.ahk')
// fs.readFileSync('tests2/idkAnymore6.ahk')
// fs.readFileSync('tests2/function definition fix.ahk')
// fs.readFileSync('tests2/class.ahk')
// fs.readFileSync('tests/arrays.ahk')
// fs.readFileSync('tests2/idkAnymore5.ahk')
// fs.readFileSync('tests/literal objects.ahk')
// fs.readFileSync('tests2/loop idk.ahk')
// fs.readFileSync('tests2/idkAnymore4.ahk')
// fs.readFileSync('tests2/loop Reg.ahk')
// fs.readFileSync('tests2/loop parse.ahk')
// fs.readFileSync('tests2/loop.ahk')
// fs.readFileSync('tests2/else.ahk')
// fs.readFileSync('tests2/idkAnymore3.ahk')
// fs.readFileSync('tests2/idkAnymore2.ahk')
// fs.readFileSync('tests2/idkAnymore1.ahk')
// fs.readFileSync('tests2/unexpected EOL after var parsing.ahk')
// fs.readFileSync('tests2/return.ahk')
// fs.readFileSync('tests2/infinite for.ahk')
// fs.readFileSync('tests2/global var comma.ahk')
// fs.readFileSync('tests2/global.ahk')
// fs.readFileSync('tests2/for.ahk')
// fs.readFileSync('tests2/obj arr concat.ahk')
// fs.readFileSync('tests2/named if nested.ahk')
// fs.readFileSync('tests2/named if.ahk')
// fs.readFileSync('tests2/if var op value.ahk')
// fs.readFileSync('tests2/percent after continuation ).ahk')
// fs.readFileSync('tests2/operator at v1Expr Newline.ahk')
// fs.readFileSync('tests2/if legacy in.ahk')
// fs.readFileSync('tests2/if legacy between.ahk')
// fs.readFileSync('tests2/if nested.ahk')
// fs.readFileSync('tests2/if.ahk')
// fs.readFileSync('tests2/percentVar Expr.ahk')
// fs.readFileSync('tests2/ternary colon.ahk')
// fs.readFileSync('tests2/labels.ahk')
// fs.readFileSync('tests2/where to splice.ahk')
// fs.readFileSync('tests2/function definition with no param.ahk')
// fs.readFileSync('tests2/method after assignment.ahk')
// fs.readFileSync('tests2/ArrAccess startOfLine.ahk')
// fs.readFileSync('tests2/method call.ahk')
// fs.readFileSync('tests2/not not.ahk')
// fs.readFileSync('tests2/v1 assignment.ahk')
// fs.readFileSync('tests/ahk_explorer.ahk')
// fs.readFileSync('tests/fixes/concat.ahk')
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
  // if (everything[i].type === '{ object') {
  // reconstructed += 'Map('
  // } else if (everything[i].type === '} object') {
  // reconstructed += ')'
  // } else if (everything[i].type === ': object') {
  // reconstructed += ','
  // } else if (everything[i].type === 'singleVar') {
  // reconstructed += `"${everything[i].text}"`
  // } else {
  reconstructed += everything[i].text
  // }
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
