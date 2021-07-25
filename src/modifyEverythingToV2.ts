import type {EverythingType} from './parser/index'
//challenge accepted
// https://stackoverflow.com/questions/41253310/typescript-retrieve-element-type-information-from-array-type#51399781
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never
type EverythingElement = ArrayElement<EverythingType> |
{
  type: string;
  text: string;
  i1?: undefined;
  c1?: undefined;
  c2?: undefined;
} | {
  text: string;
  type?: undefined;
  i1?: undefined;
  c1?: undefined;
  c2?: undefined;
}
type ExtendedEverythingType = EverythingElement[]

import type {stringIndexBool,stringIndexString} from './parser/tokens'

import {variableCharsObj,whiteSpaceObj} from './parser/tokens'
const d = console.debug.bind(console)

const classToStatic: stringIndexBool = {'biga':true,'WinClip':true,'WinClipAPI':true}

const anyCommand: stringIndexBool = {'DIRECTIVE OR COMMAND comma':true,'command':true}
// const anyCommand: stringIndexBool = {'DIRECTIVE OR COMMAND comma':true,'command EOL or comment':true,'command':true}
const idkVariableOrAssignment: stringIndexBool = {'idkVariable':true,'assignment':true}
const startingBlock: stringIndexBool = {'{ legacyIf':true,'{ if':true,'{ for':true,'{ else':true,'{ loop':true,'{ namedIf':true}
const startingBlockForClass: stringIndexBool = {'{ class':true,'{ function DEFINITION':true,'{ legacyIf':true,'{ if':true,'{ for':true,'{ else':true,'{ loop':true,'{ namedIf':true}
const v1Str: stringIndexBool = {'v1String findV1Expression':true,'v1String findPercentVarV1Expression':true,'v1String findV1Expression beforeSingleComma':true}
const v1Percent: stringIndexBool = {'%START %Var%':true,'END% %Var%':true}
// const removedDirectives :stringIndexBool= {'#noenv':true,'setbatchlines':true}
const commandDelim: stringIndexBool = {', command comma':true,'end command':true}
const funcCallDelim: stringIndexBool = {', function CALL':true,') function CALL':true}
const wsOrEmptyLine: stringIndexBool = {'whiteSpaces':true,'emptyLines':true}
const startGroupOrUnit: stringIndexString = {'( group':') group','start unit':'end unit'}
const on1off0: stringIndexString = {'on':'1','off':'0'}
const ternaryColonEndDelim: stringIndexBool = {'end assignment':true,', function CALL':true,') function CALL':true,', assignment':true,'end comma assignment':true}
const noNeedToWhiteSpaceForConcat: stringIndexBool = {' ':true,'\t':true,'\n':true,',':true,'<':true,'>':true,'=':true,'!':true}
const commaCommandObj: stringIndexBool = {', command whiteSpace':true,', command comma':true}
const startOfV1Expr: stringIndexBool = {'v1String findV1Expression':true,'%START %Var%':true,'v1String findPercentVarV1Expression':true}

const typesThatAreVars: stringIndexBool = {'Param':true,'idkVariable':true,'assignment':true,'v1String findIdkVar':true,'var at v1Assignment':true}

export default (everything: ExtendedEverythingType,is_AHK_H = true): string => {
  const whichBuffer = is_AHK_H ? 'BufferAlloc' : 'Buffer'
  // I'd never think I'd come to this day, but..
  // preprocessing..
  const varNames: {[key: string]: true} = {}
  const lowerVarNames: {[key: string]: number[]} = {}

  for (let n = 0,len = everything.length; n < len; n++) {
    if (typesThatAreVars[everything[n].type]) {
      const theText = everything[n].text
      const parsedIdkVar = parseIdkVariable(theText)
      if (parsedIdkVar) {
        for (let i = 0,len2 = parsedIdkVar.length; i < len2; i++) {
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
  //https://www.autohotkey.com/v2/v2-changes.htm#built-in-variables
  // this replaces: HERE:="" & v:=HERE & v=a%HERE%b
  // I mean, var being assigned, var in v2Expression, %var% in v1Expression
  renameVar('a_loopfilefullpath','A_LoopFilePath')
  renameVar('a_loopfilelongpath','A_LoopFileFullPath')
  renameVar('clipboard','A_Clipboard')
  renameVar('comspec','A_ComSpec')
  const namesArr = Object.keys(varNames)
  for (let n = 0,len = namesArr.length; n < len; n++) {
    const thisName = namesArr[n]
    const loweredName = thisName.toLowerCase()
    if ((loweredName.startsWith('true') && loweredName !== 'true')
     || (loweredName.startsWith('false') && loweredName !== 'false')) {

      const eIndexArr = lowerVarNames[loweredName]
      for (let i = 0,len2 = eIndexArr.length; i < len2; i++) {
        if (everything[eIndexArr[i]].type === 'assignment') {
          replaceReservedVar(loweredName,`d_${thisName}`,`_${thisName}`)
          break
        }
      }
    }
  }
  // theReservedVar should be lowercase
  function replaceReservedVar(theReservedVar: string,firstChoice: string,subfixForAutoGen = '') {
    const eIndexArr = lowerVarNames[theReservedVar]
    if (eIndexArr) {
      const subfixForAutoGenLowered = subfixForAutoGen.toLowerCase()
      let caseNameReplacement,idBak
      if (lowerVarNames[firstChoice.toLowerCase()]) {
        while (lowerVarNames[`${idBak = makeid(3)}${subfixForAutoGenLowered}`]) {
          //this will break when found unique name
        }
        caseNameReplacement = `${idBak}${subfixForAutoGen}`
      } else {
        caseNameReplacement = firstChoice
      }
      for (let n = 0,len = eIndexArr.length; n < len; n++) {
        everything[eIndexArr[n]].text = caseNameReplacement
      }
    }
  }
  function renameVar(varToRename: string,newName: string) {
    const eIndexArr = lowerVarNames[varToRename]
    if (eIndexArr) {
      for (let n = 0,len = eIndexArr.length; n < len; n++) {
        everything[eIndexArr[n]].text = newName
      }
    }
  }

  // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript#1349426
  function makeid(length: number) {
    var result = []
    var characters = 'abcdefghijklmnopqrstuvwxyz'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() *
  charactersLength)))
    }
    return result.join('')
  }

  let i = 0,b: number
  let next: EverythingElement,argsArr: ExtendedEverythingType[],gArgsEInsertIndex: number,arrFromArgsToInsert: ExtendedEverythingType
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

  const arrToJoin = []
  for (let i = 0,len = everything.length; i < len; i++) {
    arrToJoin.push(everything[i].text)
  }
  return arrToJoin.join('') //end of modifyEverythingToV2()
  function all(): number {
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
            if (nextSkipThrough(') function CALL','( function CALL')) { return 2 }
            everything.splice(spliceStart,b - spliceStart + 1)
          } else if (thisLowered === 'haskey') {
            // .HasKey() -> .Has()
            thisE.text = 'Has'
          } else if (thisLowered === 'count') {
            // a[k].count()
            // (type(a[k])=="Array"?a[k].Length:a[k].Count)
            b = i
            if (!skipThroughSomethingMid('start unit','end unit')) { return 3 }
            const spliceStart = b
            b = i + 1
            if (nextSkipThrough(') function CALL','( function CALL')) { return 2 }
            arrFromArgsToInsert = []
            // a[k] be the slice, make a(1) be a[k]
            argsArr = [everything.slice(spliceStart + 1,i - 1 )]
            // splice off and insert at same time
            p('(Type('); a(1); p(')=="Array"?'); a(1); p('.Length:'); a(1); p('.Count)')
            everything.splice(spliceStart,b - spliceStart + 1,...arrFromArgsToInsert)
          // } else if (thisLowered === 'readline') {
            // if (getArgs()) { return 2 }
            // p('ReadLine() "`n"'); s()
          }
          return 3
        }
      }
      if (thisLowered === 'varsetcapacity') {
        //#function
        if (getArgs()) { return 2 }
        if (argsArr.length === 1) {
          // VarSetCapacity(TargetVar)
          // TargetVar.Size
          a(1); p('.Size'); s()
        } else {
          // VarSetStrCapacity(TargetVar, RequestedCapacity, FillByte)
          // TargetVar:=BufferAlloc(RequestedCapacity,FillByte)
          a(1); p(`:=${whichBuffer}(`); a(2); o(',',3); a(3); p(')'); s()
        }
      } else if (thisLowered === 'strreplace') {
        // StrReplace(Haystack, Needle [, ReplaceText, OutputVarCount, Limit])
        // StrReplace(Haystack, Needle [, ReplaceText, CaseSense, OutputVarCount, Limit := -1])
        if (getArgs()) { return 2 }
        p('StrReplace('); a(1); p(','); a(2); o(',',3); a(3); o(',0,',4); a(4); o(',',5); a(5); p(')'); s()
      } else if (thisLowered === 'object') {
        // Object() -> Map()  OR  Object("key",value) -> Map("key",value)
        thisE.text = 'Map'
      } else if (thisLowered === 'numput') {
        // NumPut(Number, VarOrAddress [, Offset := 0][, Type := "UPtr"])
        // NumPut Type, Number, [Type2, Number2, ...] VarOrAddress [, Offset]
        if (getArgs()) { return 2 }
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
      } else if (thisLowered === 'numget') {
        // Number := NumGet(Source [, Offset := 0][, Type := "UPtr"])
        // Number := NumGet(Source, [Offset,] Type)
        if (getArgs()) { return 2 }
        const len = argsArr.length
        p('NumGet('); a(1); p(',');a(2); p(','); (len === 3 ? a(3) : p('"UPtr"')); p(')'); s()
      } else if (thisLowered === 'objgetaddress') {
        // ObjGetAddress( this, "allData" )
        // this["allData"].Ptr
        if (getArgs()) { return 2 }
        a(1); p('['); a(2); p('].Ptr'); s()
      } else if (thisLowered === 'objsetcapacity') {
        if (getArgs()) { return 2 }
        if (argsArr.length === 3) {
          // ObjSetCapacity( this, "allData", newSize )
          // NOPE: this["allData"].Size := newSize
          // this["allData"]:=BufferAlloc(newSize)
          a(1); p('['); a(2); p(`]:=${whichBuffer}(`); a(3); p(')'); s()
        } else {
          p('ObjSetCapacity('); a(1); p(','); a(2); p(')'); s()
        }
      } else if (thisLowered === 'objgetcapacity') {
        if (getArgs()) { return 2 }
        if (argsArr.length === 2) {
          // IF param1 is a [] and param2 === 1
          // ObjGetCapacity( [ param ] , 1)
          // VarSetStrCapacity(param)
          const param1 = trimEmptyLinesWsFromArr(argsArr[0])
          if (param1.length) {
            if (param1[0].type === '[ Array') {
              if (param1[param1.length - 1].type === '] Array') {
                const param2 = argsArr[1] = trimEmptyLinesWsFromArr(argsArr[1])
                if (param2.length === 3) {
                  // param2[0] is 'start unit', so param2[1]
                  if (param2[1].type === 'Integer') {
                    if (param2[1].text === '1') {
                      //slice: don't take the [ ]
                      argsArr[0] = param1.slice(1,-1)
                      p('VarSetStrCapacity('); a(1); p(')'); s()
                      return 3
                    }
                  }
                }
              }
            }
          }
          // ObjGetCapacity( this, "allData")
          // this["allData"].Size
          a(1); p('['); a(2); p('].Size'); s()
        } else {
          p('ObjGetCapacity('); a(1); p(')'); s()
        }
      } else if (thisLowered === 'objhaskey') {
        // objhaskey(obj,key) -> obj.Has(key)
        if (getArgs()) { return 2 }
        a(1); p('.Has('); a(2); p(')'); s()
      } else if (thisLowered === 'objrawset') {
        // ObjRawSet(Object, Key, Value)
        // Object[Key]:=Value
        if (getArgs()) { return 2 }
        a(1); p('['); a(2); p(']:='); a(3); s()
      } else if (thisLowered === 'objrawget') {
        // ObjRawGet(Object, Key)
        // Object[Key]
        if (getArgs()) { return 2 }
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
          if (nextSkipThrough('end unit','start unit')) { return 2 }
        }
        next = everything[b + (hasParen ? 2 : 1)]
        if (next) {
          if (next.type === 'end if') {
            b--
            next = everything[b]
            if (next.type === '] ArrAccess') {
              next.type = 'edit'
              next.text = ')'
              if (!skipThroughSomethingMid('[ ArrAccess','] ArrAccess')) { return 2 }
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
      if (theText.indexOf('%') === -1) {
        if (theText.toLowerCase() === 'a_isunicode') {

          while (true) {
            b = i
            if (!skipEmptyLinesEmptyText()) {break}
            let spliceStart = i - 1
            if (everything[b].type === '? ternary') {
              next = everything[b + 1]
              if (next) {
                if (next.type === 'emptyLines' && !next.text.includes('\n')) {
                  b++
                }
              }
              const ifTrueStart = b + 1
              let findGroupEnd = false
              let spliceEnd
              //splice off start to end and insert the ifTrue
              while (true) {
                b = i
                if (!backEmptyLinesEmptyText()) {break}
                if (everything[b].type === '( group') {
                  findGroupEnd = true
                  spliceStart = b
                }
                break
              }
              b = ifTrueStart
              if (!findNext(': ternary')) {break}
              const colonIndex = b
              const back = everything[b - 1]
              if (back) {
                if (back.type === 'emptyLines' && !back.text.includes('\n')) {
                  b--
                }
              }
              const ifTrueEnd = b
              b = colonIndex
              if (findGroupEnd) {
                if (nextSkipThrough(') group','( group')) {break}
                spliceEnd = b + 1
              } else {
                if (!findNextAnyInObj(ternaryColonEndDelim)) {break}
                spliceEnd = b
              }

              // A_IsUnicode doesn't delete multiline emptyLines
              let spliceLen = spliceEnd - spliceStart
              b = spliceEnd
              backFindWithText()
              if (everything[b].text.includes('\n')) {
                spliceLen--
              }
              everything.splice(spliceStart,spliceLen,...(everything.slice(ifTrueStart,ifTrueEnd)))

              return 3
            }
            break
          }
          thisE.text = 'true'
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
      const theText = thisE.text
      if (theText !== '' || eType === 'v1String findV1Expression') {
        let next,putAtEnd = ''
        b = i + 1
        next = everything[b]
        // skip through stuff like 'end command' which .text === undefined
        outerLoop:
        while (true) {
          while (next) {
            if (next.text) {
              const firstChar = next.text[0]
              if (!noNeedToWhiteSpaceForConcat[firstChar]) {
                putAtEnd = ' '
              }
              break outerLoop
            }
            next = everything[++b]
          }
          break outerLoop
        }
        thisE.text = `${noNeedToWhiteSpaceForConcat[everything[i - 1].text.slice(-1)] ? '' : ' '}"${theText.replace(/"/g,'`"')}"${putAtEnd}`
      }
    } else if (thisE.text === '<>' && eType === '2operator') {
      thisE.text = '!='
    } else if (eType === '= v1Assignment') {
      thisE.text = ':='
      let next = everything[++i]
      //# var = -> var:=""
      if (next) {
        if (next.type === 'whiteSpaces') {
          next = everything[++i]
        }
      }
      if (!next || !startOfV1Expr[next.type]) {
        everything.splice(i,0,{type:'v1String findV1Expression',text:''})
      }
      return 1 //to actually parse the fake added 'v1String findV1Expression' to get correct trailing whiteSpace : ex if comments after.
      //and to not skip the '%START %Var%'
    } else if (eType === 'String') {
      thisE.text = `"${thisE.text.slice(1,-1).replace(/""/g,'`"')}"`
    } else if (eType === 'concat no whiteSpace') {
      thisE.text = ' '
    } else if (anyCommand[eType]) {
      //if breakOrContinue, if is number, don't surround with quotes
      switch (thisE.text.toLowerCase()) {
      case 'settitlematchmode':
        if (modNumIfNum(1)) { return 3 } break
      case 'mousegetpos':
        // MouseGetPos [OutputVarX, OutputVarY, OutputVarWin, OutputVarControl, Flag]
        if (modCommandOfVarnameAfterNum(4)) { return 3 } break
      case 'mousemove':
        // MouseMove X, Y [, Speed, Relative]
        if (modV1StrToEdit(3)) { return 3 } break
      case 'pixelsearch':
        if (modCommandOfVarnameThenXNum(2,6)) { return 3 } break
      case 'setbatchlines':
        deleteCommand()
        return 1
      case 'goto':
      case '#singleinstance':
      case 'break':
      case 'continue':
        if (modV1StrToEdit(1)) { return 3 } break
      case 'listlines':
        if (skipFirstSeparatorOfCommand()) { return 3 }
        if (next.type === 'v1String findV1Expression') {
          const dText = next.text
          if (on1off0[dText.toLowerCase()]) {
            next.type = 'edit'
            next.text = on1off0[dText.toLowerCase()]
          } else if (!isNaN(Number(dText))) {
            next.type = 'edit'
          } else {
            // gwegwegweg or 3 for example is equivalent to off or 0
            next.type = 'edit'
            next.text = '0'
          }
        } else {
          return 1 //for ex: '%START %Var%'
        }
        break
      case 'splitpath':
        if (modV1StrToEdit(5)) { return 3 } break
      case 'stringtrimright':
        if (skipFirstSeparatorOfCommand()) { return 3 }
        // StringTrimRight, OutputVar, InputVar, Count
        // OutputVar:=SubStr(InputVar,1,-Count)
        //#command
        commandAllEdit()
        if (getCommandParams()) { return 2 }
        a(1); p(':=SubStr('); a(2); p(',1,-'); a(3); p(')')
        spaceIfComment(); s(); break
      case 'stringlower':
        // StringUpper, OutputVar, InputVar, T
        // OutputVar:=StrUpper(InputVar,"T")
        //#command
        if (skipFirstSeparatorOfCommand()) { return 3 }
        commandAllEditChoose({1:true,2:true})
        if (getCommandParams()) { return 2 }
        a(1); p(':=StrLower('); a(2); o(',',3); a(3); p(')')
        spaceIfComment(); s(); break
      case 'stringupper':
        if (skipFirstSeparatorOfCommand()) { return 3 }
        commandAllEditChoose({1:true,2:true})
        if (getCommandParams()) { return 2 }
        a(1); p(':=StrUpper('); a(2); o(',',3); a(3); p(')')
        spaceIfComment(); s(); break
      case 'getkeystate':
        return commandFirstParamToFunction('GetKeyState')
      case 'controlgetfocus':
        return commandFirstParamToFunction('ControlGetFocus')
      case 'controlgettext':
        return commandFirstParamToFunction('ControlGetText')
      case 'statusbargettext':
        return commandFirstParamToFunction('StatusBarGetText')
      case 'random':
        return commandFirstParamToFunction('Random')
      case 'iniread':
        return commandFirstParamToFunction('IniRead')
      case 'regread':
        return commandFirstParamToFunction('RegRead')
      case 'fileread':
        return commandFirstParamToFunction('FileRead')
      case 'filegetattrib':
        return commandFirstParamToFunction('FileGetAttrib')
      case 'filegettime':
        return commandFirstParamToFunction('FileGetTime')
      case 'filegetsize':
        return commandFirstParamToFunction('FileGetSize')
      case 'filegetversion':
        return commandFirstParamToFunction('FileGetVersion')
      case 'wingettitle':
        return commandFirstParamToFunction('WinGetTitle')
      case 'wingetclass':
        return commandFirstParamToFunction('WinGetClass')
      case 'wingettext':
        return commandFirstParamToFunction('WinGetText')
      case 'sysget':
        return commandFirstParamToFunction('SysGet')
      case 'envget':
        return commandFirstParamToFunction('EnvGet')
      case 'formattime':
        return commandFirstParamToFunction('FormatTime')
      case 'Sort':
        return commandFirstParamToFunction('Sort')
      case 'pixelgetcolor':
        // PixelGetColor, OutputVar, X, Y , Mode
        // Color := PixelGetColor(X, Y [, Mode])
        const iBak = i
        if (modV1StrToEdit(3)) { return 3 }
        i = iBak
        if (getCommandParams()) { return 2 }
        a(1); p(':=PixelGetColor('); a(2); o(',',3); a(3); o(',',4)
        //Alt RGB -> Alt
        //RGB Alt  -> Alt
        const paramArr = argsArr[3]
        let paramsLen
        if (paramArr && (paramsLen = paramArr.length)) {
          for (let n = 0; n < paramsLen; n++) {
            const dType = paramArr[n].type
            if (!wsOrEmptyLine[paramArr[n].type]) {
              if (v1Str[dType] || dType === 'String') {
                paramArr[n].text = paramArr[n].text.replace(/ RGB/ig,'').replace(/RGB /ig,'')
              }
              arrFromArgsToInsert.push(paramArr[n])
            }
          }
        }
        p(')')
        spaceIfComment(); s(); break
      }

    } else if (eType === 'command EOL or comment') {
      const dTextLowered = everything[i].text.toLowerCase()
      if (dTextLowered === '#noenv') {
        deleteCommand()
        return 1
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
              const lowerText = next.text.toLowerCase()
              if (lowerText === 'number') {
                // if var is number
                // if IsNumber(var)
                typeCheckFunc = 'IsNumber'
              } else if (lowerText === 'alnum') {
                typeCheckFunc = 'IsAlnum'
              } else if (lowerText === 'float') {
                typeCheckFunc = 'IsFloat'
              } else if (lowerText === 'integer') {
                typeCheckFunc = 'IsInteger'
              } else {
                d('unknown type, tell me',next)
                typeCheckFunc = `Is${lowerText.charAt(0).toUpperCase()}${lowerText.slice(1)}`
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
        if (nextSkipThrough(startGroupOrUnit[bType],bType)) { return 2 }
        //find ') group' or 'end unit'
        const sliced = everything.slice(bSave + 1,b)
        const allVariableCharsArr = []
        //to not & 2 -> 2.Ptr because Bitwise-and (&)
        //extract all validChars (variableCharsObj), see if the joined is a number?
        for (let n = 0,len = sliced.length; n < len; n++) {
          const dText = sliced[n].text
          if (dText) {
            for (let c = 0,len = dText.length; c < len; c++) {
              if (variableCharsObj[dText[c]]) {
                allVariableCharsArr.push(dText[c])
              }
            }
          }

        }
        const validVarStr = allVariableCharsArr.join('')
        if (isNaN(Number(validVarStr))) {
          thisE.text = ''
          everything.splice(b + 1,0,{type:'edit',text:'.Ptr'})
          // 'StrPtr('
          // everything.splice(b + 1,0,{type:'edit',text:')'})
        }
      }
    } else if (eType === 'hotkey') {
      const hotkeyLine = thisE.i1
      b = i
      const hotkeyI = i
      let next
      let blockDepth = 0
      //skip to next line
      while (true) {
        next = everything[++b]
        if (!next) {
          return 3
        }
        if (next.i1 !== hotkeyLine) {
          b--
          break
        }
      }
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
        } else if (dType === 'command EOL or comment') {
          if (blockDepth === 0) {
            const lText = next.text.toLowerCase()
            if (lText === 'return') {
              next.type = 'edit'
              next.text = '}'
              everything.splice(hotkeyI + 1,0,{text:'{',type:'edit'})
              return 3
            } else if (lText === 'exitapp') {
              next.type = 'edit'
              next.text = 'ExitApp\n}'
              everything.splice(hotkeyI + 1,0,{text:'{',type:'edit'})
            }
          }
        }
      }
    } else if (eType === 'className') {
      if (classToStatic[everything[i].text]) {
        b = i + 1
        let next,arrAccessDepth = 0
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
          } else if (bType === 'function DEFINITION name') {
            everything.splice(b,0,{type:'edit',text:'static '})
            b++
          }
          next = everything[++b]
        }
      }
    } else if (eType === ', 1 (loop) parse') {
      if (varnameTill(', 2 (loop) parse')) { return 3 }
    //#HERE
    } else if (eType === '3operator' && thisE.text.toLowerCase() === 'new') {
      const iBak = i
      if (skipEmpty()) { return 2 }
      if (next.type === 'idkVariable') {
        everything.splice(iBak,i - iBak + 1,next,
          (is_AHK_H ? {type:'.New()',text:'.New()'} : {type:'() new',text:'()'})
        )
        i = iBak + 1
      }
    } else {
      return 0
    }
    return 3
  }
  // functions
  function commandFirstParamToFunction(funcName: string) {
    const iBak = i
    if (modV1StrToEdit(1)) { return 3 }
    i = iBak
    if (getCommandParams()) { return 2 }
    a(1); p(`:=${funcName}(`)
    if (argsArr.length > 1) {
      a(2)
    }
    for (let n = 3,lenPlusOne = argsArr.length + 1; n < lenPlusOne; n++) {
      p(','); a(n)
    }
    p(')'); spaceIfComment(); s()
    return 3
  }
  function skipEmpty() {
    next = everything[++i]
    while (next) {
      const bType = next.type
      if (next.text && !wsOrEmptyLine[bType]) {
        return false
      }
      next = everything[++i]
    }
    return true
  }
  function varnameTill(eType: string) {
    i++
    innerLoop:
    while (true) {
      next = everything[i]
      if (!next) {
        return true
      }
      const bType = next.type

      if (v1Str[bType]) {
        next.type = 'edit'
        i++
        continue innerLoop
      } else if (bType === eType) {
        i--
        return false
      }

      const allReturn = all()
      if (allReturn === 1) {
        continue innerLoop
      } else if (allReturn === 2) {
        return true
      }
      i++
      continue innerLoop
    }
  }
  function modNumIfNum(howManyInteger: number) {
    if (skipFirstSeparatorOfCommand()) { return true }
    if (howManyInteger) {
      let whichParam = 0
      innerLoop:
      while (true) {
        next = everything[i]
        if (!next) {
          return true
        }
        const bType = next.type

        if (v1Str[bType]) {
          if (!isNaN(Number(next.text))) {
            next.type = 'edit'
            i++
            continue innerLoop
          }
        }

        const allReturn = all()
        if (allReturn === 1) {
          continue innerLoop
        } else if (allReturn === 2) {
          return true
        } else if (allReturn === 3) {
          i++
          continue innerLoop
        }

        if (bType === 'end command') {
          return false
        } else if (commaCommandObj[bType]) {
          whichParam++
          if (whichParam === howManyInteger) {
            return false
          }
        }
        i++
        continue innerLoop
      }
    }
  }
  function modV1StrToEdit(howManyInteger: number) {
    if (skipFirstSeparatorOfCommand()) { return true }
    if (howManyInteger) {
      let whichParam = 0
      innerLoop:
      while (true) {
        next = everything[i]
        if (!next) {
          return true
        }
        const bType = next.type

        if (v1Str[bType]) {
          // if (!isNaN(Number(next.text))) {
          next.type = 'edit'
          i++
          continue innerLoop
          // }
        }

        const allReturn = all()
        if (allReturn === 1) {
          continue innerLoop
        } else if (allReturn === 2) {
          return true
        } else if (allReturn === 3) {
          i++
          continue innerLoop
        }

        if (bType === 'end command') {
          return false
        } else if (commaCommandObj[bType]) {
          whichParam++
          if (whichParam === howManyInteger) {
            return false
          }
        }
        i++
        continue innerLoop
      }
    }
  }
  function modCommandOfVarnameThenXNum(howManyVarName: number,howManyNum: number) {
    if (skipFirstSeparatorOfCommand()) { return true }
    if (howManyVarName) {
      let whichParam = 0
      innerLoop:
      while (true) {
        next = everything[i]
        if (!next) {
          return true
        }
        const bType = next.type
        if (v1Str[bType]) {
          next.type = 'edit'
          i++
          continue innerLoop
        }
        const allReturn = all()
        if (allReturn === 1) {
          continue innerLoop
        } else if (allReturn === 2) {
          return true
        } else if (allReturn === 3) {
          i++
          continue innerLoop
        }
        if (bType === 'end command') {
          return false
        } else if (commaCommandObj[bType]) {
          whichParam++
          if (whichParam === howManyVarName) {
            break innerLoop
          }
        }
        i++
        continue innerLoop
      }
    }
    let whichParam = -1
    innerLoop:
    while (true) {
      next = everything[i]
      if (!next) {
        return true
      }
      const bType = next.type
      if (v1Str[bType]) {
        if (!isNaN(Number(next.text))) {
          next.type = 'edit'
          i++
          continue innerLoop
        }
      }
      const allReturn = all()
      if (allReturn === 1) {
        continue innerLoop
      } else if (allReturn === 2) {
        return true
      } else if (allReturn === 3) {
        i++
        continue innerLoop
      }
      if (bType === 'end command') {
        return false
      } else if (commaCommandObj[bType]) {
        whichParam++
        if (whichParam === howManyNum) {
          spliceTill('end command')
          return false
        }
      }
      i++
      continue innerLoop
    }
  }
  function spliceTill(searchType: string) {
    b = i
    while (true) {
      if (everything[++b].type === searchType) {
        everything.splice(i,b - i)
        return true
      }
    }
  }
  function spliceTillIndex(index: number) {
    everything.splice(i,index - i)
  }
  function deleteCommand() {
    b = i
    findNext('end command')
    spliceTillIndex(b + 2)
  }
  function modCommandOfVarnameAfterNum(howManyVarName: number) {
    if (skipFirstSeparatorOfCommand()) { return true }
    if (howManyVarName) {
      let whichParam = 0
      innerLoop:
      while (true) {
        next = everything[i]
        if (!next) {
          return true
        }
        const bType = next.type

        if (v1Str[bType]) {
          next.type = 'edit'
          i++
          continue innerLoop
        }

        const allReturn = all()
        if (allReturn === 1) {
          continue innerLoop
        } else if (allReturn === 2) {
          return true
        } else if (allReturn === 3) {
          i++
          continue innerLoop
        }

        if (bType === 'end command') {
          return false
        } else if (commaCommandObj[bType]) {
          whichParam++
          if (whichParam === howManyVarName) {
            break innerLoop
          }
        }
        i++
        continue innerLoop
      }
    }
    innerLoop:
    while (true) {
      next = everything[i]
      if (!next) {
        return true
      }
      const bType = next.type

      if (v1Str[bType]) {
        if (!isNaN(Number(next.text))) {
          next.type = 'edit'
          i++
          continue innerLoop
        }
      }

      const allReturn = all()
      if (allReturn === 1) {
        continue innerLoop
      } else if (allReturn === 2) {
        return true
      } else if (allReturn === 3) {
        i++
        continue innerLoop
      }

      if (bType === 'end command') {
        return false
      }
      i++
    }
  }
  function printFromEverythingText(okArr: ExtendedEverythingType) {
    const arrToJoin = []
    for (let i = 0,len = okArr.length; i < len; i++) {
      arrToJoin.push(okArr[i].text)
    }
    d(arrToJoin.join(''))
  }
  function spaceIfComment() {
    const next = everything[i + 1]

    if (next) {
      if (next.type === 'emptyLines') {
        if (next.text[0] === ';') {
          p(' ')
        }
      }
    }
  }
  function skipFirstSeparatorOfCommand() {
    next = everything[++i]
    if (!next) {
      return true
    }
    if (next.type === 'emptyLines') {
      next.text = ' '
      next = everything[++i]
      if (!next) {
        return true
      }
    }
    if (next.type === '(statement) ,') {
      next.text = ' '
      next = everything[++i]
      if (!next) {
        return true
      }
      if (next.type === 'whiteSpaces') {
        next.text = ''
        next = everything[++i]
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
    let pVar,notVar,endIndex
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

  function commandAllEditChoose(whichParamsObj: stringIndexBool) {
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
      } else if (commaCommandObj[dType]) {
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

  function a(index: number) {
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
  function p(str: string) {
    arrFromArgsToInsert.push({text:str})
  }
  function o(str: string,index: number) {
    if (argsArr[index - 1]) {
      arrFromArgsToInsert.push({text:str})
    }
  }
  function s() {
    everything.splice(gArgsEInsertIndex,0,...arrFromArgsToInsert)
    i += arrFromArgsToInsert.length
  }
  /* trimEmptyLinesWsFromArr([
            { type: 'emptyLines'},
            { type: 'emptyLines'},
            { type: 'emptyLines'},
          ])
          trimEmptyLinesWsFromArr([
          ])
          trimEmptyLinesWsFromArr([
            { type: 'ok'},
            { type: 'emptyLines'},
            { type: 'emptyLines'},
          ])
          trimEmptyLinesWsFromArr([
            { type: 'emptyLines'},
            { type: 'emptyLines'},
            { type: 'ok'},
          ]) */
  function trimEmptyLinesWsFromArr(paramArr: ExtendedEverythingType) {
    let n = 0
    for (let len = paramArr.length; n < len; n++) {

      if (!wsOrEmptyLine[paramArr[n].type]) {
        break
      }
    }
    const sliceStart = n
    for (n = paramArr.length - 1; n > sliceStart; n--) {
      if (!wsOrEmptyLine[paramArr[n].type]) {
        break
      }
    }
    return paramArr.slice(sliceStart,n + 1)
  }

  function getCommandParams() {
    const functionStartIndex = i
    i += 2
    let paramStartIndex = i
    let next
    const localArgsArr = []
    while (true) {
      innerLoop:
      while (true) {
        next = everything[i]
        if (!next) {
          return true
        }
        const bType = next.type

        const allReturn = all()
        if (allReturn === 1) {
          continue innerLoop
        } else if (allReturn === 2) {
          return true
        } else if (allReturn === 3) {
          i++
          continue innerLoop
        }

        if (bType === 'end command') {
          const spliceLen = i + 1 - functionStartIndex
          localArgsArr.push(everything.slice(paramStartIndex,i))
          everything.splice(functionStartIndex,spliceLen)
          i -= spliceLen
          argsArr = localArgsArr
          gArgsEInsertIndex = functionStartIndex
          arrFromArgsToInsert = []
          return false
        } else if (commaCommandObj[bType]) {
          localArgsArr.push(everything.slice(paramStartIndex,i))
          paramStartIndex = i + 1
        }
        i++
      }
    }
  }
  function getArgs() {
    const functionStartIndex = i
    i += 2
    let paramStartIndex = i
    let next
    const localArgsArr = []
    while (true) {
      innerLoop:
      while (true) {
        next = everything[i]
        if (!next) {
          return true
        }
        const bType = next.type

        const allReturn = all()
        if (allReturn === 1) {
          continue innerLoop
        } else if (allReturn === 2) {
          return true
        } else if (allReturn === 3) {
          i++
          continue innerLoop
        }

        if (bType === ') function CALL') {
          const spliceLen = i + 1 - functionStartIndex
          localArgsArr.push(everything.slice(paramStartIndex,i))
          everything.splice(functionStartIndex,spliceLen)
          i -= spliceLen
          argsArr = localArgsArr
          gArgsEInsertIndex = functionStartIndex
          arrFromArgsToInsert = []
          return false
        } else if (bType === ', function CALL') {
          localArgsArr.push(everything.slice(paramStartIndex,i))
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
  function findNextAnyInObj(insideThisObj: stringIndexBool|stringIndexString): string|false {
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
      if (next.type === stopAtThis) {
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
  function nextSkipThrough(lookForThisToEnd: string,ohNoAddAnotherOne: string) {
    let next,arrAccessDepth = 1
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
          return false
        }
      }
      next = everything[++b]
    }
    return true
  }

  function skipThroughSomethingMid(lookForThisToEnd: string,ohNoAddAnotherOne: string) {
    let back,arrAccessDepth = 1
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
}