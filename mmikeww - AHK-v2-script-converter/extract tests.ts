import fs from 'fs'
import ahkParser from '../src/parser/index'

const d = console.debug.bind(console)

const content: Buffer =
  // fs.readFileSync('mmikeww - AHK-v2-script-converter/oof tests/illegal in endExprContinuation.ahk')
  fs.readFileSync('mmikeww - AHK-v2-script-converter/ConvertTests.ahk')

const everything = ahkParser(content.toString().replace(/\r/g,''),true)

let i = 0,b: number

while (true) {
  if (findNextTypeText('assignment','input_script')) { break }

  const iBak = i
  if (findBackType('function DEFINITION name')) {
    d('no 2')
    break
  }
  const testName = everything[i].text //use func name as test file name
  i = iBak

  if (findNextType('StringContinuation')) {
    d('no 1')
    break
  }
  fs.writeFileSync(`${__dirname}/input/${testName}.ahk`,everything[i].text)

  if (findNextTypeText('assignment','expected')) {
    d('no 3')
    break
  }
  if (findNextType('StringContinuation')) {
    d('no 4')
    break
  }
  fs.writeFileSync(`${__dirname}/correct/${testName}.ahk`,everything[i].text)
}



const arrToJoin = []
for (let i = 0,len = everything.length; i < len; i++) {
  arrToJoin.push(everything[i].text)
}
const converted = arrToJoin.join('')
writeSync(converted,'reconstructed.ah2')
writeSync(arrOrObjToString(everything),'everything.txt')

function findNextType(dType: string) {
  let next
  while ((next = everything[++i])) {
    if (next.type === dType) {
      return false
    }
  }
  return true
}
function findBackType(dType: string) {
  let back
  while ((back = everything[--i])) {
    if (back.type === dType) {
      return false
    }
  }
  return true
}

// function findBackTypeText(dType: string,dText: string) {
// let back
// while ((back = everything[--i])) {
// if (back.type === dType && back.text === dText) {
// return false
// }
// }
// return true
// }

function findNextTypeText(dType: string,dText: string) {
  let next
  while ((next = everything[++i])) {
    if (next.type === dType && next.text === dText) {
      return false
    }
  }
  return true
}

function arrOrObjToString(obj) {
  const objDelim = ', ',objDelimLen = objDelim.length
  return innerFunc(obj)
  function innerFunc(obj) {
    var str = ''
    if (typeof obj === 'object') {
      if (Array.isArray(obj)) {
        for (let i = 0,len = obj.length; i < len; i++) {
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

function writeSync(content: string,fileName: string) {
  fs.writeFileSync(fileName,`${content}`,'utf-8')
  // console.log('readFileSync complete')
}
