import type {EverythingType} from './parser/index'

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
const commaCommandObj: stringIndexBool = {', command whiteSpace':true,', command comma':true,', 1 (loop) idk':true,', 2 (loop) idk':true}
//added 'start unit' for Param=Integer, 'String' for Param=""
const startOfV1Expr: stringIndexBool = {'v1String findV1Expression':true,'%START %Var%':true,'v1String findPercentVarV1Expression':true,'start unit':true,'String':true}

const typesThatAreVars: stringIndexBool = {'Param':true,'idkVariable':true,'assignment':true,'v1String findIdkVar':true,'var at v1Assignment':true}
const varsThatArePath: stringIndexBool = {} //this WILL get dynamicly filled

// const concatableTypes: stringIndexBool = {'v1String findPercentVarV1Expression':true,'percentVar v1Expression':true}
const concatIgnoreThese: stringIndexBool = {'%START %Var%':true,'END% %Var%':true}
const modV1StrEditThese: stringIndexBool = {'v1String findPercentVarV1Expression':true,'percentVar v1Expression':true,'%START %Var%':true,'END% %Var%':true,'v1String findV1Expression beforeSingleComma':true,'v1String findV1Expression':true}

//for 'dllcall'
const dllcallStr: stringIndexBool = {'"str"':true,'"wstr"':true,'"astr"':true}

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
  replaceReservedVar('null','dNull','_null')
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
    switch (all()) {
    case 3:
      i++
    case 1:
      continue outOfLen
    case 2:
      break outOfLen
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
    switch (eType) {
    case '{ object':
      thisE.text = 'Map('; break
    case '} object':
      thisE.text = ')'; break
    case ': object':
      thisE.text = ','; break
    case 'singleVar':
      thisE.text = `"${everything[i].text}"`; break
    case '% v1->v2 expr':
      thisE.text = ''; break
    case 'functionName':{
      const thisText = everything[i].text
      const back = everything[i - 1]
      const thisLowered = thisText.toLowerCase()
      if (back && back.type === '. property') {
        switch (thisLowered) {
        case 'length':{
          // .Length() -> .Length
          thisE.type = 'v2: prop'
          //splice off ( to )
          const spliceStart = b = i + 1
          if (nextSkipThrough(') function CALL','( function CALL')) { return 2 }
          everything.splice(spliceStart,b - spliceStart + 1); break
        }
        case 'haskey':
          // .HasKey() -> .Has()
          thisE.text = 'Has'; break
        case 'count':{
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
          // case 'readline':
          // if (getArgs()) { return 2 }
          // p('ReadLine() "`n"'); s()
        }
        }
        return 3
      }
      switch (thisLowered) {
      case 'dllcall':{
        if (getArgs()) { return 2 }
        // DllCall("[DllFile\]Function" [, Type1, Arg1, Type2, Arg2, "Cdecl ReturnType"])
        // length 6 -> loop 2 times
        // DllCall("[DllFile\]Function" [, Type1, Arg1, Type2, Arg2)
        // length 5 -> loop 2 times
        // length 7 -> loop 3 times, length 8 -> loop 3 times

        // DllCall("advapi32\MD5Update", "Ptr", &MD5_CTX, "AStr", param_string, "UInt", 0)
        // DllCall("advapi32\MD5Update",StrPtr(MD5_CTX),"AStr",String(param_string),"UInt",0,)

        p('DllCall('),a(1)
        const len = argsArr.length - 1
        for (let n = 1; n < len; n += 2) {
          const dllcallType = trimEmptyLinesWsFromArr(argsArr[n])[0]
          p(','),a(n + 1)
          if (dllcallType.type === 'String' && dllcallStr[dllcallType.text.toLowerCase()]) {
            p(',String('),a(n + 2),p(')')
          } else {
            p(','),a(n + 2)
          }
        }
        // if odd
        if (len & 1) {
          p(','),a(len + 1)
        }
        p(')'),s()
        // p('DllC2all('),a(1),p(')'),s()
        break
      }
      case 'varsetcapacity':
        //#function
        if (getArgs()) { return 2 }
        if (argsArr.length === 1) {
          // VarSetCapacity(TargetVar)
          // TargetVar.Size
          // a(1); p('.Size'); s()
          // If omitted, the variable's current capacity will be returned and its contents will not be altered.
          p('VarSetStrCapacity('),a(1),p(')'),s()
        } else {
          // VarSetCapacity(TargetVar[,RequestedCapacity,FillByte])
          // VarSetStrCapacity(TargetVar[,RequestedCapacity])

          // https://docs.microsoft.com/en-us/previous-versions/windows/desktop/legacy/aa366561(v=vs.85)
          // https://www.autohotkey.com/board/topic/17289-a-faster-method-than-dllcallrtlfillmemory/#post_id_112306
          p('VarSetStrCapacity('),a(1),o(',',2),a(2),p(')')
          if (argsArr.length === 3) {
          // 'DllCall("RtlFillMemory", "UInt", Pointer, Int, 1, UChar, Byte)
            p(',DllCall("RtlFillMemory", "UInt",StrPtr('),a(1),p('), "Int",'),a(2),p(', "UChar",'),a(3),p(')')
          }
          s()

          // TargetVar:=BufferAlloc(RequestedCapacity,FillByte)
          // a(1); p(`:=${whichBuffer}(`); a(2); o(',',3); a(3); p(')'); s()
        }
        break
      case 'strreplace':
        // StrReplace(Haystack, Needle [, ReplaceText, OutputVarCount, Limit])
        // StrReplace(Haystack, Needle [, ReplaceText, CaseSense, OutputVarCount, Limit := -1])
        if (getArgs()) { return 2 }
        p('StrReplace('); a(1); p(','); a(2); o(',',3); a(3); o(',0,',4); a(4); o(',',5); a(5); p(')'); s(); break
      case 'object':
        // Object() -> Map()  OR  Object("key",value) -> Map("key",value)
        thisE.text = 'Map'; break
      case 'numput':{
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
        break
      }
      case 'numget':{
        // Number := NumGet(Source [, Offset := 0][, Type := "UPtr"])
        // Number := NumGet(Source, [Offset,] Type)
        if (getArgs()) { return 2 }
        const len = argsArr.length
        p('NumGet('); a(1); p(',');
        (argsArr[1] && argsArr[1].length > 1) ? a(2) : p('0')
        p(','); (len === 3 ? a(3) : p('"UPtr"')); p(')'); s(); break
      }
      case 'objgetaddress':
        // ObjGetAddress( this, "allData" )
        // this["allData"].Ptr
        if (getArgs()) { return 2 }
        p('StrPtr('); a(1); p('['); a(2); p('])'); s(); break
        // a(1); p('['); a(2); p('].Ptr'); s(); break
      case 'objsetcapacity':
        if (getArgs()) { return 2 }
        if (argsArr.length === 3) {
          // ObjSetCapacity( this, "allData", newSize )
          // NOPE: this["allData"].Size := newSize
          // this["allData"]:=BufferAlloc(newSize)
          a(1); p('['); a(2); p(`]:=${whichBuffer}(`); a(3); p(')'); s()
          // If omitted, the variable's current capacity will be returned and its contents will not be altered.
          // VarSetStrCapacity(this["allData"], newSize)
          p('VarSetStrCapacity('),a(1),p('['),a(2),p(']')
          p(',DllCall("RtlFillMemory", "UInt",StrPtr('),a(1),p('), "Int",'),a(2),p(', "UChar",'),a(3),p(')')
          s()
        } else {
          // p('ObjSetCapacity('); a(1); p(','); a(2); p(')'); s()
          // VarSetStrCapacity(this["allData"])
          p('VarSetStrCapacity('),a(1),p('['),a(2),p('])'),s()
        }
        break
      case 'objgetcapacity':
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
        break
      case 'objhaskey':
        // objhaskey(obj,key) -> obj.Has(key)
        if (getArgs()) { return 2 }
        a(1); p('.Has('); a(2); p(')'); s(); break
      case 'objrawset':
        // ObjRawSet(Object, Key, Value)
        // Object[Key]:=Value
        if (getArgs()) { return 2 }
        a(1); p('['); a(2); p(']:='); a(3); s(); break
      case 'objrawget':
        // ObjRawGet(Object, Key)
        // Object[Key]
        if (getArgs()) { return 2 }
        a(1); p('['); a(2); p(']'); s(); break
      default:
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
      } //inner switch end
      break //break outer switch
    } //scope create in outer switch
    case '(.) property findTrailingExpr':
      if (everything[i - 2].type !== 'Integer') {
        everything[i - 1].text = ''
        thisE.text = `["${everything[i].text}"]`
        thisE.type = 'v2: arrAccess'
      }
      break
    case 'if':{

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
      break
    }
    case 'idkVariable':
    case 'assignment':{

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

              return 1
            }
            break
          }
          thisE.text = 'true'
        }
      }
      break
    }
    case '(statement) ,':{
      thisE.text = ' '
      const next = everything[i + 1]
      if (wsOrEmptyLine[next.type]) {
        thisE.text = ''
      }
      break
    }
    case '%START %Var%':
    case 'END% %Var%':
      thisE.text = ''; break
    case 'v1String findV1Expression':
    case 'v1String findPercentVarV1Expression':
    case 'v1String findV1Expression beforeSingleComma':{
      if (thisE.text !== '' || eType === 'v1String findV1Expression') {
        let next,putAtEnd = '',back,putAtFront = ''

        b = i - 1
        back = everything[b]
        outerLoop:
        while (true) {
          while (back) {
            if (back.text) {
              if (!noNeedToWhiteSpaceForConcat[back.text.slice(-1)]) {
                putAtFront = ' '
              }
              break outerLoop
            }
            back = everything[--b]
          }
          break outerLoop
        }

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

        thisE.text = `${putAtFront}"${thisE.text.replace(/"/g,'`"')}"${putAtEnd}`
      }
      break
    }
    case 'percentVar v1Expression':{
      let back,putAtFront = '',next,putAtEnd = ''

      b = i - 1
      back = everything[b]
      outerLoop:
      while (true) {
        while (back) {
          if (back.text && concatIgnoreThese[back.type]) {
            if (!noNeedToWhiteSpaceForConcat[back.text.slice(-1)]) {
              putAtFront = ' '
            }
            break outerLoop
          }
          back = everything[--b]
        }
        break outerLoop
      }

      /* i++
      outerLoop:
      while ((next = everything[i])) {
        switch (all()) {
        case 3:
          i++
        case 1:
          if (next.text) {
            const firstChar = next.text[0]
            if (!noNeedToWhiteSpaceForConcat[firstChar]) {
              putAtEnd = ' '
            }
            break outerLoop
          }
          continue outerLoop
        case 2:
          return 2
        }
        i++
      } */
      b = i + 1
      next = everything[b]
      outerLoop:
      while (true) {
        while (next) {
          if (next.text && !concatIgnoreThese[next.type]) {
            if (!noNeedToWhiteSpaceForConcat[next.text[0]]) {
              putAtEnd = ' '
            }
            break outerLoop
          }
          next = everything[++b]
        }
        break outerLoop
      }

      thisE.text = `${putAtFront}${thisE.text}${putAtEnd}`
      return 3
    }
    case '2operator':
      if (thisE.text === '<>') {
        thisE.text = '!='
      }
      break
    case '= v1Assignment':{
      thisE.text = ':='
      let next = everything[++i]
      //# var = -> var:=""
      if (next) {
        if (next.type === 'whiteSpaces') {
          next = everything[++i]
        }
      }
      if (!next || !startOfV1Expr[next.type]) {
        // const next = everything[++i]
        // if (next) {
        // if (next.type === 'Integer') { //param=0
        // everything.splice(i,0,{type:'start wrap Integer "',text:'"'}) //param=1.2
        // i++
        /// 'start unit','Integer','. property','(.) property findTrailingExpr','end unit'
        // let next
        // while ((next = everything[++i])) {
        // if (next.type === 'end unit') {
        // everything.splice(i,0,{type:'start wrap Integer "',text:'"'})
        // i += 2; return 1
        // }
        // }
        ///it will never come here
        // }
        // }
        everything.splice(i,0,{type:'v1String findV1Expression',text:''})
      }
      return 1 //to actually parse the fake added 'v1String findV1Expression' to get correct trailing whiteSpace : ex if comments after.
      //and to not skip the '%START %Var%'
    }
    case 'String':
      thisE.text = `"${thisE.text.slice(1,-1).replace(/""/g,'`"')}"`; break
    case 'concat no whiteSpace':
      thisE.text = ' '; break
    case 'DIRECTIVE OR COMMAND comma':
    case 'command':
      //if breakOrContinue, if is number, don't surround with quotes
      switch (thisE.text.toLowerCase()) {
      case 'settitlematchmode':
        if (modNumIfNum(1)) { return 3 } break
      case 'mousegetpos':
        // MouseGetPos [OutputVarX, OutputVarY, OutputVarWin, OutputVarControl, Flag]
        if (commandNEdit(4)) { return 3 } break
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
        if (keepAsItIs(5)) { return 3 } break
      case 'stringtrimright':
        // StringTrimRight, OutputVar, InputVar, Count
        // OutputVar:=SubStr(InputVar,1,-Count)
        //#command
        if (commandAllEdit()) { return 3 }

        if (getCommandParams()) { return 2 }
        a(1); p(':=SubStr('); a(2); p(',1,-'); a(3); p(')')
        spaceIfComment(); s(); break
      case 'stringlower':
        // StringUpper, OutputVar, InputVar, T
        // OutputVar:=StrLower(InputVar,"T")
        if (commandNEdit(2)) { return 3 }

        if (getCommandParams()) { return 2 }
        a(1); p(':=StrLower('); a(2); o(',',3); a(3); p(')')
        spaceIfComment(); s(); break
      case 'stringupper':
        // StringUpper, OutputVar, InputVar, T
        // OutputVar:=StrUpper(InputVar,"T")
        if (commandNEdit(2)) { return 3 }

        if (getCommandParams()) { return 2 }
        a(1); p(':=StrUpper('); a(2); o(',',3); a(3); p(')')
        spaceIfComment(); s(); break
      case 'stringlen':
        if (commandAllEdit()) { return 3 }
        if (getCommandParams()) { return 2 }
        a(1); p(':=StrLen('); a(2); p(')')
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
      case 'envget':{
        const iBak = i
        if (modV1StrToEdit(1)) { return 3 }
        i = iBak
        if (getCommandParams()) { return 2 }
        a(1); p(':=EnvGet('); a(2); p(')')
        // `argsArr` for before, `arrFromArgsToInsert` for after
        if (arrFromArgsToInsert[2].text.toLowerCase() === '"systemroot"') {
          varsThatArePath[arrFromArgsToInsert[0].text.toLowerCase()] = true //lololool
        }
        spaceIfComment(); s()
        return 3
      }
      case 'formattime':
        return commandFirstParamToFunction('FormatTime')
      case 'sort':
        return commandFirstParamToFunction('Sort')
      case 'pixelgetcolor':{
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
      case 'stringsplit':{
        const iBak = i
        if (modV1StrToEdit(2)) { return 3 }
        i = iBak
        if (getCommandParams()) { return 2 }
        a(1); p(':=StrSplit(')
        if (argsArr.length > 1) {
          a(2)
        }
        for (let n = 3,lenPlusOne = argsArr.length + 1; n < lenPlusOne; n++) {
          p(','); a(n)
        }
        p(')'); spaceIfComment(); s()
        return 3
      }
      } //end of inner switch
      break //break outer switch
    case 'command EOL or comment':{
      const dTextLowered = everything[i].text.toLowerCase()
      if (dTextLowered === '#noenv') {
        deleteCommand()
        return 1
      }
      break
    }
    case 'legacyIf var':{
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
      break
    }
    case '1operator':
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
          // everything.splice(b + 1,0,{type:'edit',text:'.Ptr'})
          // 'StrPtr('
          everything.splice(i,0,{type:'edit',text:'StrPtr('})
          everything.splice(b + 1,0,{type:'edit',text:')'})
        }
      }
      break
    case 'hotkey':{

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
    }
    case 'className':
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
      break
    case ', 1 (loop) parse':
      if (varnameTill(', 2 (loop) parse')) { return 3 } break
    case '3operator':
      if (thisE.text.toLowerCase() === 'new') {
        const iBak = i
        if (skipEmpty()) { return 2 }
        if (next.type === 'idkVariable') {
          everything.splice(iBak,i - iBak + 1,next,
            (is_AHK_H ? {type:'.New()',text:'.New()'} : {type:'() new',text:'()'})
          )
          i = iBak + 1
        }
      }
      break
    case 'legacyIf in':{
      i += 2
      const nextType = everything[i].type
      const escapedMatchArr = []
      if (nextType !== '% v1->v2 expr') {
        b = i
        let arrToJoinOfDoubleComma = []
        matchCommaLoop:
        while (true) {
          const next = everything[b]
          if (!next) {
            d(1)
          }
          switch (next.type) {
          case ',, legacyIf var in findV1Expression':
            arrToJoinOfDoubleComma.push(','); break
          case 'endingWhiteSpaces v1Expression findV1Expression':
            break
          case ', legacyIf var in findV1Expression':
            escapedMatchArr.push(escapeRegex(arrToJoinOfDoubleComma.join('').replace(/"/g,'`"')))
            arrToJoinOfDoubleComma = []
            break
          case 'end legacyIf':
            if (arrToJoinOfDoubleComma.length) {
              escapedMatchArr.push(escapeRegex(arrToJoinOfDoubleComma.join('').replace(/"/g,'`"')))
            }
            break matchCommaLoop
          default:
            arrToJoinOfDoubleComma.push(next.text); break
          }
          b++
        }

        // (var ~= "i)^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)$")
        everything.splice(i - 4,b - i + 5,{
          type:'converted `if var in`',
          text:`(var ~= "Di)^(${escapedMatchArr.join('|')})$")`,
        })
      } else {
        return 1
      }
      break
    }
    case 'loop':{
      if (skipFirstSeparatorOfCommand()) { return 3 }
      let next = everything[i]
      if (next && next.type === '% v1->v2 expr') {
        next = everything[i + 2]
        // EnvGet SystemRootVar, SystemRoot
        // Loop % SystemRootVar "\Microsoft.NET\Framework" (A_PtrSize=8?"64":"") "\*", 2, 1
        if (next && next.type === 'idkVariable') {
          if (varsThatArePath[next.text.toLowerCase()]) {

            const iBak = i
            if (skipToAfter(', 1 (loop) idk')) { return 3 }
            if (commandNEdit(2)) { return 3 }
            i = iBak
            if (getCommandParams()) { return 2 }
            let Mode = ''
            if (argsArr.length > 1) {
              const IncludeFoldersArg = removeWhiteSpaceAndStuff(argsArr[1])
              if (IncludeFoldersArg.length) {
                switch (IncludeFoldersArg[0].text) {
                case '0':
                  Mode = 'F'; break
                case '1':
                  Mode = 'FD'; break
                case '2':
                  Mode = 'D'
                }
              }
              if (argsArr.length > 2) {
                const RecurseArg = removeWhiteSpaceAndStuff(argsArr[2])
                if (RecurseArg.length && RecurseArg[0].text === '1') {
                  Mode += 'R'
                }
              }
            }
            p('Files, '); a(1)
            if (Mode) {
              p(','),p(`"${Mode}"`)
            }
            spaceIfComment(); s(); break
          }
        }
      }
      return 1
    }
    //#HERE
    default:
      return 0
    }
    return 3 //this will execute if it doesn't go to else
  }
  // functions
  // https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript#3561711
  function escapeRegex(str: string) {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g,'\\$&')
  }
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
  function keepAsItIs(howManyInteger: number) {
    if (skipFirstSeparatorOfCommand()) { return true }
    if (howManyInteger) {
      let whichParam = 0
      innerLoop:
      while ((next = everything[i])) {
        if (modV1StrEditThese[next.type]) {
          next.type = 'edit'
          i++
          continue innerLoop
        }

        switch (all()) {
        case 3:
          i++
        case 1:
          continue innerLoop
        case 2:
          return 2
        }

        if (next.type === 'end command') {
          return false
        } else if (commaCommandObj[next.type]) {
          whichParam++
          if (whichParam === howManyInteger) {
            return false
          }
        }
        i++
        continue innerLoop
      }
      return true
    }
  }
  function modV1StrToEdit(howManyInteger: number) {
    if (skipFirstSeparatorOfCommand()) { return true }
    if (howManyInteger) {
      let whichParam = 0
      innerLoop:
      while ((next = everything[i])) {
        if (v1Str[next.type]) {
          next.type = 'edit'
          i++
          continue innerLoop
        }

        switch (all()) {
        case 3:
          i++
        case 1:
          continue innerLoop
        case 2:
          return 2
        }

        if (next.type === 'end command') {
          return false
        } else if (commaCommandObj[next.type]) {
          whichParam++
          if (whichParam === howManyInteger) {
            return false
          }
        }
        i++
        continue innerLoop
      }
      return true
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
  // function commandChooseEdit(whichParamsObj: stringIndexBool) {
  function commandNEdit(howManyEdit: number) {
    let paramNum = 1
    const len = everything.length
    b = i
    while (b < len) {
      next = everything[b]
      const dType = next.type
      if (v1Str[dType] || v1Percent[dType]) {
        next.type = 'edit'
      } else if (commaCommandObj[dType]) {
        if (paramNum === howManyEdit) {
          return false
        }
        paramNum++
      } else if (dType === 'end command') {
        return false
      }
      b++
    }
    //out of length
    return true
  }
  function commandAllEdit() {
    const len = everything.length
    b = i
    while (b < len) {
      next = everything[b]
      const dType = next.type
      if (v1Percent[dType]) {
        next.type = 'edit'
      } else if (v1Str[dType]) {
        next.type = 'edit'
      } else if (dType === 'end command') {
        return false
      }
      b++
    }
    //out of length
    return true
  }



  function skipFirstSeparatorOfCommand() {
    const len = everything.length
    if (i > len) {
      return true
    }
    next = everything[++i]
    if (next.type === 'emptyLines') {
      next.text = ' '
      if (i > len) {
        return true
      }
      next = everything[++i]
    }
    if (next.type === '(statement) ,') {
      next.text = ' '
      if (i > len) {
        return true
      }
      next = everything[++i]
      if (wsOrEmptyLine[next.type]) { //normally: 'whiteSpaces' ; 'loop' can be 'emptyLines'
        next.text = ''
        if (i > len) {
          return true
        }
        // next = everything[++i]
      }
    }

  }
  function see(howFar = 3) {
    for (let n = 0; n < howFar; n++) {
      d(everything[i + n])
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
  function removeWhiteSpaceAndStuff(paramArr: ExtendedEverythingType) {
    const returnArr = []
    let paramsLen
    if (paramArr && (paramsLen = paramArr.length)) {
      for (let n = 0; n < paramsLen; n++) {
        if (!wsOrEmptyLine[paramArr[n].type]) {
          returnArr.push(paramArr[n])
        }
      }
    }
    return returnArr
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
    innerLoop:
    while ((next = everything[i])) {
      const bType = next.type

      switch (all()) {
      case 3:
        i++
      case 1:
        continue innerLoop
      case 2:
        return true
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
    return true
  }
  function getArgs() {
    const functionStartIndex = i
    i += 2
    let paramStartIndex = i
    let next
    const localArgsArr = []
    innerLoop:
    while (i < everything.length) {
      next = everything[i]
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
    //out of length
    return true
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
  function skipToAfter(this_type: string) {
    const len = everything.length
    while (i < len) {
      next = everything[i]
      i++
      if (next.type && next.type === this_type) {
        return false
      }
    }
    //out of length
    return true
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
