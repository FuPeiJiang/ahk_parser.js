import fs from 'fs'
import ahkParser from './parser/index'
const d = console.debug.bind(console)


const content: Buffer =
// fs.readFileSync('tests3/fix if no paren.ahk')
fs.readFileSync('tov2/string.ahk')
fs.readFileSync('tests/ahk_explorer.ahk')

const everything = ahkParser(content.toString().replace(/\r/g, ''))
// d(everything)

const reconstructed = []
let i = 0, b
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
          if (next.type === '( function CALL') {
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
  } else if (everything[i].type === 'if') {
    reconstructed.push(everything[i].text)
    //skip 'emptyLines' after if
    //'if' (single unit ending with access), transform into .Has()
    b = i + 2
    let next = everything[b]
    if (next) {
    //if '( if, skip'
      let hasParen = false
      if (next.type === '( if') {
        b++
        next = everything[b]
        if (!next) {
          continue outOfLen
        }
        hasParen = true
      }
      if (next.type === 'start unit') {
        if (!nextSkipThrough('end unit','start unit')) { break outOfLen }
      }
      next = everything[b + (hasParen ? 2 : 1)]
      if (next) {
        if (next.type === 'end if') {
          b--
          next = everything[b]
          if (next.type === '] ArrAccess') {
            next.type = 'edit'
            next.text = ')'
            if (!skipThroughSomethingMid('[ ArrAccess', '] ArrAccess')) { break outOfLen }
            const back = everything[b]
            back.type = 'edit'
            back.text = '.Has('
          }
        }
      }

    }

  } else {
    reconstructed.push(everything[i].text)
  }
  // reconstructed.push(everything[i].text)
  i++

}

/* } else if (everything[i].type === '] ArrAccess') {
    const next = everything[i + 1]
    if (next) {
      if (next.type === ') if') {
        b = i
        if (!skipThroughSomethingMid('[ ArrAccess', '] ArrAccess')) { break outOfLen }
        const skipTheseObj = {'] ArrAccess':'[ ArrAccess', ') function CALL':'functionName'}
        while (b--) {
          const back = everything[b]
          const theType = skipTheseObj[back.type]
          if (!theType) {
            break
          }
          if (!skipThroughSomethingMid(theType, back.type)) { break outOfLen }
        }
        const back = everything[b]
        if (back) {
          const bType = back.type
          if (bType === 'idkVariable') {
            //
          } else if (bType === '(.) property findTrailingExpr') {
            //
          }
        }
      }
    } */

function nextSkipThrough(lookForThisToEnd: string, ohNoAddAnotherOne: string) {
  let next, arrAccessDepth = 1
  next = everything[++b]
  while (next) {
    const bType = next.type
    if (arrAccessDepth) {
      if (bType === lookForThisToEnd) {
        arrAccessDepth--
      } else if (bType === ohNoAddAnotherOne) {
        arrAccessDepth++
      }
      if (arrAccessDepth === 0) {
        return true
      }
    }
    next = everything[++b]
  }
  return false
}

function skipThroughSomethingMid(lookForThisToEnd: string, ohNoAddAnotherOne: string) {
  let back, arrAccessDepth = 1
  while (b--) {
    back = everything[b]
    const bType = back.type
    if (arrAccessDepth) {
      if (bType === lookForThisToEnd) {
        arrAccessDepth--
      } else if (bType === ohNoAddAnotherOne) {
        arrAccessDepth++
      }
      if (arrAccessDepth === 0) {
        return true
      }
    }
  }
  return false
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
