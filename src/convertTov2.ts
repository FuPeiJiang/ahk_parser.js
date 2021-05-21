import fs from 'fs'
import ahkParser from './parser/index'
const d = console.debug.bind(console)
import { variableCharsObj, whiteSpaceObj } from './parser/tokens'


const content: Buffer =
fs.readFileSync('tov2/WinClip.ahk')
fs.readFileSync('tov2/WinClipAPI.ahk')
// fs.readFileSync('v2tests/v1concat space or not.ahk')
// fs.readFileSync('tests3/listlines.ahk')
// fs.readFileSync('tests3/ampersand to .Ptr.ahk')
// fs.readFileSync('tests3/VarSetCapacity with func inside.ahk')
// fs.readFileSync('tests3/recurse VarSetCapacity replacement.ahk')
fs.readFileSync('tov2/OpenInAhkExplorer.ahk')
// fs.readFileSync('tov2/sortAr.ahk')
// fs.readFileSync('tests3/splitpath.ahk')
// fs.readFileSync('tests3/not assignment operator.ahk')
// fs.readFileSync('tests3/idkAnymore23.ahk')
fs.readFileSync('tov2/jpgs to pdf.ahk')
// fs.readFileSync('tests3/command EOF.ahk')
// fs.readFileSync('tests3/test validName VARIABLE EOL.ahk')
// fs.readFileSync('tov2/use_string.ahk')
// fs.readFileSync('tests3/fix if no paren.ahk')
fs.readFileSync('tov2/string.ahk')
fs.readFileSync('tests/ahk_explorer.ahk')
const everything = ahkParser(content.toString().replace(/\r/g, ''))
// d(everything)
let reconstructed = []
let i = 0, b
const classToStatic = {'WinClip':true}

const numIfNum = {'break':true,'continue':true,'settitlematchmode':true}
const anyCommand = {'DIRECTIVE OR COMMAND comma':true,'command EOL or comment':true,'command':true}
const idkVariableOrAssignment = {'idkVariable':true,'assignment':true}
const startingBlock = {'{ legacyIf':true,'{ if':true,'{ for':true,'{ else':true,'{ loop':true,'{ namedIf':true}
const startingBlockForClass = {'{ class':true,'{ function DEFINITION':true,'{ legacyIf':true,'{ if':true,'{ for':true,'{ else':true,'{ loop':true,'{ namedIf':true}
const v1Str = {'v1String findV1Expression':true,'v1String findPercentVarV1Expression':true}
const v1Percent = {'%START %Var%':true,'END% %Var%':true}
// const removedDirectives = {'#noenv':true,'setbatchlines':true}
const commandDelim = {', command comma':true,'end command':true }
const funcCallDelim = {', function CALL':true,') function CALL':true }
const wsOrEmptyLine = {'whiteSpaces':true,'emptyLines':true}
const startGroupOrUnit = {'( group':') group','start unit':'end unit'}
const on1off0 = {'on':'1','off':'0'}
const v1ExprToEdit = {'goto':true,'#singleinstance':true}
let next, argsArr
outOfLen:
while (i < everything.length) {
  const allReturn = all()
  if (allReturn === 1) {
    continue outOfLen
  } else if (allReturn === 2) {
    break outOfLen
  } else if (allReturn === 3) {
    i++
    continue outOfLen
  }

  reconstructed.push(everything[i].text)
  i++
}
function all() {
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
    const thisText = everything[i].text
    const back = everything[i - 1]
    if (back) {
      if (everything[i - 1].type === '. property') {
        if (thisText.toLowerCase() === 'length') {
          // .Length() -> .Length
          reconstructed.push(`.${thisText}`)

          const next = everything[i + 1]
          if (next) {
            if (next.type === '( function CALL') {
              i++
              let isThisEnd
              while (true) {
                isThisEnd = everything[++i]
                if (!isThisEnd) {
                  return 2
                }
                if (isThisEnd.type === ') function CALL') {
                  return 3
                }
              }
            }
          }
        } else if (thisText.toLowerCase() === 'haskey') {
          // .HasKey() -> .Has()
          reconstructed.push('.Has')
          return 3
        }
        reconstructed.push(`.${thisText}`)
        return 3
      }
    }
    if (thisText.toLowerCase() === 'varsetcapacity') {
      //#function
      if (!(argsArr = getArgs())) { return 2 }
      if (argsArr.length === 1) {
        // VarSetCapacity(TargetVar)
        // TargetVar.Size
        a(1); p('.Size')
      } else {
        // VarSetStrCapacity(TargetVar, RequestedCapacity, FillByte)
        // TargetVar:=BufferAlloc(RequestedCapacity,FillByte)
        a(1); p(':=BufferAlloc('); a(2); o(',',3); a(3); p(')')
      }
    } else if (thisText.toLowerCase() === 'numput') {
      // NumPut(Number, VarOrAddress [, Offset := 0][, Type := "UPtr"])
      // NumPut Type, Number, [Type2, Number2, ...] VarOrAddress [, Offset]
      if (!(argsArr = getArgs())) { return 2 }
      const len = argsArr.length
      p('NumPut(')
      if (len === 4) {
        a(4)
      } else {
        p('"UPtr"')
      }
      p(','); a(1); p(','); a(2)
      if (len > 2) {
        p(',')
        a(3)
      }
      p(')')
    } else if (thisText.toLowerCase() === 'objgetaddress') {
      // ObjGetAddress( this, "allData" )
      // this["allData"].Ptr
      if (!(argsArr = getArgs())) { return 2 }
      a(1); p('['); a(2); p('].Ptr')
    } else if (thisText.toLowerCase() === 'objsetcapacity') {
      if (!(argsArr = getArgs())) { return 2 }
      if (argsArr.length === 3) {
        // ObjSetCapacity( this, "allData", newSize )
        // this["allData"].Size := newSize
        a(1); p('['); a(2); p('].Size := '); a(3)
      } else {
        p('ObjSetCapacity('); a(1); p(','); a(2); p(')')
      }
    } else if (thisText.toLowerCase() === 'objgetcapacity') {
      if (!(argsArr = getArgs())) { return 2 }
      if (argsArr.length === 2) {
        // ObjGetCapacity( this, "allData")
        // this["allData"].Size
        a(1); p('['); a(2); p('].Size')
      } else {
        p('ObjGetCapacity('); a(1); p(')')
      }
    } else {
      reconstructed.push(thisText)
      while (true) {
        next = everything[++i]
        if (!next) {
          return 2
        }
        const bType = next.type

        const allReturn = all()
        if (allReturn === 3) {
          continue
        } else if (allReturn) {
          return allReturn
        }

        if (bType === ') function CALL') {
          reconstructed.push(')')
          return 3
        } else {
          reconstructed.push(next.text)
        }
      }
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
          return 1
        }
        hasParen = true
      }
      if (next.type === 'start unit') {
        if (!nextSkipThrough('end unit','start unit')) { return 2 }
      }
      next = everything[b + (hasParen ? 2 : 1)]
      if (next) {
        if (next.type === 'end if') {
          b--
          next = everything[b]
          if (next.type === '] ArrAccess') {
            next.type = 'edit'
            next.text = ')'
            if (!skipThroughSomethingMid('[ ArrAccess', '] ArrAccess')) { return 2 }
            const back = everything[b]
            back.type = 'edit'
            back.text = '.Has('
          }
        }
      }

    }

  } else if (idkVariableOrAssignment[everything[i].type]) {
    const theText = everything[i].text
    const parsedIdkVar = parseIdkVariable(theText)
    if (parsedIdkVar) {
      for (let i = 0, len = parsedIdkVar.length; i < len; i++) {
        if (parsedIdkVar[i].type) {
          if (parsedIdkVar[i].text.toLowerCase() === 'clipboard') {
            reconstructed.push('%A_Clipboard%')
          } else {
            reconstructed.push(`%${parsedIdkVar[i].text}%`)
          }
        } else {
          reconstructed.push(parsedIdkVar[i].text)
        }
      }
    } else {
      if (theText.toLowerCase() === 'clipboard') {
        reconstructed.push('A_Clipboard')
      } else {
        reconstructed.push(theText)
      }
    }
  } else if (everything[i].type === '(statement) ,') {
    const next = everything[i + 1]
    if (!wsOrEmptyLine[next.type]) {
      reconstructed.push(' ')
    }
  } else if (v1Percent[everything[i].type]) {
    //ignore
  } else if (v1Str[everything[i].type]) {
    const theText = everything[i].text
    if (theText !== '') {
      let next, putAtEnd = ''
      next = everything[i + 1]
      // skip through stuff like 'end command' which .text === undefined
      outerLoop:
      while (true) {
        while (next) {
          if (next.text) {
            const firstChar = next.text[0]
            if (!(whiteSpaceObj[firstChar] || firstChar === '\n')) {
              putAtEnd = ' '
            }
            break outerLoop
          }
          next = everything[++b]
        }
        break outerLoop
      }
      reconstructed.push(`${whiteSpaceObj[everything[i - 1].text.slice(-1)] ? '' : ' '}"${theText.replace(/"/g, '`"')}"${putAtEnd}`)
    }
  } else if (everything[i].type === 'percentVar v1Expression') {
    reconstructed.push(everything[i].text)
  } else if (everything[i].type === '= v1Assignment') {
    reconstructed.push(':=')
    const next = everything[i + 1]
    // var = -> var:=""
    if (next.type === 'v1String findV1Expression') {
      if (next.text === '') {
        next.type = 'edit'
        next.text = '""'
      }
    }
  } else if (everything[i].type === 'String') {
    reconstructed.push(`"${everything[i].text.slice(1,-1).replace(/""/g, '`"')}"`)
  } else if (anyCommand[everything[i].type]) {
    //if breakOrContinue, if is number, don't surround with quotes
    if (numIfNum[everything[i].text.toLowerCase()]) {
      reconstructed.push(everything[i].text)
      if (skipFirstSeparatorOfCommand()) { i++; return 1}
      if (next.type === 'v1String findV1Expression') {
        if (!isNaN(next.text)) {
          next.type = 'edit'
        }
      }
    } else if (everything[i].text.toLowerCase() === '#noenv') {
      const next = everything[i + 1]
      if (next) {
        if (next.type === 'emptyLines') {
          i++
        }
      }
    } else if (everything[i].text.toLowerCase() === 'setbatchlines') {
      if (skipFirstSeparatorOfCommand()) { i++; return 1}
      i = b + 2
    } else if (v1ExprToEdit[everything[i].text.toLowerCase()]) {
      reconstructed.push(everything[i].text)
      if (skipFirstSeparatorOfCommand()) { i++; return 1}
      if (next.type === 'v1String findV1Expression') {
        next.type = 'edit'
      }
    } else if (everything[i].text.toLowerCase() === 'listlines') {
      reconstructed.push(everything[i].text)
      if (skipFirstSeparatorOfCommand()) { i++; return 1}
      if (next.type === 'v1String findV1Expression') {
        const dText = next.text
        if (on1off0[dText.toLowerCase()]) {
          next.type = 'edit'
          next.text = on1off0[dText.toLowerCase()]
        } else if (!isNaN(dText)) {
          next.type = 'edit'
        }
      }
    } else if (everything[i].text.toLowerCase() === 'splitpath') {
      //until 'end command', do not quote every v1 expr
      reconstructed.push(everything[i].text)
      b = i
      while (true) {
        next = everything[++b]
        if (!next) {
          i++
          return 1
        }
        const dType = next.type
        if (v1Percent[dType]) {
          next.type = 'edit'
        } else if (v1Str[dType]) {
          next.type = 'edit'
        } else if (dType === 'end command') {
          i++
          return 1
        }
      }
    } else if (everything[i].text.toLowerCase() === 'stringtrimright') {
      if (skipFirstSeparatorOfCommand()) { i++; return 1}
      // StringTrimRight, OutputVar, InputVar, Count
      // OutputVar:=SubStr(InputVar,1,-Count)
      let outputVar, inputVar, count
      //#command
      if (!(outputVar = getNextParamOmitWhitespaces())) { return 2 }
      if (!(inputVar = getNextParamOmitWhitespaces())) { return 2 }
      if (!(count = getNextParamOmitWhitespaces())) { return 2 }
      i = b - 2
      for (let n = 0, len = outputVar.length; n < len; n++) {
        reconstructed.push(outputVar[n].text)
      }
      reconstructed.push(':=SubStr(')
      for (let n = 0, len = inputVar.length; n < len; n++) {
        reconstructed.push(inputVar[n].text)
      }
      reconstructed.push(',1,-')
      for (let n = 0, len = count.length; n < len; n++) {
        reconstructed.push(count[n].text)
      }
      reconstructed.push(')')
    } else {
      reconstructed.push(everything[i].text)
    }
  } else if (everything[i].type === 'legacyIf var') {
    let next = everything[i + 2]
    if (next) {
      if (next.type === 'legacyIf is') {
        next = everything[i + 4]
        if (next.type === 'v1String findV1Expression') {
          if (next.text.toLowerCase() === 'number') {
            // if var is number
            // if IsNumber(var)
            reconstructed.push(`IsNumber(${everything[i].text})`)
            i += 4
          }
        }
      }
    }
  } else if (everything[i].type === '1operator') {
    if (everything[i].text === '&') {
      let bType
      b = i
      const bSave = b
      if (!(bType = findNextAnyInObj(startGroupOrUnit))) { return 2 }
      if (!nextSkipThrough(startGroupOrUnit[bType],bType)) { return 2 }
      const sliced = everything.slice(bSave + 1, b)
      const allVariableCharsArr = []
      for (let n = 0, len = sliced.length; n < len; n++) {
        const dText = sliced[n].text
        if (dText) {
          for (let c = 0, len = dText.length; c < len; c++) {
            if (variableCharsObj[dText[c]]) {
              allVariableCharsArr.push(dText[c])
            }
          }
        }

      }
      const validVarStr = allVariableCharsArr.join('')
      if (isNaN(Number(validVarStr))) {
        everything.splice(b + 1,0,{type:'edit',text:'.Ptr'})
      } else {
        reconstructed.push('&')
      }
    } else {
      reconstructed.push(everything[i].text)
    }
  } else if (everything[i].type === 'hotkey') {
    reconstructed.push(everything[i].text)
    b = i
    const hotkeyI = i
    let next
    let blockDepth = 0
    while (true) {
      next = everything[++b]
      if (!next) {
        i++
        return 1
      }
      const dType = next.type
      if (startingBlock[dType]) {
        blockDepth++
      } else if (dType === '} unknown') {
        blockDepth--
      } else if (dType === 'hotkey') {
        i++
        return 1
      } else if (anyCommand[dType]) {
        if (blockDepth === 0) {
          if (next.text.toLowerCase() === 'return') {
            next.type = 'edit'
            next.text = '}'
            everything.splice(hotkeyI + 1,0,{text:'\n{',type:'edit'})
            i++
            return 1
          }
        }
      }
    }
  //#HERE
  } else if (everything[i].type === 'className') {
    reconstructed.push(everything[i].text)
    if (classToStatic[everything[i].text]) {
      b = i + 1
      let next, arrAccessDepth = 0
      next = everything[++b]
      while (next) {
        const bType = next.type
        if (bType === '} unknown') {
          arrAccessDepth--
          if (arrAccessDepth === 0) {
            return 3
          }
        } else if (startingBlockForClass[bType]) {
          arrAccessDepth++
        } else if (bType === 'function( definition') {
          everything.splice(b,0,{type:'edit',text:'static '})
          b++
        }
        next = everything[++b]
      }
    }
  } else {
    return false
  }
  return 3
}
// functions
function skipFirstSeparatorOfCommand() {
  b = i + 1
  next = everything[b]
  if (!next) {
    return true
  }
  if (next.type === 'emptyLines') {
    next = everything[++b]
    if (!next) {
      return true
    }
  }
  if (next.type === '(statement) ,') {
    next = everything[++b]
    if (!next) {
      return true
    }
    if (next.type === 'whiteSpaces') {
      next = everything[++b]
      if (!next) {
        return true
      }
    }
  }

}
function parseIdkVariable(text: string) {
  let startIndex = text.indexOf('%')
  let pVar, notVar, endIndex
  const arrOfObj = []
  if (startIndex !== -1) {
    notVar = text.slice(0,startIndex)
    arrOfObj.push({text:notVar})
    endIndex = text.indexOf('%',startIndex + 1)
    pVar = text.slice(startIndex + 1,endIndex)
    arrOfObj.push({type:true,text:pVar})
    while (true) {
      startIndex = text.indexOf('%',endIndex + 1)
      if (startIndex === -1) {
        break
      }
      notVar = text.slice(endIndex + 1,startIndex)
      arrOfObj.push({text:notVar})
      endIndex = text.indexOf('%',startIndex + 1)
      pVar = text.slice(startIndex + 1,endIndex)
      arrOfObj.push({type:true,text:pVar})
    }
    notVar = text.slice(endIndex + 1)
    arrOfObj.push({text:notVar})
    return arrOfObj
  } else {
    return false
  }
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
function a(index) {
  const idxMinus = index - 1
  // return (argsArr[idxMinus] && argsArr[idxMinus].length) ? argsArr[idxMinus] : ''
  if (argsArr[idxMinus] && argsArr[idxMinus].length) {
    reconstructed = reconstructed.concat(argsArr[idxMinus])
  }
}
function p(str) {
  reconstructed.push(str)
}
function o(str,index) {
  if (argsArr[index - 1]) {
    reconstructed.push(str)
  }
  // return argsArr[index - 1] ? str : ''
}
function getArgs() {
  // function getArgs(maxArgs) {
  // b = i + 2
  i ++
  let next
  // const arrOfArgs = []
  const arrOfArrOfText = []
  outerLoop:
  //pretty useless maxArgs
  // for (let n = 0; n < maxArgs; n++) {
  while (true) {
    // const arrOfText = []
    const lenReconstructed = reconstructed.length
    innerLoop:
    while (true) {
      next = everything[++i]
      if (!next) {
        return false
      }
      const bType = next.type

      const allReturn = all()
      if (allReturn === 1) {
        continue innerLoop
      } else if (allReturn === 2) {
        return false
      } else if (allReturn === 3) {
        continue innerLoop
      }

      if (bType === ') function CALL') {
        // b++
        // i++
        // arrOfArgs.push(arrOfText.join(''))

        // i = b - 2
        arrOfArrOfText.push(reconstructed.slice(lenReconstructed))
        reconstructed.splice(lenReconstructed)
        // i -= 2
        return arrOfArrOfText
      } else if (bType === ', function CALL') {
        // b++
        i++
        // arrOfArgs.push(arrOfText.join(''))
        arrOfArrOfText.push(reconstructed.slice(lenReconstructed))
        reconstructed.splice(lenReconstructed)
        continue outerLoop
      } else if (!wsOrEmptyLine[bType]) {
        // arrOfText.push(next.text)
        reconstructed.push(next.text)
      }
    }
  }
}
/* if (bType === 'functionName') {
        arrOfText.push(`${next.text}(`)
        let arrAccessDepth = 1
        next = everything[++b]
        while (next) {
          const bType = next.type
          if (arrAccessDepth) {
            if (bType === ') function CALL') {
              arrAccessDepth--
            } else if (bType === 'functionName') {
              arrAccessDepth++
            }
            arrOfText.push(next.text)
            if (arrAccessDepth === 0) {
              b++
              continue innerLoop
            }
          }
          next = everything[++b]
        }
        return false
      } else  */
/* function stringFromArrOfObj(arr, key: string) {
  const toJoin = []
  for (let n = 0, len = arr.length; n < len; n++) {
    toJoin.push(arr[n][key])
  }
  return toJoin.join('')
} */
function getNextFuncArgOmitWhitespaces() {
  let next
  const arrOfObj = []
  while (true) {
    next = everything[b++]
    if (!next) {
      return false
    }
    const bType = next.type
    if (funcCallDelim[bType]) {
      b++
      return arrOfObj
    } else if (!wsOrEmptyLine[bType]) {
      arrOfObj.push(next)
    }
  }
}
function getNextParamOmitWhitespaces() {
  let next
  const arrOfObj = []
  while (true) {
    next = everything[b++]
    if (!next) {
      return false
    }
    const bType = next.type
    if (commandDelim[bType]) {
      b++
      return arrOfObj
    } else if (!wsOrEmptyLine[bType]) {
      arrOfObj.push(next)
    }
  }
}
function findNextAnyInObj(insideThisObj) {
  let next
  next = everything[++b]
  while (next) {
    const bType = next.type
    if (insideThisObj[bType]) {
      return bType
    }
    next = everything[++b]
  }
  return false
}
function findNext(stopAtThis: string) {
  let next
  next = everything[++b]
  while (next) {
    const bType = next.type
    if (bType === stopAtThis) {
      return true
    }
    next = everything[++b]
  }
  return false
}
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
writeSync(reconstructed.join(''),'reconstructed.ah2')
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
