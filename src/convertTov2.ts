import fs from 'fs'
import ahkParser from './parser/index'
const d = console.debug.bind(console)


const content: Buffer =
fs.readFileSync('tov2/string.ahk')
fs.readFileSync('tests/ahk_explorer.ahk')

const everything = ahkParser(content.toString().replace(/\r/g, ''))
// d(everything)

const reconstructed = []
let i = 0
const len = everything.length
outOfLen:
while (i < len) {
  if (everything[i].type === '{ object') {
    reconstructed.push('Map(')
  } else if (everything[i].type === '} object') {
    reconstructed.push(')')
  } else if (everything[i].type === ': object') {
    reconstructed.push(',')
  } else if (everything[i].type === 'singleVar') {
    reconstructed.push(`"${everything[i].text}"`)
  } else if (everything[i].type === '. property') {
    //
  } else if (everything[i].type === '% v1->v2 expr') {
    // reconstructed.push(everything[i].text)
  } else if (everything[i].type === 'functionName') {
    if (everything[i - 1].type === '. property') {
      if (everything[i].text.toLowerCase() === 'length') {
        reconstructed.push(`.${everything[i].text}`)

        const next = everything[i + 1]
        if (next) {
          if (next.type === '( function') {
            i++
            let isThisEnd
            while (true) {
              isThisEnd = everything[++i]
              if (!isThisEnd) {
                break outOfLen
              }
              if (isThisEnd.type === ') function CALL') {
                i++
                break
              }
            }
            continue outOfLen
          }
        }

      }
      reconstructed.push(`.${everything[i].text}`)
    } else {
      reconstructed.push(everything[i].text)
    }

  } else if (everything[i].type === '(.) property findTrailingExpr') {
    reconstructed.push(`["${everything[i].text}"]`)
  } else {
    reconstructed.push(everything[i].text)
  }
  // reconstructed.push(everything[i].text)
  i++
}
// d(reconstructed)
writeSync(reconstructed.join(''),'reconstructed.ahk')
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
