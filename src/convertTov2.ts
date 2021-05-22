import fs from 'fs'
import ahkParser from './parser/index'
const d = console.debug.bind(console)
import { variableCharsObj, whiteSpaceObj } from './parser/tokens'


const content: Buffer =
// fs.readFileSync('v2tests/prop in func.ahk')
// fs.readFileSync('tests3/loop bracket.ahk')
// fs.readFileSync('tests3/assignment percent.ahk')
// fs.readFileSync('tests3/if paren no ws.ahk')
// fs.readFileSync('tov2/Biga_mid.ahk')
// fs.readFileSync('tov2/Biga.ahk')
// fs.readFileSync('v2tests/A_IsUnicode from WinClipAPI.ahk')
// fs.readFileSync('v2tests/A_IsUnicode start group space.ahk')
fs.readFileSync('v2tests/A_IsUnicode.ahk')
// fs.readFileSync('v2tests/fix numput.ahk')
// fs.readFileSync('v2tests/fix if not.ahk')
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
// fs.readFileSync('tests3/not assignment operatEor.ahk')
// fs.readFileSync('tests3/idkAnymore23.ahk')
fs.readFileSync('tov2/jpgs to pdf.ahk')
// fs.readFileSync('tests3/command EOF.ahk')
// fs.readFileSync('tests3/test validName VARIABLE EOL.ahk')
fs.readFileSync('tov2/use_string.ahk')
// fs.readFileSync('tests3/fix if no paren.ahk')
fs.readFileSync('tov2/string.ahk')
fs.readFileSync('tests/ahk_explorer.ahk')
const everything = ahkParser(content.toString().replace(/\r/g, ''))
// d(everything)
const reconstructed = []
let i = 0, b
const classToStatic = {'biga':true,'WinClip':true,'WinClipAPI':true}

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
const ternaryColonEndDelim = {'end assignment':true,', function CALL':true,') function CALL':true,', assignment':true,'end comma assignment':true}
const doNotQuoteCommand = {'splitpath':true}
const stringUpperLower = {'stringupper':'StrUpper','stringlower':'StrLower'}

// I'd never think I'd come to this day, but..
// preprocessing..
const varNames = {}
const lowerVarNames = {}
const typesThatAreVars = {'Param':true,'idkVariable':true,'assignment':true,'v1String findIdkVar':true}
for (let n = 0, len = everything.length; n < len; n++) {
  if (typesThatAreVars[everything[n].type]) {
    const theText = everything[n].text
    const parsedIdkVar = parseIdkVariable(theText)
    if (parsedIdkVar) {
      for (let i = 0, len2 = parsedIdkVar.length; i < len2; i++) {
        if (parsedIdkVar[i].type) {
          const dText = parsedIdkVar[i].text
          varNames[dText] = true
          const dLowered = dText.toLowerCase()
          lowerVarNames[dLowered] = lowerVarNames[dLowered] || []
          lowerVarNames[dLowered].push(n)
        }
      }
    } else {
      varNames[theText] = true
      const dLowered = theText.toLowerCase()
      lowerVarNames[dLowered] = lowerVarNames[dLowered] || []
      lowerVarNames[dLowered].push(n)
    }
  }
}
replaceReservedVar('case','dCase','_case')
replaceReservedVar('object','dObject','_object')
replaceReservedVar('array','dArray','_array')
replaceReservedVar('clipboard','A_Clipboard')
const namesArr = Object.keys(varNames)
for (let n = 0, len = namesArr.length; n < len; n++) {
  const thisName = namesArr[n]
  const loweredName = thisName.toLowerCase()
  if ((loweredName.startsWith('true') && loweredName !== 'true')
   || (loweredName.startsWith('false') && loweredName !== 'false')) {

    const eIndexArr = lowerVarNames[loweredName]
    for (let i = 0, len2 = eIndexArr.length; i < len2; i++) {
      if (everything[eIndexArr[i]].type === 'assignment') {
        replaceReservedVar(loweredName,`d_${thisName}`,`_${thisName}`)
        break
      }
    }
  }
}
function replaceReservedVar(theReservedVar: string, firstChoice: string, subfixForAutoGen = '') {
  const eIndexArr = lowerVarNames[theReservedVar]
  if (eIndexArr) {
    const subfixForAutoGenLowered = subfixForAutoGen.toLowerCase()
    let caseNameReplacement, idBak
    if (lowerVarNames[firstChoice.toLowerCase()]) {
      while (lowerVarNames[`${idBak = makeid(3)}${subfixForAutoGenLowered}`]) {
        //this will break when found unique name
      }
      caseNameReplacement = `${idBak}${subfixForAutoGen}`
    } else {
      caseNameReplacement = firstChoice
    }
    for (let n = 0, len = eIndexArr.length; n < len; n++) {
      everything[eIndexArr[n]].text = caseNameReplacement
    }
  }
}


// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript#1349426
function makeid(length) {
  var result = []
  var characters = 'abcdefghijklmnopqrstuvwxyz'
  var charactersLength = characters.length
  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() *
charactersLength)))
  }
  return result.join('')
}

let next, argsArr, gArgsEInsertIndex, arrFromArgsToInsert
  ,commandParamsArr, cParamsEInsertIndex, arrFromCParamsToInsert
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

  i++
}
function all() {
  const thisE = everything[i]
  const eType = thisE.type
  if (eType === '{ object') {
    thisE.text = 'Map('
  } else if (eType === '} object') {
    thisE.text = ')'
  } else if (eType === ': object') {
    thisE.text = ','
  } else if (eType === 'singleVar') {
    thisE.text = `"${everything[i].text}"`
  } else if (eType === '% v1->v2 expr') {
    thisE.text = ''
  } else if (eType === 'functionName') {
    const thisText = everything[i].text
    const back = everything[i - 1]
    const thisLowered = thisText.toLowerCase()
    if (back) {
      if (everything[i - 1].type === '. property') {
        if (thisLowered === 'length') {
          // .Length() -> .Length
          thisE.type = 'v2: prop'
          //splice off ( to )
          const spliceStart = b = i + 1
          if (!nextSkipThrough(') function CALL','functionName')) { return 2 }
          everything.splice(spliceStart, b - spliceStart + 1)
        } else if (thisLowered === 'haskey') {
          // .HasKey() -> .Has()
          thisE.text = 'Has'
        }
        return 3
      }
    }
    if (thisLowered === 'varsetcapacity') {
      //#function
      if (!(argsArr = getArgs())) { return 2 }
      if (argsArr.length === 1) {
        // VarSetCapacity(TargetVar)
        // TargetVar.Size
        a(1); p('.Size'); s()
      } else {
        // VarSetStrCapacity(TargetVar, RequestedCapacity, FillByte)
        // TargetVar:=BufferAlloc(RequestedCapacity,FillByte)
        a(1); p(':=BufferAlloc('); a(2); o(',',3); a(3); p(')'); s()
      }
    } else if (thisLowered === 'strreplace') {
      // StrReplace(Haystack, Needle [, ReplaceText, OutputVarCount, Limit])
      // StrReplace(Haystack, Needle [, ReplaceText, CaseSense, OutputVarCount, Limit := -1])
      if (!(argsArr = getArgs())) { return 2 }
      p('StrReplace('); a(1); p(','); a(2); o(',',3); a(3); o(',0,',4); a(4); o(',',5); a(5); p(')'); s()
    } else if (thisLowered === 'object') {
      // Object() -> Map()  OR  Object("key",value) -> Map("key",value)
      thisE.text = 'Map'
    } else if (thisLowered === 'numput') {
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
      p(')'); s()
    } else if (thisLowered === 'objgetaddress') {
      // ObjGetAddress( this, "allData" )
      // this["allData"].Ptr
      if (!(argsArr = getArgs())) { return 2 }
      a(1); p('['); a(2); p('].Ptr'); s()
    } else if (thisLowered === 'objsetcapacity') {
      if (!(argsArr = getArgs())) { return 2 }
      if (argsArr.length === 3) {
        // ObjSetCapacity( this, "allData", newSize )
        // NOPE: this["allData"].Size := newSize
        // this["allData"]:=BufferAlloc(newSize)
        a(1); p('['); a(2); p(']:=BufferAlloc('); a(3); p(')'); s()
      } else {
        p('ObjSetCapacity('); a(1); p(','); a(2); p(')'); s()
      }
    } else if (thisLowered === 'objgetcapacity') {
      if (!(argsArr = getArgs())) { return 2 }
      if (argsArr.length === 2) {
        // ObjGetCapacity( this, "allData")
        // this["allData"].Size
        a(1); p('['); a(2); p('].Size'); s()
      } else {
        p('ObjGetCapacity('); a(1); p(')'); s()
      }
    } else if (thisLowered === 'objhaskey') {
      // objhaskey(obj,key) -> obj.Has(key)
      if (!(argsArr = getArgs())) { return 2 }
      a(1); p('.Has('); a(2); p(')'); s()
    } else if (thisLowered === 'objrawset') {
      // ObjRawSet(Object, Key, Value)
      // Object[Key]:=Value
      if (!(argsArr = getArgs())) { return 2 }
      a(1); p('['); a(2); p(']:='); a(3); s()
    } else if (thisLowered === 'objrawget') {
      // ObjRawGet(Object, Key)
      // Object[Key]
      if (!(argsArr = getArgs())) { return 2 }
      a(1); p('['); a(2); p(']'); s()
    } else {
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
          return 3
        }
      }
    }

  } else if (eType === '(.) property findTrailingExpr') {
    if (everything[i - 2].type !== 'Integer') {
      everything[i - 1].text = ''
      thisE.text = `["${everything[i].text}"]`
      thisE.type = 'v2: arrAccess'
    }
  } else if (eType === 'if') {
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
          return 3
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
          return 3
        }
      }

    }

  } else if (idkVariableOrAssignment[eType]) {
    const theText = everything[i].text
    const parsedIdkVar = parseIdkVariable(theText)
    if (parsedIdkVar) {
      /* const arrToJoin = []
      for (let n = 0, len = parsedIdkVar.length; n < len; n++) {
        if (parsedIdkVar[n].type) {
          if (parsedIdkVar[n].text.toLowerCase() === 'clipboard') {
            arrToJoin.push('%A_Clipboard%')
          } else {
            arrToJoin.push(parsedIdkVar[n].text)
          }
        }
      } */
    } else {
      /* if (theText.toLowerCase() === 'clipboard') {
        reconstructed.push('A_Clipboard')
      } else  */
      if (theText.toLowerCase() === 'a_isunicode') {

        while (true) {
          b = i
          if (!skipEmptyLinesEmptyText()) {break}
          if (everything[b].type === '? ternary') {
            next = everything[b + 1]
            if (next) {
              if (next.type === 'emptyLines' && !next.text.includes('\n')) {
                b++
              }
            }
            const ternaryTrueStart = b
            let findGroupEnd: boolean|number = false
            let reconstructSpliceIndex
            while (true) {
              b = i
              if (!backEmptyLinesEmptyText()) {break}
              if (everything[b].type === '( group') {
                findGroupEnd = true
                let r = reconstructed.length
                while (reconstructed[--r] !== '(') {
                  //
                }
                reconstructSpliceIndex = r
              }
              break
            }
            b = ternaryTrueStart
            if (!findNext(': ternary')) {break}
            const colonIndex = b
            const back = everything[b - 1]
            if (back) {
              if (back.type === 'emptyLines' && !back.text.includes('\n')) {
                b--
              }
            }
            const emptyLineBeforeColon = b
            b = colonIndex
            let ternaryFalseEnd
            if (findGroupEnd) {
              if (!nextSkipThrough(') group','( group')) {break}
              ternaryFalseEnd = b + 1
              reconstructed.splice(reconstructSpliceIndex)
            } else {
              if (!findNextAnyInObj(ternaryColonEndDelim)) {break}
              ternaryFalseEnd = b
            }

            // A_IsUnicode doesn't delete multiline emptyLines
            let ternaryEnd = ternaryFalseEnd - emptyLineBeforeColon
            b = ternaryFalseEnd
            backFindWithText()
            if (everything[b].text.includes('\n')) {
              ternaryEnd--
            }

            // foo( bufName, A_IsUnicode ? 510 : 255  )
            // remove ": 255  "
            everything.splice(emptyLineBeforeColon,ternaryEnd)
            // remove " ? "
            everything.splice(i,ternaryTrueStart - i)
            // should become foo( bufName, 510)

            return 3
            // reconstructed.push('')
            // ternaryFalseEnd
          }
          break
        }
        reconstructed.push('true')
      } else {
        reconstructed.push(theText)
      }
    }
  } else if (eType === '(statement) ,') {
    thisE.text = ' '
    const next = everything[i + 1]
    if (wsOrEmptyLine[next.type]) {
      thisE.text = ''
    }
  } else if (v1Percent[eType]) {
    thisE.text = ''
  } else if (v1Str[eType]) {
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
      thisE.text = `${whiteSpaceObj[everything[i - 1].text.slice(-1)] ? '' : ' '}"${theText.replace(/"/g, '`"')}"${putAtEnd}`
    }
  } else if (eType === '= v1Assignment') {
    thisE.text = ':='
    const next = everything[i + 1]
    // var = -> var:=""
    if (next.type === 'v1String findV1Expression') {
      if (next.text === '') {
        next.type = 'edit'
        next.text = '""'
      }
    }
  } else if (eType === 'String') {
    thisE.text = `"${everything[i].text.slice(1,-1).replace(/""/g, '`"')}"`
  } else if (anyCommand[eType]) {
    //if breakOrContinue, if is number, don't surround with quotes
    let objValue
    const dTextLowered = everything[i].text.toLowerCase()
    if (numIfNum[dTextLowered]) {
      if (skipFirstSeparatorOfCommand()) { return 3 }
      if (next.type === 'v1String findV1Expression') {
        if (!isNaN(next.text)) {
          next.type = 'edit'
        }
      }
    } else if (dTextLowered === '#noenv') {
      thisE.text = ''
      const next = everything[i + 1]
      if (next) {
        if (next.type === 'emptyLines') {
          next.text = ''
        }
      }
    } else if (dTextLowered === 'setbatchlines') {
      if (!skipFirstSeparatorOfCommand()) {
        if (findNext('end command')) {
          everything.splice(i - 1,b + 1 - i)
          return 1
        }
      }
      thisE.text = ''
      return 3
    } else if (v1ExprToEdit[dTextLowered]) {
      if (skipFirstSeparatorOfCommand()) { return 3 }
      if (next.type === 'v1String findV1Expression') {
        next.type = 'edit'
      }
    } else if (dTextLowered === 'listlines') {
      if (skipFirstSeparatorOfCommand()) { return 3 }
      if (next.type === 'v1String findV1Expression') {
        const dText = next.text
        if (on1off0[dText.toLowerCase()]) {
          next.type = 'edit'
          next.text = on1off0[dText.toLowerCase()]
        } else if (!isNaN(dText)) {
          next.type = 'edit'
        }
      }
    } else if (doNotQuoteCommand[dTextLowered]) {
      //until 'end command', do not quote every v1 expr
      b = i
      if (commandAllEdit()) {
        return 3
      }
    } else if (dTextLowered === 'stringtrimright') {
      if (skipFirstSeparatorOfCommand()) { return 3 }
      // StringTrimRight, OutputVar, InputVar, Count
      // OutputVar:=SubStr(InputVar,1,-Count)
      //#command
      commandAllEdit()
      if (!(commandParamsArr = getCommandParams())) { return 2 }
      c_a(1); c_p(':=SubStr('); c_a(2); c_p(',1,-'); c_a(3); c_p(')')
      spaceIfComment(); c_s()
    } else if (objValue = stringUpperLower[dTextLowered]) {
      if (skipFirstSeparatorOfCommand()) { return 3 }
      commandAllEditChoose({1:true,2:true})
      // StringUpper, OutputVar, InputVar, T
      // OutputVar:=StrUpper(InputVar,"T")
      //#command
      if (!(commandParamsArr = getCommandParams())) { return 2 }
      c_a(1); c_p(`:=${objValue}(`); c_a(2); c_o(',',3); c_a(3); c_p(')')
      spaceIfComment(); c_s()
    } else if (dTextLowered === 'random') {
      // Random, OutputVar [, Min, Max]
      // OutputVar:=Random([Min, Max])
      commandAllEdit()
      if (!(commandParamsArr = getCommandParams())) { return 2 }
      c_a(1); c_p(':=Random('); c_a(2); c_o(',',3); c_a(3); c_p(')')
      spaceIfComment(); c_s()
    }
  } else if (eType === 'legacyIf var') {
    b = i + 2
    let next = everything[b]
    dummyLoopNotIs:
    while (true) {
      if (next) {
        if (next.type === 'legacyIf is') {
          b += 2
          next = everything[b]
          if (!next) {break dummyLoopNotIs}
          let hasNot = false
          if (next.type === 'legacyIf (is) not') {
            hasNot = true
            b += 2
            next = everything[b]
            if (!next) {break dummyLoopNotIs}
          }
          if (next.type === 'v1String findV1Expression') {
            let typeCheckFunc
            if (next.text.toLowerCase() === 'number') {
              // if var is number
              // if IsNumber(var)
              typeCheckFunc = 'IsNumber'
            } else if (next.text.toLowerCase() === 'alnum') {
              typeCheckFunc = 'IsAlnum'
            } else if (next.text.toLowerCase() === 'float') {
              typeCheckFunc = 'IsFloat'
            } else {
              d('unknown type, tell me')
            }
            everything.splice(i,b - i + 1,{text:`${hasNot ? '!' : ''}${typeCheckFunc}(${everything[i].text})`,type:'v2: if is type'})
            return 3
          }
        }
      }
      break dummyLoopNotIs
    }
  } else if (eType === '1operator') {
    if (thisE.text === '&') {
      let bType
      b = i
      const bSave = b
      if (!(bType = findNextAnyInObj(startGroupOrUnit))) { return 2 }
      if (!nextSkipThrough(startGroupOrUnit[bType],bType)) { return 2 }
      //find ') group' or 'end unit'
      const sliced = everything.slice(bSave + 1, b)
      const allVariableCharsArr = []
      //to not & 2 -> 2.Ptr because Bitwise-and (&)
      //extract all validChars (variableCharsObj), see if the joined is a number?
      for (let n = 0, len = sliced.length; n < len; n++) {
        const dText = sliced[n].text
        if (dText) {
          for (let c = 0, len = dText.length; c < len; c++) {
            if (variableCharsObj[dText[c]]) {
              thisE.text = ''
              allVariableCharsArr.push(dText[c])
            }
          }
        }

      }
      const validVarStr = allVariableCharsArr.join('')
      if (isNaN(Number(validVarStr))) {

        everything.splice(b + 1,0,{type:'edit',text:'.Ptr'})
        // reconstructed.push('StrPtr(')
        // everything.splice(b + 1,0,{type:'edit',text:')'})
      }
    }
  } else if (eType === 'hotkey') {
    b = i
    const hotkeyI = i
    let next
    let blockDepth = 0
    while (true) {
      next = everything[++b]
      if (!next) {
        return 3
      }
      const dType = next.type
      if (startingBlock[dType]) {
        blockDepth++
      } else if (dType === '} unknown') {
        blockDepth--
      } else if (dType === 'hotkey') {
        return 3
      } else if (anyCommand[dType]) {
        if (blockDepth === 0) {
          if (next.text.toLowerCase() === 'return') {
            next.type = 'edit'
            next.text = '}'
            everything.splice(hotkeyI + 1,0,{text:'\n{',type:'edit'})
            return 3
          }
        }
      }
    }
  //#HERE
  } else if (eType === 'className') {
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
function spaceIfComment() {
  const next = everything[i + 1]

  if (next) {
    if (next.type === 'emptyLines') {
      if (next.text[0] === ';') {
        c_p(' ')
      }
    }
  }
}
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
function see(howFar = 3) {
  for (let n = 0; n < howFar; n++) {
    d(everything[i + n])
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

function commandAllEditChoose(whichParamsObj) {
  let paramNum = 1
  while (true) {
    next = everything[++b]
    if (!next) {
      return true
    }
    const dType = next.type
    if (v1Percent[dType] || v1Str[dType]) {
      if (whichParamsObj[paramNum]) {
        next.type = 'edit'
      }
    } else if (dType === ', command comma') {
      paramNum++
    } else if (dType === 'end command') {
      return true
    }
  }
}
function commandAllEdit() {
  while (true) {
    next = everything[++b]
    if (!next) {
      return true
    }
    const dType = next.type
    if (v1Percent[dType]) {
      next.type = 'edit'
    } else if (v1Str[dType]) {
      next.type = 'edit'
    } else if (dType === 'end command') {
      return true
    }
  }
}

function c_a(index) {
  const paramArr = commandParamsArr[index - 1]
  let paramsLen
  if (paramArr && (paramsLen = paramArr.length)) {
    for (let n = 0; n < paramsLen; n++) {
      if (!wsOrEmptyLine[paramArr[n].type]) {
        arrFromCParamsToInsert.push(paramArr[n])
      }
    }
  }
}
// arrFromCParamsToInsert.push(...paramArr)
function c_p(str) {
  arrFromCParamsToInsert.push({text:str})
}
function c_o(str,index) {
  if (commandParamsArr[index - 1]) {
    arrFromCParamsToInsert.push({text:str})
  }
}
function c_s() {
  everything.splice(cParamsEInsertIndex, 0, ...arrFromCParamsToInsert)
  i += arrFromCParamsToInsert.length
}

function a(index) {
  const paramArr = argsArr[index - 1]
  let paramsLen
  if (paramArr && (paramsLen = paramArr.length)) {
    for (let n = 0; n < paramsLen; n++) {
      if (!wsOrEmptyLine[paramArr[n].type]) {
        arrFromArgsToInsert.push(paramArr[n])
      }
    }
  }
}
// arrFromArgsToInsert.push(...paramArr)
function p(str) {
  arrFromArgsToInsert.push({text:str})
}
function o(str,index) {
  if (argsArr[index - 1]) {
    arrFromArgsToInsert.push({text:str})
  }
}
function s() {
  everything.splice(gArgsEInsertIndex, 0, ...arrFromArgsToInsert)
  i += arrFromArgsToInsert.length
}

function getCommandParams() {
  const functionStartIndex = cParamsEInsertIndex = i
  i += 2
  arrFromCParamsToInsert = []
  let paramStartIndex = i
  let next
  const arrOfArrOfE = []
  while (true) {
    innerLoop:
    while (true) {
      next = everything[i]
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
        i++
        continue innerLoop
      }

      if (bType === 'end command') {
        const spliceLen = i + 1 - functionStartIndex
        arrOfArrOfE.push(everything.slice(paramStartIndex, i))
        everything.splice(functionStartIndex, spliceLen)
        i -= spliceLen
        return arrOfArrOfE
      } else if (bType === ', command comma') {
        arrOfArrOfE.push(everything.slice(paramStartIndex, i))
        paramStartIndex = i + 1
      }
      i++
    }
  }
}
function getArgs() {
  const functionStartIndex = gArgsEInsertIndex = i
  i += 2
  arrFromArgsToInsert = []
  let paramStartIndex = i
  let next
  const arrOfArrOfE = []
  while (true) {
    innerLoop:
    while (true) {
      next = everything[i]
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
        i++
        continue innerLoop
      }

      if (bType === ') function CALL') {
        const spliceLen = i + 1 - functionStartIndex
        arrOfArrOfE.push(everything.slice(paramStartIndex, i))
        everything.splice(functionStartIndex, spliceLen)
        i -= spliceLen
        return arrOfArrOfE
      } else if (bType === ', function CALL') {
        arrOfArrOfE.push(everything.slice(paramStartIndex, i))
        paramStartIndex = i + 1
      }
      i++
    }
  }
}

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
function backFindWithText() {
  let next
  next = everything[--b]
  while (next) {
    if (next.text !== undefined) {
      return true
    }
    next = everything[--b]
  }
  return false
}

function backEmptyLinesEmptyText() {
  let next
  next = everything[--b]
  while (next) {
    if (next.type !== 'emptyLines' && next.text !== undefined) {
      return true
    }
    next = everything[--b]
  }
  return false
}
function skipEmptyLinesEmptyText() {
  let next
  next = everything[++b]
  while (next) {
    if (next.type !== 'emptyLines' && next.text !== undefined) {
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
const arrToJoin = []
for (let i = 0, len = everything.length; i < len; i++) {
  arrToJoin.push(everything[i].text)
}
writeSync(arrToJoin.join(''),'reconstructed.ah2')
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
