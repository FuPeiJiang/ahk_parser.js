import {trace} from 'console'
import {whiteSpaceObj,variableCharsObj,operatorsObj,legacyIfOperators,v1Continuator,typeOfValidVarName,whiteSpaceOverrideAssign,propCharsObj,namedIf,assignmentOperators,elseLoopReturn,v2Continuator,thisCouldBeFuncName,emptyLinesObj} from './tokens'
import type {stringIndexBool} from './tokens'
const d = console.debug.bind(console)

/* type EverythingType = {
  type: string, //'String', 'Integer', everything...
  text?: string,
  i1?: number, //line start (0-based so first line is 0)
  c1?: number, //column start
  c2?: number, //column end (I omit this if text is 1 char)
  i2?: number, //line end (I omit this if text is on 1 line)
}[] */

/* type EverythingType = ({
  type?: string;
  text?: string;
  i1?: number;
  c1?: number;
  i2?: number;
  c2?: number;
} | {
  text: string;
  type?: undefined;
  i1?: undefined;
  c1?: undefined;
  c2?: undefined;
} | {
  type: string;
} | {
  text: string;
  type: string;
} | {
  text: string;
  i1: number;
  c1: number;
} | {
  type: string;
  text: string;
  i1: number;
  c1: number;
} | {
  type: string;
  text: string;
  i1: number;
  c1: number;
  i2: number;
  c2: number;
})[] */

/* type EverythingType =
{
type?: string | undefined;
text?: string | undefined;
i1?: number | undefined;
c1?: number | undefined;
c2?: number | undefined;
}[] */
type EverythingType =
({
  type: string;
  text: string;
  i1: number;
  c1: number;
  c2?: undefined;
} | {
  type: string;
  text: string;
  i1: number;
  c1: number;
  c2: number;
} | {
  type: string;
  text: string;
  i1: number;
  c1: number;
  c2: number;
  i2: number;
} | {
  type: string;
  text?: undefined;
  i1?: undefined;
  c1?: undefined;
  c2?: undefined;
}
)[]
export type {EverythingType}

// | {
// type: string;
// text?: undefined;
// i1?: undefined;
// c1?: undefined;
// c2?: undefined;

export default (content: string,literalDoubleQuoteInContinuation = false): EverythingType => {
  // https://stackoverflow.com/questions/6784799/what-is-this-char-65279#answer-6784805
  // https://stackoverflow.com/questions/13024978/removing-bom-characters-from-ajax-posted-string#answer-13027802
  if (content[0] === '\ufeff') {
    content = content.slice(1)
  }
  const lines = content.split('\n')
  const howManyLines = lines.length
  const everything: EverythingType = []
  const toFile = ''
  const rangeAndReplaceTextArr: [[[number,number],[number,number]],string][] = []

  const wsOrEmptyLine: stringIndexBool = {'whiteSpaces':true,'emptyLines':true}

  let okk: number
  okk = 0

  let i = 0,c = 0,numberOfChars = 0,b = 0,validName = '',strStartLine: number,strStartPos: number,insideContinuation = false,beforeConcat: number,nonWhiteSpaceStart: number,exprFoundLine = -1,colonDeep = 0,usingStartOfLineLoop = false,variadicAsterisk = false,lineWhereCanConcat = -1,v1ExpressionC1: number,cNotWhiteSpace: number,percentVarStart: number,propertyC1 = -1,lookingForAnd = false,doubleComma = false,singleComma = false,insideV1Continuation = false,strContiStartPos: number,strContiStartLine: number
  let everythingPushCounter: number; everythingPushCounter = 0
  let spliceStartIndex: number,validNameStart: number,validNameLine: number,validNameEnd: number,findingVarName = false,varNameCanLtrimSpaces: false,idkVarC1 = 0,legalObjLine = -1,lastTrailingWasFunc: boolean|number = false,spliceIndexEverythingAtHotkeyLine: number|boolean = false,operatorAtHotkeyLine = -1,v1StartLine = -1,funcParenStartIndex = -1

  let endStringContinuation: {(): boolean}
  if (literalDoubleQuoteInContinuation) {
    //do not findClosingQuoteInLine(), as they are literal
    endStringContinuation = function(){
    //now continue until I find a line starting with ')'
      i++
      while (i < howManyLines) {
        c = 0,numberOfChars = lines[i].length
        while (c < numberOfChars && whiteSpaceObj[lines[i][c]]) {
          c++
        }
        if (c < numberOfChars && lines[i][c] === ')') {
          insideContinuation = false

          const cBak = c
          i--,c = lines[i].length
          const text = textFromPosToCurrent([strContiStartPos,strContiStartLine])
          everything.push({type:'StringContinuation',text:text,i1:strStartLine,c1:strStartPos,i2:i,c2:c})
          everything.push({type:'newline ) continuation',text:'\n',i1:i,c1:c})
          i++,c = cBak
          everything.push({type:'whiteSpaces ) continuation',text:lines[i].slice(0,c),i1:i,c1:0,c2:c})
          everything.push({type:') continuation',text:')',i1:i,c1:c})

          c++
          strStartPos = c,strStartLine = i
          return findClosingQuoteInLine()
        }
        i++
      }
    }
  } else {
    //now continue until I find a line starting with ')'
    endStringContinuation = function() {
      i++
      while (i < howManyLines) {
        c = 0,numberOfChars = lines[i].length
        skipThroughWhiteSpaces()
        //true if found line starting with ) AND closingQuote on the same line
        if (c < numberOfChars && lines[i][c] === ')') {
          insideContinuation = false
          // d('stringContinuation END', char())
          c++
          //if ) and no ", return false to start another continuation
          return findClosingQuoteInLine()
        //if found closing " first, expect expression
        // " var
        // but continuation didn't end, IDK what happens
        } else if (findClosingQuoteInLine()) {
          recurseBetweenExpression()
          return false
        // return true
        }
        i++
      }
    }
  }

  lineLoop:
  while (i < howManyLines) {
    c = 0
    numberOfChars = lines[i].length

    if (!skipThroughEmptyLines()) { break lineLoop }

    startOfLineLoop:
    while (true) {

      //out of lines
      if (i === howManyLines) {
        break lineLoop
      }
      //nothing left, continue
      if (c === numberOfChars) {
        everything.push({type:'newLine startOfLineLoop',text:'\n',i1:i,c1:c})
        i++
        continue lineLoop
      }

      //#semicolon comments
      if (lines[i][c] === ';') {
        // d('SemiColonComment', `${c}-END`, l())
        // everything.push({type: 'SemiColonComment', line: i, colStart: c})
        const text = lines[i].slice(c,numberOfChars)
        everything.push({type:'SemiColonComment',text:text,i1:i,c1:c,c2:numberOfChars})
        everything.push({type:'newLine SemiColonComment',text:'\n',i1:i,c1:c})
        i++
        continue lineLoop
      }

      // spliceIndexEverythingAtHotkeyLine = false

      //#function DEFINITION END
      if (lines[i][c] === '}') {
        // d(`} Function DEFINITION ${char()}`)
        everything.push({type:'} unknown',text:'}',i1:i,c1:c})
        c++
        if (!skipThroughEmptyLines()) { break lineLoop }
        usingStartOfLineLoop = true
        continue startOfLineLoop
      } else if (lines[i][c] === '{') {
        everything.push({type:'perhaps { namedIf',text:'{',i1:i,c1:c})
        c++
        if (!skipThroughEmptyLines()) { break lineLoop }
      }

      nonWhiteSpaceStart = c
      const validNameStart = c
      spliceStartIndex = everything.length

      //stumble upon a valid variable Char
      if (variableCharsObj[lines[i][c]]) {
        c++
        skipValidChar()

        validName = lines[i].slice(nonWhiteSpaceStart,c)
        validNameEnd = c,validNameLine = i
        const isEol = c === numberOfChars ? true : false

        const idkType = typeOfValidVarName[validName.toLowerCase()]

        if (idkType) {
          v1StartLine = i
          const lenghtBeforeSkipLine = everything.length
          if (skipThroughEmptyLines()) {
            if (lines[i][c] === ',') {
              everything.push({type:'(statement) ,',text:',',i1:i,c1:c})
              c++

              // directive or command
              if (idkType === 1 || idkType === 4) {
                // d(validName, 'comma DIRECTIVE OR COMMAND', char())
                // #validName = lines[validNameLine].slice(validNameStart, validNameEnd)
                // everything.push({ type: 'newLine comma DIRECTIVE OR COMMAND', text: '\n', i1: i, c1: c + 1 })
                const sameReturned = sameCommaOrWhitespaceCommand()
                if (sameReturned === 1) {
                  continue startOfLineLoop
                } else if (sameReturned === 2) {
                  continue lineLoop
                }

                everything.splice(spliceStartIndex,0,{type:'DIRECTIVE OR COMMAND comma',text:validName,i1:validNameLine,c1:validNameStart,c2:validNameEnd})
                singleComma = true
                findV1Expression()
                singleComma = false
                if (i === howManyLines) {break lineLoop}
                recurseFindCommaV1Expression(', command comma')

                addEnd('end command')

                usingStartOfLineLoop = true
                continue startOfLineLoop
              }

              usingStartOfLineLoop = true
              continue startOfLineLoop
            } else if (i === validNameLine && whiteSpaceObj[lines[validNameLine][validNameEnd]]) {
              // only directives and "if" override assignment and ONLY when there's a whiteSpace
              if (idkType === 1) {
                // d(validName, 'whiteSpace DIRECTIVE', char())
                everything.splice(spliceStartIndex,0,{type:'directive',text:validName,i1:validNameLine,c1:validNameStart,c2:validNameEnd})
                const text = lines[i].slice(c,numberOfChars)
                everything.push({type:'directive to EOL',text:text,i1:i,c1:nonWhiteSpaceStart,c2:numberOfChars})
                everything.push({type:'newLine directive',text:'\n',i1:i,c1:c})
                i++
                continue lineLoop
              } else if (idkType === 2) {
                everything.splice(spliceStartIndex,0,{type:'if',text:validName,i1:validNameLine,c1:validNameStart,c2:validNameEnd})
                spliceStartIndex = everything.length
                breakToGoFindV2:
                while (variableCharsObj[lines[i][c]]) {
                  const saveC = c,saveI = i,saveNumChars = numberOfChars
                  while (findPercentVar() || variableCharsObj[lines[i][c]]) {
                    c++
                  }
                  const cendOfLegacyIfVar = c
                  while (c < numberOfChars && whiteSpaceObj[lines[i][c]]) {
                    c++
                  }
                  const whiteSpacesTextc = c

                  let validNamestart = c,spliceStartIndex = everything.length
                  skipValidChar()
                  validNameEnd = c,validNameLine = i
                  let validName = lines[validNameLine].slice(validNamestart,validNameEnd)
                  findV1ExpressiondummyLoop:
                  while (true) {
                    if (!validName) {

                      if (c < numberOfChars - 1 && legacyIfOperators[lines[i].slice(c,c + 2)]) {
                        everything.push({type:'2legacyIfOperators',text:lines[i].slice(c,c + 2),i1:i,c1:c,c2:c + 2})
                        c += 2
                        break findV1ExpressiondummyLoop
                      } else if (c < numberOfChars && legacyIfOperators[lines[i][c]]) {
                        everything.push({type:'1legacyIfOperators',text:lines[i][c],i1:i,c1:c})
                        c++
                        break findV1ExpressiondummyLoop
                      }

                      c = saveC,i = saveI,numberOfChars = saveNumChars
                      break breakToGoFindV2
                    }
                    const lowerValidName = validName.toLowerCase()
                    let checkThese = false,cPlusLen
                    if (lowerValidName === 'not' && (c === numberOfChars || whiteSpaceObj[lines[i][c]])) {
                      everything.push({type:'legacyIf not',text:validName,i1:i,c1:validNamestart,c2:c})
                      skipThroughWhiteSpaces()
                      validNamestart = c,spliceStartIndex = everything.length
                      skipValidChar()
                      validNameEnd = c,validNameLine = i
                      validName = lines[validNameLine].slice(validNamestart,validNameEnd)
                    } else {
                      checkThese = true
                    }

                    if (lowerValidName === 'in' && (c === numberOfChars || whiteSpaceObj[lines[i][c]])) {
                      everything.push({type:'legacyIf in',text:validName,i1:i,c1:validNamestart,c2:c})
                      doubleComma = true
                    } else if (lowerValidName === 'contains' && (c === numberOfChars || whiteSpaceObj[lines[i][c]])) {
                      everything.push({type:'legacyIf contains',text:validName,i1:i,c1:validNamestart,c2:c})
                      doubleComma = true
                    } else if (lowerValidName === 'between' && (c === numberOfChars || whiteSpaceObj[lines[i][c]])) {
                      everything.push({type:'legacyIf between',text:validName,i1:i,c1:validNamestart,c2:c})
                      lookingForAnd = true
                      break findV1ExpressiondummyLoop
                    }

                    if (checkThese) {
                      if (lowerValidName === 'is' && (c === numberOfChars || whiteSpaceObj[lines[i][c]])) {
                        everything.push({type:'legacyIf is',text:validName,i1:i,c1:validNamestart,c2:c})
                        skipThroughWhiteSpaces()

                        validName = lines[i].slice(c,cPlusLen = c + 3)
                        if (validName.toLowerCase() === 'not' && !variableCharsObj[lines[i][cPlusLen]]) {
                          everything.push({type:'legacyIf (is) not',text:validName,i1:i,c1:c,c2:c + 3})
                          c += 3
                          skipThroughWhiteSpaces()
                        }
                        break findV1ExpressiondummyLoop
                      }
                    }

                    const cBeforeSkipLines = c,iBeforeSkipLines = i
                    if (!skipThroughEmptyLines()) {
                      c = saveC,i = saveI,numberOfChars = saveNumChars
                      everything.splice(everything.length - 1,1)
                      break breakToGoFindV2
                    }
                    let removeTheEmptyLines = true
                    if (c === cBeforeSkipLines && i === iBeforeSkipLines) {
                      removeTheEmptyLines = false
                    }

                    c = saveC,i = saveI,numberOfChars = saveNumChars
                    if (removeTheEmptyLines) {
                      everything.splice(everything.length - 1,1)
                    }
                    break breakToGoFindV2
                  }

                  const whiteSpacesText = lines[saveI].slice(cendOfLegacyIfVar,whiteSpacesTextc)
                  if (whiteSpacesText) {
                    everything.splice(spliceStartIndex,0,{type:'whiteSpaces',text:whiteSpacesText,i1:i,c1:cendOfLegacyIfVar,c2:c})
                  }
                  everything.splice(spliceStartIndex,0,{type:'legacyIf var',text:lines[saveI].slice(saveC,cendOfLegacyIfVar),i1:saveI,c1:saveC,c2:cendOfLegacyIfVar})
                  findV1Expression()
                  doubleComma = false

                  if (lines[i][c] === '{') {
                    everything.push({type:'{ legacyIf',text:'{',i1:i,c1:c})
                    c++
                    if (!skipThroughEmptyLines()) { break lineLoop }
                  }

                  usingStartOfLineLoop = true
                  continue startOfLineLoop
                }

                // if (lines[i][c] === '(') {
                // everything.push({ type: '( if', text: '(', i1: i, c1: c })
                // c++
                if (!recurseBetweenExpression()) { findExpression() }

                //YOLO
                // let endIfIndex = everything.length - 1
                // if (everything[endIfIndex].type === 'emptyLines') {
                // endIfIndex--
                // }
                everything.splice(everything.length - 1,0,{type:'end if'})
                // d(') group', char())
                // everything.push({ type: ') if', text: ')', i1: i, c1: c })
                // c++
                if (i === howManyLines) { break lineLoop }
                // I don't need to skip empty lines because the above does it for me
                if (lines[i][c] === '{') {
                  everything.push({type:'{ if',text:'{',i1:i,c1:c})
                  // d(lines[i][c])

                  c++
                  if (!skipThroughEmptyLines()) { break lineLoop }
                  // d(numberOfChars, lines[i].length)
                }
                usingStartOfLineLoop = true
                continue startOfLineLoop
              //#whiteSpace v1 expression
              } else if (c < numberOfChars && lines[i][c] === '=') {
                everything.splice(spliceStartIndex,0,{type:'var at whiteSpace v1Assignment',text:validName,i1:i,c1:nonWhiteSpaceStart,c2:c})
                everything.push({type:'= whiteSpace v1Assignment',text:'=',i1:i,c1:c})
                c++
                findV1Expression()
                usingStartOfLineLoop = true
                continue startOfLineLoop
              }
              const doAssignmentReturned = doAssignment()
              if (doAssignmentReturned === 1) {
                continue startOfLineLoop
              } else if (doAssignmentReturned === 2) {
                break lineLoop
              }
              if (idkType === 3) {
                // d(validName, 'global local or static', char())
                everything.splice(spliceStartIndex,0,{type:'global local or static{ws}',text:validName,i1:validNameLine,c1:validNameStart,c2:validNameEnd})

                findVariableName()
                recurseBetweenExpression()
                if (skipCommaV2Expr()) {break lineLoop}
                usingStartOfLineLoop = true
                continue startOfLineLoop
                // return everything
              } else if (idkType === 4) {
                // d(validName, 'whiteSpace COMMAND', nonWhiteSpaceStart + 1, lineBeforeSkip + 1, 'line')
              // statement can't have Expr if line changed...
                const sameReturned = sameCommaOrWhitespaceCommand()
                if (sameReturned === 1) {
                  continue startOfLineLoop
                } else if (sameReturned === 2) {
                  continue lineLoop
                }

                if (validName.toLowerCase() === 'for') {
                  everything.splice(spliceStartIndex,0,{type:'for',text:validName,i1:validNameLine,c1:nonWhiteSpaceStart,c2:validNameEnd})
                  findVariableName()
                  if (lines[i][c] === ',') {
                    everything.push({type:', for',text:',',i1:i,c1:c})
                    c++
                    findVariableName()
                  }
                  // lookForIn
                  let text,cPlusLen,wsText
                  if ((text = lines[i].slice(c,cPlusLen = c + 2)).toLowerCase() === 'in' && (cPlusLen === numberOfChars || whiteSpaceObj[wsText = lines[i][cPlusLen]])) {
                    everything.push({type:'in{ws} lookForIn',text:`${text}${wsText || ''}`,i1:i,c1:c,c2:cPlusLen})
                  } else {
                    d('ILLEGAL, (for) is missing `in`')
                  }
                  c += 3

                  if (!recurseBetweenExpression()) { findExpression() }
                  if (i === howManyLines) { break lineLoop }

                  addEnd('end command')

                  if (lines[i][c] === '{') {
                    everything.push({type:'{ for',text:'{',i1:i,c1:c})
                    c++
                    if (!skipThroughEmptyLines()) { break lineLoop }
                  }
                  usingStartOfLineLoop = true
                  continue startOfLineLoop
                }

                if (validName.toLowerCase() === 'else') {
                  everything.splice(spliceStartIndex,0,{type:'else whiteSpace',text:validName,i1:validNameLine,c1:nonWhiteSpaceStart,c2:validNameEnd})
                  if (lines[i][c] === '{') {
                    everything.push({type:'{ else',text:'{',i1:i,c1:c})
                    c++
                    if (!skipThroughEmptyLines()) { break lineLoop }
                  }
                  usingStartOfLineLoop = true
                  continue startOfLineLoop
                }

                everything.splice(spliceStartIndex,0,{type:'command',text:validName,i1:validNameLine,c1:nonWhiteSpaceStart,c2:validNameEnd})
                singleComma = true
                findV1Expression()
                singleComma = false
                if (i === howManyLines) { break lineLoop }
                recurseFindCommaV1Expression(', command whiteSpace')

                addEnd('end command')

                usingStartOfLineLoop = true
                continue startOfLineLoop
                //class
              } else if (idkType === 5) {
                everything.splice(spliceStartIndex,0,{type:'class',text:validName,i1:validNameLine,c1:nonWhiteSpaceStart,c2:validNameEnd})
                const classNameStart = c
                skipValidChar()
                everything.push({type:'className',text:lines[i].slice(classNameStart,c),i1:i,c1:classNameStart,c2:c})
                if (!skipThroughEmptyLines()) { break lineLoop }
                let extendsText
                if ((extendsText = lines[i].slice(c,c + 7)).toLowerCase() === 'extends') {
                  everything.push({type:'className',text:extendsText,i1:i,c1:c,c2:c + 7})
                  c += 7
                  skipThroughWhiteSpaces()
                  const extendedClassNameStart = c
                  skipValidChar()
                  const extendedClassName = lines[i].slice(extendedClassNameStart,c)
                  if (extendedClassName) {
                    everything.push({type:'extendedClassName',text:extendedClassName,i1:i,c1:extendedClassNameStart,c2:c})
                  }
                  if (!skipThroughEmptyLines()) { break lineLoop }
                }
                if (lines[i][c] === '{') {
                  everything.push({type:'{ class',text:'{',i1:i,c1:c})
                  c++
                  if (!skipThroughEmptyLines()) { break lineLoop }
                } else {
                  d('illegal class name',linesPlusChar())
                }
                usingStartOfLineLoop = true
                continue startOfLineLoop
              } else {
                d('this cannot happen because idkType must be in 1,2,3,4,5',linesPlusChar())
              }
            } else if (lines[i][c] === '(') {
              if (idkType === 2) {
                everything.splice(spliceStartIndex,0,{type:'if',text:validName,i1:validNameLine,c1:validNameStart,c2:validNameEnd})
                if (!recurseBetweenExpression()) { findExpression() }
                everything.splice(everything.length - 1,0,{type:'end if'})
                if (i === howManyLines) { break lineLoop }
                if (lines[i][c] === '{') {
                  everything.push({type:'{ if',text:'{',i1:i,c1:c})
                  c++
                  if (!skipThroughEmptyLines()) { break lineLoop }
                }
                usingStartOfLineLoop = true
                continue startOfLineLoop
              }

              const foundWhile = findWhile()
              if (foundWhile === 1) {
                continue startOfLineLoop
              } else if (foundWhile === 2) {
                continue lineLoop
              }

            } else if (lines[i][c] === '{') {
              if (validName.toLowerCase() === 'loop') {
                everything.splice(spliceStartIndex,0,{type:'loop',text:validName,i1:validNameLine,c1:nonWhiteSpaceStart,c2:validNameEnd})
                everything.push({type:'{ loop',text:'{',i1:i,c1:c})
                c++
                if (!skipThroughEmptyLines()) { break lineLoop }
                usingStartOfLineLoop = true
                continue startOfLineLoop
              }
            }

          }
          //can only be from skipThroughEmptyLines()
          if (everything.length === lenghtBeforeSkipLine + 1 || i === howManyLines) {
            //EOL: ???    OR COMMENT ?????
            everything.splice(spliceStartIndex,0,{type:'command EOL or comment',text:validName,i1:validNameLine,c1:nonWhiteSpaceStart,c2:validNameEnd})
            spliceIndexEverythingAtHotkeyLine = everything.length
            // operatorAtHotkeyLine = i
            // i = v1StartLine, c = validNameEnd
            const validNameLowercase = validName.toLowerCase()
            if (elseLoopReturn[validNameLowercase]) {
              if (recurseBetweenExpression()) {
                //ok..
              } else if (validNameLowercase === 'else') {
                if (lines[i][c] === '{') {
                  everything.push({type:'{ else',text:'{',i1:i,c1:c})
                  c++
                  if (!skipThroughEmptyLines()) { break lineLoop }
                }
              } else if (validNameLowercase === 'loop') {
                if (lines[i][c] === '{') {
                  everything.push({type:'{ loop',text:'{',i1:i,c1:c})
                  c++
                  if (!skipThroughEmptyLines()) { break lineLoop }
                }
              }
            } else {
              if (i === howManyLines) { break lineLoop }
              resolveV1Continuation()
              recurseFindCommaV1Expression('command EOL or comment')
              addEnd('end command')
            }

            usingStartOfLineLoop = true
            continue startOfLineLoop
            //end of is statement
          }
        }
        if (i === validNameLine && lines[i][c] === ':' && (c + 1 === numberOfChars || whiteSpaceObj[lines[i][c + 1]])) {
          c++
          const text = lines[i].slice(nonWhiteSpaceStart,c)
          everything.push({type:'label:',text:text,i1:i,c1:nonWhiteSpaceStart,c2:c})
          if (!skipThroughEmptyLines()) { break lineLoop }
          usingStartOfLineLoop = true
          continue startOfLineLoop
        }

      }

      //%which_something%_var:=2 is valid
      //skip through % OR valid variable Chars
      while (c < numberOfChars && (findPercentVar() || variableCharsObj[lines[i][c]])) {
        c++
      }
      if (c === numberOfChars) {
        d('illegal: unexpected EOL after var parsing',char())
        i++
        continue lineLoop
      }
      validName = lines[i].slice(nonWhiteSpaceStart,c)
      validNameEnd = c,validNameLine = i

      lastTrailingWasFunc = false
      if (validName) {
        //#FUNCTION
        /* if (lines[i][c] === '(') {
          let validName = lines[i].slice(nonWhiteSpaceStart, c)
          // d('is not a number, valid func name')
          if (!isNaN(Number(validName))) {
            d('illegal function call on startOfLine: Integer', validName, 'cannot be called')
          }
          //#FUNCTION DEFINITION
          if (isFunctionDefinition()) {
            // d(`${validName}( function( DEFINITION ${char()}`)
            everything.push({ type: 'function( definition', text: `${validName}(`, i1: i, c1: nonWhiteSpaceStart, c2: c + 1 })
            legalObjLine = i
            c++
            variadicAsterisk = true
            let isComma = false
            while (true) {

              skipThroughEmptyLines()
              const funcDefSpliceStartIndex = everything.length
              if (lines[i][c] === ',') {
                c++
                isComma = true
                legalObjLine = i
                skipThroughWhiteSpaces()
              } else {
                if (i !== legalObjLine ) {
                  d('ILLEGAL ) function DEFINITION i !== legalObjLine', char())
                }
              }

              if (c < numberOfChars && variableCharsObj[lines[i][c]]) {
                nonWhiteSpaceStart = c
                c++
                skipValidChar()
                validName = lines[i].slice(nonWhiteSpaceStart, c)

                if (validName.toLowerCase() === 'byref') {
                  everything.push({ type: 'byref', text: `${validName}`, i1: i, c1: nonWhiteSpaceStart, c2: c })
                  skipThroughWhiteSpaces(), nonWhiteSpaceStart = c
                  if (c === numberOfChars || !variableCharsObj[lines[i][c]]) { break }
                  c++, skipValidChar(), validName = lines[i].slice(nonWhiteSpaceStart, c)
                  // d(validName, 'Byref Param', char())
                  everything.push({ type: 'byref param', text: `${validName}`, i1: i, c1: nonWhiteSpaceStart, c2: c })
                } else {
                  // d(validName, 'Param', char())
                  everything.push({ type: 'Param', text: validName, i1: i, c1: nonWhiteSpaceStart, c2: c })
                }
                if (!skipThroughEmptyLines()) { break lineLoop }
                recurseBetweenExpression()

                // }
                if (isComma) {
                  isComma = false
                  everything.splice(funcDefSpliceStartIndex, 0, { type: ', function DEFINITION', text: ',', i1: i, c1: c })
                }
              } else {
                if (isComma) {
                  isComma = false
                  d('ILLEGAL trailling , function DEFINITION', char())
                  everything.splice(funcDefSpliceStartIndex, 0, { type: 'ILLEGAL trailling , function DEFINITION', text: ',', i1: i, c1: c })
                }

                if (lines[i][c] !== ')') {
                  d(`\`${lines[i][c]}\` illegal NOT ) function DEFINITION ${linesPlusChar()}`)
                }
                everything.push({ type: ') function DEFINITION', text: ')', i1: i, c1: c })
                c++
                if (!skipThroughEmptyLines()) { break lineLoop }
                everything.push({ type: '{ function DEFINITION', text: '{', i1: i, c1: c })
                c++
                if (!skipThroughEmptyLines()) { break lineLoop }
                usingStartOfLineLoop = true
                variadicAsterisk = false
                continue startOfLineLoop
              }

            }
            //after break breakThisWhenParenEnd
            everything.push({ type: ') function DEFINITION', text: ')', i1: i, c1: c })
            c++
            if (!skipThroughEmptyLines()) { break lineLoop }
            // d(`{ Function DEFINITION ${char()}`)
            everything.push({ type: '{ function DEFINITION', text: '{', i1: i, c1: c })
            c++
            skipThroughWhiteSpaces()
            variadicAsterisk = false
            usingStartOfLineLoop = true
            continue startOfLineLoop
          }

        } */


        let doAssignmentReturned = doAssignment()
        if (doAssignmentReturned === 1) {
          continue startOfLineLoop
        } else if (doAssignmentReturned === 2) {
          break lineLoop
        }

        recurseFindTrailingExpr()

        //out of lines

        if (i === howManyLines || !skipThroughEmptyLines()) {
          if (lastTrailingWasFunc) {
            everything.splice(spliceStartIndex,0,{type:'functionName',text:validName,i1:validNameLine,c1:validNameStart,c2:validNameEnd})
          }
          break lineLoop
        }

        //#v1 expression
        if (c < numberOfChars && lines[i][c] === '=' && lines[i][c + 1] !== ':' ) {
          everything.splice(spliceStartIndex,0,{type:'var at v1Assignment',text:validName,i1:validNameLine,c1:validNameStart,c2:validNameEnd})
          everything.push({type:'= v1Assignment',text:'=',i1:i,c1:c})
          c++
          v1StartLine = i
          findV1Expression()
          usingStartOfLineLoop = true
          continue startOfLineLoop
        }

        //#ASSIGNMENT
        doAssignmentReturned = doAssignment()
        if (doAssignmentReturned === 1) {
          continue startOfLineLoop
        } else if (doAssignmentReturned === 2) {
          break lineLoop
        }

        if (lastTrailingWasFunc) {
          if (!skipThroughEmptyLines()) {
            everything.splice(spliceStartIndex,0,{type:'functionName',text:validName,i1:validNameLine,c1:validNameStart,c2:validNameEnd})
            break lineLoop
          }
          if (lines[i][c] === '{') {
            everything.splice(spliceStartIndex,0,{type:'function DEFINITION name',text:validName,i1:validNameLine,c1:validNameStart,c2:validNameEnd})

            if (funcParenStartIndex === spliceStartIndex) {
              b = funcParenStartIndex + 1
              everything[b++].type = '( function DEFINITION'
              let canBeParam = true
              let next
              outerLoop:
              while (true) {
                next = bSkipEmptyTextOrWs()
                if (next.type === ', function CALL') {
                  next.type = ', function DEFINITION'
                  b++
                  canBeParam = true
                  continue outerLoop
                } else if (next.type === ') function CALL') {
                  break outerLoop
                } else if (canBeParam && next.type === 'idkVariable') {
                  if (next.text.toLowerCase() === 'byref') {
                    next.type = 'byref'
                    b++
                    next = bConcatToWsSkipEmptyTextOrWs()
                  }
                  next.type = 'Param'
                  b++
                  next = bSkipEmptyTextOrWs()
                  if (next.type === '1operator') {
                    if (next.text === '*') {
                      next.type = '* variadic Argument'
                    } else if (next.text === '=') {
                      next.type = '= v1Assignment'
                    }
                  }
                }

                let arrAccessDepth = 1
                while (true) {
                  const bType = next.type
                  if (arrAccessDepth) {
                    if (bType === ') function CALL') {
                      arrAccessDepth--
                    } else if (bType === '( function CALL') {
                      arrAccessDepth++
                    }
                    if (arrAccessDepth === 0) {
                      break outerLoop
                    } else if (arrAccessDepth === 1 && bType === ', function CALL') {
                      b++
                      canBeParam = true
                      continue outerLoop
                    }
                  }
                  next = everything[++b]
                }
              }
              next.type = ') function DEFINITION'
            } else {
              d('illegal: { but not function DEFINITION',linesPlusChar())
            }
            /* if (lastTrailingWasFunc === 2) {
              d('illegal function definition for a METHOD',linesPlusChar())
            } */

            // d(everything[everything.length - 2])

            everything.push({type:'{ function DEFINITION',text:'{',i1:i,c1:c})
            c++
            if (!skipThroughEmptyLines()) { break lineLoop }
            usingStartOfLineLoop = true
            continue startOfLineLoop
            // if (everything[spliceStartIndex])
          }


          everything.splice(spliceStartIndex,0,{type:'functionName',text:validName,i1:validNameLine,c1:validNameStart,c2:validNameEnd})
          if (skipCommaV2Expr()) {break lineLoop}
          usingStartOfLineLoop = true
          continue startOfLineLoop
        }


      }
      //only for ++var or --var
      const doAssignmentReturned = doAssignment()
      if (doAssignmentReturned === 1) {
        continue startOfLineLoop
      } else if (doAssignmentReturned === 2) {
        break lineLoop
      }

      //#HOTKEYS
      //skip first character to avoid matching ::, empty hotkey, or not matching :::, colon hotkey, because it matched only the first 2
      //skip ONLY if c is nonWhiteSpaceStart, which is first char
      c = (c === nonWhiteSpaceStart) ? c + 1 : c
      //advance until ':'
      while (c < numberOfChars) {
        if (lines[i][c] === ':') {
          c++
          if (c < numberOfChars && lines[i][c] === ':') {
            c++
            const hotkey = lines[i].slice(nonWhiteSpaceStart,c)
            if (i === operatorAtHotkeyLine) {
              if (spliceIndexEverythingAtHotkeyLine !== false) {
                everything.splice(spliceIndexEverythingAtHotkeyLine)
              }
            }
            everything.push({type:'hotkey',text:hotkey,i1:i,c1:nonWhiteSpaceStart,c2:c})
            const replacementChar = lines[i][c]
            const cPlueOne = c + 1
            if (replacementChar && !whiteSpaceObj[replacementChar] && (cPlueOne === numberOfChars || whiteSpaceObj[lines[i][cPlueOne]])) {
              everything.push({type:'hotkey replacementChar',text:replacementChar,i1:i,c1:c})
              c++
            }
            if (!skipThroughEmptyLines()) { break lineLoop }
            //hmmm
            usingStartOfLineLoop = true
            continue startOfLineLoop
            //label
            // L:L: is a legal label because IsLabel("L:L")==1
          } else if (c === numberOfChars || whiteSpaceObj[lines[i][c]]) {
            const text = lines[i].slice(nonWhiteSpaceStart,c)
            everything.push({type:'label:',text:text,i1:i,c1:nonWhiteSpaceStart,c2:c})
            if (!skipThroughEmptyLines()) { break lineLoop }
            usingStartOfLineLoop = true
            continue startOfLineLoop
          }
        }
        c++
      }
      //startOfLineLoop: label END
      //straight down or smaller loop
      if (usingStartOfLineLoop) {
        usingStartOfLineLoop = false
        continue lineLoop
      } else {
        break startOfLineLoop
      }
    }
    //end of lineLoop
    d('end of lineLoop')
    // return everything
    // everything.push({type: 'end of lineLoop', text:'\n',i1: i, c1:c})
    i++
    continue lineLoop
  }
  // d(everything)
  // toFile = toFile.slice(1)
  // writeSync(toFile)

  if (everything.length) {
    const lastIndex = everything.length - 1,lastEverything = everything[lastIndex]
    if (lastEverything.i1 && lastEverything.i1 + 1 === howManyLines && lastEverything.text === '\n') {
      everything.splice(lastIndex,1)
    }
  }

  return everything

  // start of functions
  function addEnd(eType: string) {
    const eLen = everything.length - 1
    everything.splice(everything.length - (emptyLinesObj[everything[eLen].type] ? 1 : 0),0,{type:eType})
  }
  function bConcatToWsSkipEmptyTextOrWs() {
    while (true) {
      const next = everything[b]
      if (!next.text) {
        b++
        continue
      } else if (next.type === 'concat') {
        next.type = 'whiteSpaces'
        b++
        continue
      } else if (wsOrEmptyLine[next.type]) {
        b++
        continue
      } else {
        return next
      }
    }
  }
  function bSkipEmptyTextOrWs() {
    while (true) {
      const next = everything[b]
      if (!next.text) {
        b++
        continue
      } else if (wsOrEmptyLine[next.type]) {
        b++
        continue
      } else {
        return next
      }
    }
  }
  function doAssignment() {
    const assignmentOperatorReturnValue = findAssignmentOperators()
    if (assignmentOperatorReturnValue === 1) {
      everything.splice(spliceStartIndex,0,{type:'assignment',text:validName,i1:validNameLine,c1:validNameStart,c2:validNameEnd})
      const legalExprLine = i
      maybePercentV1ToV2()
      if (!recurseBetweenExpression()) {
        if (i === legalExprLine) {
          findExpression()
        }
      }
      addEnd('end assignment')
      if (skipCommaV2Expr()) {return 2}
      usingStartOfLineLoop = true
      return 1
    }
  }
  function functionMid(which: string) {
    const parenStartIndex = everything.length
    const back = everything[everything.length - 1]

    everything.push({type:`( ${which} CALL`,text:'(',i1:i,c1:c})
    legalObjLine = i
    lineWhereCanConcat = -1
    c++
    let isComma
    while (true) {

      if (!skipThroughEmptyLines()) {
        d(`ILLEGAL ) ${which} CALL OUT OF LINES`,char())
        return 2
      } else if (lines[i][c] === ',') {
        c++
        isComma = true
        legalObjLine = i
        lineWhereCanConcat = -1
      } else {
        if (i !== legalObjLine ) {
          d(`ILLEGAL ) ${which} CALL i !== legalObjLine`,char())
        }
      }

      const arrSpliceStartIndex = everything.length
      if (recurseBetweenExpression() || findExpression()) {
        if (isComma) {
          isComma = false
          everything.splice(arrSpliceStartIndex,0,{type:`, ${which} CALL`,text:',',i1:i,c1:c})
        }
        if (i === howManyLines) {
          return 2
        }
      } else {
        if (lines[i][c] === ',') {
          everything.splice(arrSpliceStartIndex,0,{type:`, ${which} CALL`,text:',',i1:i,c1:c})
          continue
        }

        if (isComma) {
          isComma = false
          d(`ILLEGAL trailling , ${which} CALL`,char())
          everything.splice(arrSpliceStartIndex,0,{type:`ILLEGAL trailling , ${which} CALL`,text:',',i1:i,c1:c})
        }

        if (lines[i][c] !== ')') {
          d(`\`${lines[i][c]}\` illegal NOT ) ${which} CALL ${linesPlusChar()}`)
        }
        everything.push({type:`) ${which} CALL`,text:')',i1:i,c1:c})
        c++

        //this happens after everything INSIDE the function, so this has the last word on lastTrailingWasFunc
        lastTrailingWasFunc = true
        funcParenStartIndex = parenStartIndex
        if (back) {
          if (back.type === 'idkVariable') {
            back.type = 'functionName'
          } else if (back.type === '(.) property findTrailingExpr') {
            back.type = 'functionName'
            // lastTrailingWasFunc = 2
          }
        }
        lineWhereCanConcat = i
        return 1
      }

    }
  }
  function recurseFindCommaV1Expression(which: string) {
    if (findCommaV1Expression(which)) {
      if (i === howManyLines) {return false}
      while (findCommaV1Expression(which)) {
        if (i === howManyLines) {return false}
      }
      return true
    }
  }
  function findCommaV1Expression(which: string) {
    if (lines[i][c] === ',') {
      everything.push({type:which,text:',',i1:i,c1:c})
      c++
      singleComma = true
      findV1Expression()
      singleComma = false
      return true
    }
  }
  function doUntil() {
    if (!recurseBetweenExpression()) { findExpression() }
    if (i < howManyLines) {
      if (lines[i][c] === ',') {
        everything.push({type:', doUntil',text:',',i1:i,c1:c})
        c++
        skipThroughEmptyLines()
      }
    }
  }
  function doThrow() {
    if (!recurseBetweenExpression()) { findExpression() }
    //this is, NOT while
    if (i < howManyLines) {
      if (lines[i][c] === ',') {
        everything.push({type:', doThrow',text:',',i1:i,c1:c})
        c++
        skipThroughEmptyLines()
      }
    }
  }
  function doReturn() {
    // for `return % this.dropRight(l_array)`
    maybePercentV1ToV2()
    if (!recurseBetweenExpression()) { findExpression() }
    //this is, NOT while
    if (i < howManyLines) {
      if (lines[i][c] === ',') {
        everything.push({type:', doReturn',text:',',i1:i,c1:c})
        c++
        skipThroughEmptyLines()
      }
    }
  }
  //true if out of lines
  function skipCommaV2Expr() {
    while (i < howManyLines) {
      if (lines[i][c] !== ',') {
        return false
      }
      everything.push({type:', assignment',text:',',i1:i,c1:c})
      c++
      if (!recurseBetweenExpression()) { findExpression() }
      addEnd('end assignment')
    }
    return true
  }
  function skipCommaAssignment() {
    while (i < howManyLines) {
      if (lines[i][c] !== ',') {
        return false
      }
      everything.push({type:', assignment',text:',',i1:i,c1:c})
      c++
      findVariableName()
      recurseBetweenExpression()
    }
    return true
  }
  function findVariableName() {
    //if whiteSpace in v1String, then illegal var Name
    findingVarName = true
    skipThroughWhiteSpaces()
    nonWhiteSpaceStart = c
    findV1ExpressionMid()
  }
  function sameCommaOrWhitespaceCommand() {
    const foundNamedIf = findNamedIf()
    if (foundNamedIf) { return foundNamedIf }

    const foundLoop = findLoop()
    if (foundLoop) { return foundLoop }

    const foundWhile = findWhile()
    if (foundWhile) { return foundWhile }

    const foundSendMessage = findSendMessage()
    if (foundSendMessage) { return foundSendMessage }

    if (validName.toLowerCase() === 'return') {
      everything.splice(spliceStartIndex,0,{type:'return',text:validName,i1:validNameLine,c1:nonWhiteSpaceStart,c2:validNameEnd})
      doReturn()
      usingStartOfLineLoop = true
      return 1
    }

    if (validName.toLowerCase() === 'throw') {
      everything.splice(spliceStartIndex,0,{type:'throw',text:validName,i1:validNameLine,c1:nonWhiteSpaceStart,c2:validNameEnd})
      doThrow()
      usingStartOfLineLoop = true
      return 1
    }

    if (validName.toLowerCase() === 'until') {
      everything.splice(spliceStartIndex,0,{type:'until',text:validName,i1:validNameLine,c1:nonWhiteSpaceStart,c2:validNameEnd})
      doUntil()
      usingStartOfLineLoop = true
      return 1
    }
  }
  function findWhile() {
    if (validName.toLowerCase() === 'while') {
      everything.splice(spliceStartIndex,0,{type:'while',text:validName,i1:validNameLine,c1:nonWhiteSpaceStart,c2:validNameEnd})

      if (!recurseBetweenExpression()) { findExpression() }

      if (i === howManyLines) { return 2 }

      if (lines[i][c] === '{') {
        everything.push({type:'{ loop',text:'{',i1:i,c1:c})
        c++
        if (!skipThroughEmptyLines()) { return 2 }
      }
      usingStartOfLineLoop = true
      return 1
    }
  }
  function findLoop() {
    if (validName.toLowerCase() === 'loop') {
      everything.splice(spliceStartIndex,0,{type:'loop',text:validName,i1:validNameLine,c1:nonWhiteSpaceStart,c2:validNameEnd})
      if (!skipThroughEmptyLines()) { return 2 }
      if (variableCharsObj[lines[i][c]]) {

        breakToGoFindV1Expression:
        while (true) {
          let text,cPlusLen
          if ((text = lines[i].slice(c,cPlusLen = c + 3)).toLowerCase() === 'reg' && !variableCharsObj[lines[i][cPlusLen]]) {
            everything.push({type:'(loop) Reg',text:text,i1:i,c1:c,c2:cPlusLen})
            c += 3
            if (!skipThroughEmptyLines()) { return 2 }
            if (findCommaV1Expression(', 1 (loop) Reg')) {
              findCommaV1Expression(', 2 (loop) Reg')
            }
          } else if ((text = lines[i].slice(c,cPlusLen = c + 4)).toLowerCase() === 'files' && !variableCharsObj[lines[i][cPlusLen]]) {
            everything.push({type:'(loop) read',text:text,i1:i,c1:c,c2:cPlusLen})
            c += 4
            if (!skipThroughEmptyLines()) { return 2 }
            if (findCommaV1Expression(', 1 (loop) read')) {
              findCommaV1Expression(', 2 (loop) read')
            }
          } else if ((text = lines[i].slice(c,cPlusLen = c + 5)).toLowerCase() === 'files' && !variableCharsObj[lines[i][cPlusLen]]) {
            everything.push({type:'(loop) files',text:text,i1:i,c1:c,c2:cPlusLen})
            c += 5
            if (!skipThroughEmptyLines()) { return 2 }
            if (findCommaV1Expression(', 1 (loop) files')) {
              findCommaV1Expression(', 2 (loop) files')
            }
          } else if ((text = lines[i].slice(c,cPlusLen = c + 5)).toLowerCase() === 'parse' && !variableCharsObj[lines[i][cPlusLen]]) {
            everything.push({type:'(loop) parse',text:text,i1:i,c1:c,c2:cPlusLen})
            c += 5
            if (!skipThroughEmptyLines()) { return 2 }
            if (findCommaV1Expression(', 1 (loop) parse')) {
              if (findCommaV1Expression(', 2 (loop) parse')) {
                findCommaV1Expression(', 3 (loop) parse')
              }
            }
          } else {
            break breakToGoFindV1Expression
          }

          if (lines[i][c] === '{') {
            everything.push({type:'{ loop',text:'{',i1:i,c1:c})
            c++
            if (!skipThroughEmptyLines()) { return 2 }
          }
          usingStartOfLineLoop = true
          return 1

        }

      }

      if (lines[i][c] === '{') {
        everything.push({type:'{ loop',text:'{',i1:i,c1:c})
        c++
        if (!skipThroughEmptyLines()) { return 2 }
        usingStartOfLineLoop = true
        return 1
      }

      singleComma = true
      findV1Expression()
      singleComma = false
      if (findCommaV1Expression(', 1 (loop) idk')) {
        if (findCommaV1Expression(', 2 (loop) idk')) {
          findCommaV1Expression(', 3 (loop) idk')
        }
      }

      if (lines[i][c] === '{') {
        everything.push({type:'{ loop',text:'{',i1:i,c1:c})
        c++
        if (!skipThroughEmptyLines()) { return 2 }
      }
      usingStartOfLineLoop = true
      return 1
    }
  }
  function findSendMessage() {
    if (validName.toLowerCase() === 'sendmessage') {
      everything.splice(spliceStartIndex,0,{type:'sendmessage',text:validName,i1:validNameLine,c1:nonWhiteSpaceStart,c2:validNameEnd})

      maybePercentV1ToV2()
      if (!recurseBetweenExpression()) { findExpression() }
      if (findCommaV2ExprMaybePercent(', 2 sendmessage')) {
        if (findCommaV2ExprMaybePercent(', 3 sendmessage')) {
          recurseFindCommaV1Expression(', sendmessage v1Expr')
        }
      }
      return 1
    }
  }
  function findCommaV2ExprMaybePercent(which: string) {
    if (lines[i][c] === ',') {
      everything.push({type:which,text:',',i1:i,c1:c})
      c++
      maybePercentV1ToV2()
      if (!recurseBetweenExpression()) { findExpression() }
      return true
    }
  }
  function maybePercentV1ToV2() {
    skipThroughWhiteSpaces()
    let whiteSpaceText
    if (c < numberOfChars - 1 && lines[i][c] === '%' && whiteSpaceObj[whiteSpaceText = lines[i][c + 1]]) {
      everything.push({type:'% v1->v2 expr',text:`%${whiteSpaceText}`,i1:i,c1:c,c2:c + 2})
      c += 2
      lineWhereCanConcat = -1
    }
  }
  function findCommaV2Expr(which: string) {
    if (lines[i][c] === ',') {
      everything.push({type:which,text:',',i1:i,c1:c})
      c++
      if (!recurseBetweenExpression()) { findExpression() }
      return true
    }
  }
  //ifEqual
  function findNamedIf() {
    if (namedIf[validName.toLowerCase()]) {
      everything.splice(spliceStartIndex,0,{type:'named if',text:validName,i1:validNameLine,c1:nonWhiteSpaceStart,c2:validNameEnd})
      skipThroughWhiteSpaces()
      singleComma = true
      findV1ExpressionMid()
      everything.push({type:', 1 namedIf',text:',',i1:i,c1:c})
      c++
      singleComma = false
      maybePercentV1ToV2()
      if (!recurseBetweenExpression()) { findExpression() }
      if (lines[i][c] === ',') {
        everything.push({type:', 2 namedIf',text:',',i1:i,c1:c})
        c++
        // oof, command here
        skipThroughWhiteSpaces()
        nonWhiteSpaceStart = c
        skipValidChar()
        validName = lines[i].slice(nonWhiteSpaceStart,c)
        const idkType = typeOfValidVarName[validName.toLowerCase()]
        //if is command
        //though global or local.. , they CAN count as commands..
        if (idkType) {
          c = nonWhiteSpaceStart
          usingStartOfLineLoop = true
          return 1
        } else {
          c = nonWhiteSpaceStart
          findV1Expression()
          return 2
        }

      } else {
        if (!skipThroughEmptyLines()) { return 2 }
        if (lines[i][c] === '{') {
          everything.push({type:'{ namedIf',text:'{',i1:i,c1:c})
          c++
        }
        findV1Expression()
        return 2
      }
    }
  }
  /* function lookForIn(which: string) {
    if (lookingForIn) {
      let text, cPlusLen, wsText
      if ((text = lines[i].slice(c, cPlusLen = c + 2)).toLowerCase() === 'in' && (cPlusLen === numberOfChars || whiteSpaceObj[wsText = lines[i][cPlusLen]])) {
        lookingForIn = false
        endV1Str(which)
        everything.push({ type: `in{ws} lookForIn ${which}`, text: `${text}${wsText || ''}`, i1: i, c1: c, c2: cPlusLen })
        c += 3
        v1ExpressionC1 = c, cNotWhiteSpace = c - 1
        return true
      }
    }
  } */
  function lookForAnd(which: string) {
    if (lookingForAnd) {
      let text,cPlusLen,wsText
      if ((text = lines[i].slice(c,cPlusLen = c + 3)).toLowerCase() === 'and' && (cPlusLen === numberOfChars || whiteSpaceObj[wsText = lines[i][cPlusLen]])) {
        lookingForAnd = false
        endV1Str(which)
        everything.push({type:`legacyIf and{ws} ${which}`,text:`${text}${wsText || ''}`,i1:i,c1:c,c2:cPlusLen})
        c += 4
        v1ExpressionC1 = c,cNotWhiteSpace = c - 1
        return true
      }
    }
  }
  function beforeCommaV1Str(which: string) {
    const text = lines[i].slice(v1ExpressionC1,cNotWhiteSpace)
    if (text) {
      everything.push({type:`v1String ${which}`,text:text,i1:i,c1:v1ExpressionC1,c2:cNotWhiteSpace})
    }
  }
  function endV1Str(which: string) {
    const cEndOfV1Expression = cNotWhiteSpace + 1
    const text = lines[i].slice(v1ExpressionC1,cEndOfV1Expression)
    if (text) {
      everything.push({type:`v1String ${which}`,text:text,i1:i,c1:v1ExpressionC1,c2:cEndOfV1Expression})
    }

    const endingWhiteSpaces = lines[i].slice(cEndOfV1Expression,c)
    // d('endingWhiteSpaces v1Expression', `\`${endingWhiteSpaces}\` ${endingWhiteSpaces.length}LENGTH`)
    if (endingWhiteSpaces) {
      everything.push({type:`endingWhiteSpaces v1Expression ${which}`,text:endingWhiteSpaces,i1:i,c1:cEndOfV1Expression,c2:c})
    }
  }
  function ifDoubleComma() {
    if (doubleComma) {
      if (lines[i][c] === ',') {
        insideDoubleComma()
        return true
      }
    }
  }
  function insideDoubleComma() {
    if (lines[i][c + 1] === ',') {
      everything.push({type:',, legacyIf var in',text:',,',i1:i,c1:c,c2:c + 2})
      c += 2
      findV1Expression()
    } else {
      everything.push({type:', legacyIf var in',text:',',i1:i,c1:c})
      c++
      findV1Expression()
    }
  }
  function ws() {
    d(`\`${lines[i].slice(nonWhiteSpaceStart,c)}\``)
  }
  function applyRangeReplacements() {
    //reverse iterate to not change [c,i]
    const linesCopy = lines.slice()
    replaceRangesLoop:
    for (let i = rangeAndReplaceTextArr.length - 1; i > -1; i--) {
      const [[[c1,i1],[c2,i2]],replacementText] = rangeAndReplaceTextArr[i]
      const textArr = replacementText.split('\n')
      // const textArr = ['test1']
      // textArr.push('test1')
      // textArr.push('TEST2')
      // textArr.push('TESTT3')
      // textArr.push('test4')
      // const textArr = ['test1','TEST2','TESTT3','test4']
      const replaceLength = textArr.length
      const sourceLength = i2 - i1 + 1

      // d('///////////////////////////////////////////////')
      // d('///////////////////////////////////////////////')
      // d(linesCopy[i1].slice(0,c1))

      //nothing to replace with, not even empty string
      // [] != [""]
      if (!replaceLength) {
        continue replaceRangesLoop
      }

      //nowhere to replace
      if (sourceLength < 1) {
        continue replaceRangesLoop
      }

      //same replacementLines as existing
      if (replaceLength === sourceLength) {
        //all on same line
        if (sourceLength === 1) {
          linesCopy[i1] = linesCopy[i1].slice(0,c1) + textArr[0] + linesCopy[i1].slice(c2)
          // d(linesCopy.join('\n'))
          continue replaceRangesLoop
        } else if (sourceLength === 2) {
          linesCopy[i1] = linesCopy[i1].slice(0,c1) + textArr[0]
          linesCopy[i2] = textArr[1] + linesCopy[i2].slice(c2)
          // d(linesCopy.join('\n'))
          continue replaceRangesLoop
        } else if (sourceLength > 2) {
          linesCopy[i1] = linesCopy[i1].slice(0,c1) + textArr[0]
          for (let n = 1; n < replaceLength - 1; n++) {
            linesCopy[i1 + n] = textArr[n]
          }
          linesCopy[i2] = textArr[replaceLength - 1] + linesCopy[i2].slice(c2)
          d(linesCopy.join('\n'))
          continue replaceRangesLoop
        }
      }

      //more lines than existing
      if (replaceLength > sourceLength) {
        //if source all on same line
        if (sourceLength === 1) {
          //save right slice because we gon delete it
          //I'm using i1 instead of i2 to show that they are on the same line
          const rightSlice = linesCopy[i1].slice(c2)
          linesCopy[i1] = linesCopy[i1].slice(0,c1) + textArr[0]
          // DOCS: arr.splice(start, deleteCount, item1_
          // arr[start] becomes item1
          // what was arr[start] is now at start+1
          // so we insert to start+1
          for (let n = 1,len = replaceLength - 1; n < len; n++) {
            // d('loop',n)
            linesCopy.splice(i1 + n,0,textArr[n])
          }
          // d(linesCopy[i1])
          // d(linesCopy[i1 + 1])
          // d(linesCopy[i1 + 2])
          // this is the last line
          linesCopy.splice(i1 + 1,0,textArr[replaceLength - 1] + rightSlice)

          // d(linesCopy[i1])
          // d(linesCopy[i1 + 1])
          // d(linesCopy[i1 + 2])
          continue replaceRangesLoop
          //only 2 lines
          //startSlice and endSlice are on different lines
          //so we don't need to save rightSlice
          //but we don't want to insert above
          //before insert below: below would be
          //moved
          //do it in reverse
        } else if (sourceLength === 2) {
          // this is the last line
          linesCopy[i2] = textArr[replaceLength - 1] + linesCopy[i2].slice(c2)
          for (let n = 1,len = replaceLength - 1; n < len; n++) {
            linesCopy.splice(i1 + n,0,textArr[n])
          }
          // first line
          linesCopy[i1] = linesCopy[i1].slice(0,c1) + textArr[0]
          // d(linesCopy[i1])
          // d(linesCopy[i1 + 1])
          // d(linesCopy[i1 + 2])
          continue replaceRangesLoop
          //start replacing inbetwwn lines, then insert lines
        } else if (sourceLength > 2) {
          // this is the last line
          linesCopy[i2] = textArr[replaceLength - 1] + linesCopy[i2].slice(c2)
          const middlePointReplaceInsert = replaceLength - sourceLength + 1
          //replace lines
          for (let n = 1; n < middlePointReplaceInsert; n++) {
            linesCopy[i1 + n] = textArr[n]
          }
          //insert
          for (let n = middlePointReplaceInsert,len = replaceLength - 1; n < len; n++) {
            linesCopy.splice(i1 + n,0,textArr[n])
          }
          // d(linesCopy.join('\n'))
          linesCopy[i1] = linesCopy[i1].slice(0,c1) + textArr[0]
          // d(linesCopy.join('\n'))
          continue replaceRangesLoop
        }
      }

      //less lines than existing, remove lines
      //replaceLength is at least 1
      //so sourceLength must be at least 2
      //so no "on the same line stuff"
      if (replaceLength < sourceLength) {
        //lets start how does 2 become 1 line
        if (replaceLength === 1) {
          // replace the first line and remove the rest
          linesCopy[i1] = linesCopy[i1].slice(0,c1) + textArr[0] + linesCopy[i2].slice(c2)
          //remove line
          //DOCS: arr.splice(start, deleteCount)
          linesCopy.splice(i1 + 1,sourceLength - replaceLength)
          // d(linesCopy.join('\n'))
          continue replaceRangesLoop
          //how does 3 become 2 lines ? or 1 ?
          //first how does 3 become 1 line ?
        } else if (replaceLength > 1) {
          //first line
          linesCopy[i1] = linesCopy[i1].slice(0,c1) + textArr[0]
          //last line
          linesCopy[i2] = textArr[replaceLength - 1] + linesCopy[i2].slice(c2)
          //remove between
          linesCopy.splice(i1 + 1,sourceLength - 2)
          //add between
          // d(linesCopy.join('\n'))
          // insert
          for (let n = 1,len = replaceLength - 1; n < len; n++) {
            linesCopy.splice(i1 + n,0,textArr[n])
          }
          // d(linesCopy.join('\n'))
          continue replaceRangesLoop
        }

      }
      d(`This should not happen: sourceLength${sourceLength}, replaceLength${replaceLength}`)
    }
    return linesCopy
  }



  function textFromPosToCurrent(startPos: [number,number]) {
    const [strStartPos,strStartLine] = startPos
    if (strStartLine === i) {
      return lines[i].slice(strStartPos,c)
    } else {
      let strToPrint = lines[strStartLine].slice(strStartPos)
      for (let i2 = strStartLine + 1; i2 < i; i2++) {
        strToPrint += `\n${lines[i2]}`
      }
      strToPrint += `\n${lines[i].slice(0,c)}`
      return strToPrint
    }
  }
  function isFunctionDefinition() {
    const iBak = i,cBak = c,numberOfCharsBak = numberOfChars
    let toReturn: boolean | number = false
    //after next ')'
    if (skipThroughFindChar(')')) {
      c++
      // if (skipThroughEmptyLines()) {
      iCantDirectlyReturn:
      while (i < howManyLines) {
        while (c < numberOfChars && whiteSpaceObj[lines[i][c]]) {
          c++
        }
        if (c === numberOfChars) {
          //comment: next line
        } else if (lines[i][c] === ';' && (c === 0 || whiteSpaceObj[lines[i][c - 1]])) {
          // d('comment while skipThroughEmptyLines', char())
        } else if (lines[i][c] === '{') {
          //is the next char '{' ?
          toReturn = true
          break iCantDirectlyReturn
        } else {
          break iCantDirectlyReturn
        }
        i++
        if (i < howManyLines) {
          c = 0,numberOfChars = lines[i].length
        } else {
          break iCantDirectlyReturn
        }
      }

      // }
    } else {
      //haven't found closing )
      d('illegal: haven\'t found closing ) isFunctionDefinition',char())
      toReturn = 2
    }
    i = iBak,c = cBak,numberOfChars = numberOfCharsBak
    //default return false
    return toReturn
  }
  function findV1StrMid(which: string) {
    if (lookForAnd(which)) {
      findV1StrMid(which)
      return false
    }

    if (i === v1StartLine) {
      while (c < numberOfChars && !whiteSpaceObj[lines[i][c]]) {
        cNotWhiteSpace = c

        if (doubleComma) {
          if (lines[i][c] === ',') {
            beforeCommaV1Str(`${which} beforeDoubleComma`)
            if (lines[i][c + 1] === ',') {
              everything.push({type:',, legacyIf var in findV1Expression',text:',,',i1:i,c1:c,c2:c + 2})
              c += 2
            } else {
              everything.push({type:', legacyIf var in findV1Expression',text:',',i1:i,c1:c})
              c++
            }
            v1ExpressionC1 = c,cNotWhiteSpace = c - 1
            continue
          }
        } else if (singleComma && !insideV1Continuation) {
          if (lines[i][c] === ',' && lines[i][c - 1] !== '`') {
            beforeCommaV1Str(`${which} beforeSingleComma`)
            v1ExpressionC1 = c,cNotWhiteSpace = c - 1
            return true
          }
        }

        if (findPercentVarV1Expression()) {
          c++; v1ExpressionC1 = c; continue
        }
        c++
      }
    } else {
      while (c < numberOfChars && !whiteSpaceObj[lines[i][c]]) {
        cNotWhiteSpace = c

        if (lines[i][c] === ':') {
          operatorAtHotkeyLine = i
          return true
        }

        if (doubleComma) {
          if (lines[i][c] === ',') {
            beforeCommaV1Str(`${which} beforeDoubleComma`)
            if (lines[i][c + 1] === ',') {
              everything.push({type:',, legacyIf var in findV1Expression',text:',,',i1:i,c1:c,c2:c + 2})
              c += 2
            } else {
              everything.push({type:', legacyIf var in findV1Expression',text:',',i1:i,c1:c})
              c++
            }
            v1ExpressionC1 = c,cNotWhiteSpace = c - 1
            continue
          }
        } else if (singleComma && !insideV1Continuation) {
          if (lines[i][c] === ',' && lines[i][c - 1] !== '`') {
            beforeCommaV1Str(`${which} beforeSingleComma`)
            v1ExpressionC1 = c,cNotWhiteSpace = c - 1
            return true
          }
        }

        if (findPercentVarV1Expression()) {
          c++; v1ExpressionC1 = c; continue
        }
        c++
      }
    }

    while (c < numberOfChars && whiteSpaceObj[lines[i][c]]) {
      c++
    }
  }
  function findV1Expression() {
    skipThroughWhiteSpaces()

    let whiteSpaceText
    if (c < numberOfChars - 1 && lines[i][c] === '%' && whiteSpaceObj[whiteSpaceText = lines[i][c + 1]]) {
      everything.push({type:'% v1->v2 expr',text:`%${whiteSpaceText}`,i1:i,c1:c,c2:c + 2})
      c += 2
      lineWhereCanConcat = -1
      if (!recurseBetweenExpression()) { findExpression() }
      return true
    }

    findV1ExpressionMid()
    return true
  }
  function findV1ExpressionMid() {
    if (findingVarName) {
      findIdkVar()
      resolveV1Continuation()
      findingVarName = false
      return
    } else {
      v1ExpressionC1 = c,cNotWhiteSpace = c - 1

      foundComment:
      while (true) {
        if (lines[i][c] === ';') {
          if (whiteSpaceObj[lines[i][c - 1]]) {
            break foundComment
          }
        }
        while (c < numberOfChars) {
          if (lines[i][c] === ';') {
            break foundComment
          }
          if (findV1StrMid('findV1Expression')) {
            return
          }
        }
        break
      }
      endV1Str('findV1Expression')
      //now expect continuation
      resolveV1Continuation()
    }
  }
  function resolveV1Continuation() {
    if (!skipThroughEmptyLines()) {
      return false
    }
    if (lines[i][c] === undefined) {
      d('this shouldn\'t happen resolveV1Continuation lines[i][c] === undefined')
    }
    if (lines[i][c] === '(') {
      insideV1Continuation = true
      everything.push({type:'( resolveV1Continuation',text:'(',i1:i,c1:c})
      c++
      const text = lines[i].slice(c,numberOfChars)
      everything.push({type:'resolveV1Continuation to EOL',text:text,i1:i,c1:c,c2:numberOfChars})

      while (++i < howManyLines) {
        everything.push({type:'newline resolveV1Continuation',text:'\n',i1:i,c1:numberOfChars})
        c = 0,numberOfChars = lines[i].length

        const c1 = c
        // inside continuation, whiteSpaces to the left do count
        while (c < numberOfChars && whiteSpaceObj[lines[i][c]]) {
          c++
        }

        if (lines[i][c] === ')') {
          insideV1Continuation = false
          const whiteSpacesText = lines[i].slice(c1,c)
          if (whiteSpacesText) {
            everything.push({type:'whiteSpaces before ) resolveV1Continuation',text:whiteSpacesText,i1:i,c1:c1,c2:c})
          }
          everything.push({type:') resolveV1Continuation',text:')',i1:i,c1:c})
          c++

          findV1ExpressionMid()

          return true
        }

        v1ExpressionC1 = 0,cNotWhiteSpace = -1
        while (c < numberOfChars) {
          findV1StrMid('resolveV1Continuation')
        }
        endV1Str('resolveV1Continuation')
      }

      return true
    } else if (!findingVarName) {
      if (c < numberOfChars - 2 && v1Continuator[lines[i].slice(c,c + 3)]) {
        everything.push({type:'3 v1Continuator',text:lines[i].slice(c,c + 3),i1:i,c1:c,c2:c + 3})
        c += 3
      } else if (c < numberOfChars - 1 && v1Continuator[lines[i].slice(c,c + 2)]) {
        everything.push({type:'2 v1Continuator',text:lines[i].slice(c,c + 2),i1:i,c1:c,c2:c + 2})
        c += 2
      } else if (c < numberOfChars && v1Continuator[lines[i][c]]) {
        if (ifDoubleComma()) {return false}
        if (singleComma) {return false}

        everything.push({type:'1 v1Continuator',text:lines[i][c],i1:i,c1:c})

        c++
      } else {
        return false
      }
      //if found v1Continuator, continue looking

      //well, there may only be 1 v1 continuator
      spliceIndexEverythingAtHotkeyLine = everything.length - 1
      findV1Expression()
      return false
    }


  }
  //true if found, false if not found
  function findAssignmentOperators() {
    //#VARIABLE ASSIGNMENT
    const toReturn = 1
    let text
    dummyLoop:
    while (true) {

      if (lines[i][c + 3] === ':') {
        return 2
      } else {
        if (c < numberOfChars - 2 && assignmentOperators[text = lines[i].slice(c,c + 3)]) {
          // d(lines[i].slice(c, c + 3), '3operator', char())
          everything.push({type:'3operator',text:text,i1:i,c1:c,c2:c + 3})
          c += 3
          break dummyLoop
        }

        if (lines[i][c + 2] === ':') {
          return 2
        } else {
          if (c < numberOfChars - 1 && assignmentOperators[text = lines[i].slice(c,c + 2)]) {
            // if (text === '++' || text === '--') {
            //allow empty assignment
            // }
            everything.push({type:'2operator',text:text,i1:i,c1:c,c2:c + 2})
            c += 2
            break dummyLoop
          }
        }
      }

      return false
    }
    lineWhereCanConcat = -1
    legalObjLine = i
    return toReturn

  }
  function findOperatorsNotSameLine() {
    //#VARIABLE ASSIGNMENT
    let toReturn = true
    let text,lowerText,cPlusLen
    dummyLoop:
    while (true) {
      checkNext:
      while (true) {
        if (c < numberOfChars - 2 && v2Continuator[lowerText = (text = lines[i].slice(c,cPlusLen = c + 3)).toLowerCase()]) {

          if (lowerText === 'and') {

            if (variableCharsObj[lines[i][cPlusLen]]) {
              break checkNext
            } else {
              if (lookingForAnd) {
                return false
              }
            }
          }

          everything.push({type:'3operator',text:text,i1:i,c1:c,c2:c + 3})
          c += 3
          break dummyLoop
        }
        break checkNext
      }

      checkNext:
      while (true) {
        if (c < numberOfChars - 1 && v2Continuator[lowerText = (lines[i].slice(c,cPlusLen = c + 2).toLowerCase())]) {

          if (lowerText === 'or') {
            if (variableCharsObj[lines[i][cPlusLen]]) {
              break checkNext
            }
          }

          everything.push({type:'2operator',text:lines[i].slice(c,c + 2),i1:i,c1:c,c2:c + 2})
          c += 2
          break dummyLoop
        }
        break checkNext
      }

      if (c < numberOfChars && v2Continuator[lines[i][c].toLowerCase()]) {
        if (lines[i][c] === '+' && lines[i][c + 1] === '+') {
          d('illegal v2Continuator `++`',linesPlusChar())
        }
        if (lines[i][c] === '-' && lines[i][c + 1] === '-') {
          d('illegal v2Continuator `++`',linesPlusChar())
        }
        //if ?, ternary, so expect :
        if (lines[i][c] === '?') {
          // d('? ternary', char())
          everything.push({type:'? ternary',text:'?',i1:i,c1:c})
          colonDeep++,c++

          lineWhereCanConcat = -1
          legalObjLine = i
          if (!recurseBetweenExpression()) { findExpression() }
          if (i === howManyLines) { return false }
          //where findExpression stopped at
          if (lines[i][c] === ':') {
            // d(': ternary', char())
            everything.push({type:': ternary',text:':',i1:i,c1:c})
            colonDeep--,c++
          } else {
            d('illegal: why is there no : after ? ternary',char())
            //pretend it was legal
            colonDeep--,c++,toReturn = false
            //I don't know what returning false does
          }
        } else if (lines[i][c] === ':') {
          //'?' will make colonDeep true
          if (!colonDeep) {
            //if encounter ':' in the wild BEFORE '?'
            d('illegal: unexpected :',char())
          }
          toReturn = false
        //for variadic function definition
        } else if (variadicAsterisk && lines[i][c] === '*') {
          // d('* variadic Argument', char())
          everything.push({type:'* variadic Argument',text:'*',i1:i,c1:c})
          c++
        } else {
          // d(lines[i][c], '1operator', char())


          everything.push({type:'1operator',text:lines[i][c],i1:i,c1:c})
          c++
        }
        break dummyLoop
      }
      return false
    }

    lineWhereCanConcat = -1
    legalObjLine = i
    return toReturn

  }
  function findOperators() {
    //#VARIABLE ASSIGNMENT
    let toReturn = true
    let text,lowerText,cPlusLen
    dummyLoop:
    while (true) {
      checkNext:
      while (true) {
        if (c < numberOfChars - 2 && operatorsObj[lowerText = (text = lines[i].slice(c,cPlusLen = c + 3)).toLowerCase()]) {
          // d(lines[i].slice(c, c + 3), '3operator', char())

          if (lowerText === 'and') {

            if (variableCharsObj[lines[i][cPlusLen]]) {
              break checkNext
            } else {
              if (lookingForAnd) {
                return false
              }
            }
          }

          if (lowerText === 'not') {
            if (variableCharsObj[lines[i][cPlusLen]]) {
              break checkNext
            }
          }

          everything.push({type:'3operator',text:text,i1:i,c1:c,c2:c + 3})
          c += 3
          break dummyLoop
        }
        break checkNext
      }

      checkNext:
      while (true) {
        if (c < numberOfChars - 1 && operatorsObj[lowerText = (lines[i].slice(c,cPlusLen = c + 2).toLowerCase())]) {
        // d(lines[i].slice(c, c + 2), '2operator', char())

          if (lowerText === 'or') {
            if (variableCharsObj[lines[i][cPlusLen]]) {
              break checkNext
            }
          }

          everything.push({type:'2operator',text:lines[i].slice(c,c + 2),i1:i,c1:c,c2:c + 2})
          c += 2
          break dummyLoop
        }
        break checkNext
      }

      if (c < numberOfChars && operatorsObj[lines[i][c].toLowerCase()]) {
        //if ?, ternary, so expect :
        if (lines[i][c] === '?') {
          // d('? ternary', char())
          everything.push({type:'? ternary',text:'?',i1:i,c1:c})
          colonDeep++,c++

          lineWhereCanConcat = -1
          legalObjLine = i
          if (!recurseBetweenExpression()) { findExpression() }
          if (i === howManyLines) { return false }
          //where findExpression stopped at
          if (lines[i][c] === ':') {
            // d(': ternary', char())
            everything.push({type:': ternary',text:':',i1:i,c1:c})
            colonDeep--,c++
          } else {
            d('illegal: why is there no : after ? ternary',char())
            //pretend it was legal
            colonDeep--,c++,toReturn = false
            //I don't know what returning false does
          }
        } else if (lines[i][c] === ':') {
          //'?' will make colonDeep true
          if (!colonDeep) {
            //if encounter ':' in the wild BEFORE '?'
            d('illegal: unexpected :',char())
          }
          toReturn = false
        //for variadic function definition
        } else if (variadicAsterisk && lines[i][c] === '*') {
          // d('* variadic Argument', char())
          everything.push({type:'* variadic Argument',text:'*',i1:i,c1:c})
          c++
        } else {
          // d(lines[i][c], '1operator', char())


          everything.push({type:'1operator',text:lines[i][c],i1:i,c1:c})
          c++
        }
        break dummyLoop
      }
      return false
    }

    lineWhereCanConcat = -1
    legalObjLine = i
    return toReturn

  }
  function recurseBetweenExpression() {
    if (betweenExpression()) {
      while (betweenExpression()) {
        //lol
      }
      return true
    } else {
      return false
    }
  }
  //true if found a between AND an expression
  //really hard to understand
  function betweenExpression() {
    // exprFoundLine = i

    if (i === howManyLines) {return false}
    let lineBeforeSkipLines = i
    if (insideContinuation) {
      skipThroughWhiteSpaces()
      if (c !== numberOfChars && lines[i][c] === ';') {
        d('ILLEGAL semiColonComment insideContinuation',char())
        if (endExprContinuation()) {
          return findExpression()
        }
      }
    } else {
      lineBeforeSkipLines = i
      if (!skipThroughEmptyLines()) { return false }
      // everythingConcatIndex = everything.length
    }

    let foundBetween
    if (i === lineBeforeSkipLines) {
      foundBetween = findBetween()
    } else {
      foundBetween = findBetweenNotSameLine()
    }

    if (foundBetween) {
      if (i !== lineBeforeSkipLines) {
        spliceIndexEverythingAtHotkeyLine = everything.length
        operatorAtHotkeyLine = i
      }
      return true
    } else {
      if (insideContinuation) {
        if (endExprContinuation()) {
          return findExpression()
        }
      }
    }

  }

  function findBetweenNotSameLine() {
    if (c === numberOfChars) {
      return false
    }

    if (findOperatorsNotSameLine()) {
      findExpression()
      return true
    }

    if (insideContinuation) {
      if (endExprContinuation()) {
        findExpression()
        return true
      }
    } else {
      return false
    }
  }

  //no lines are skipped
  function findBetween() {
    if (c === numberOfChars) {
      return false
    }

    if (findOperators()) {
      findExpression()
      return true
    }

    //look for concat, if no operators found
    //if the next thing is expr, it is a concat
    // if char before is whiteSpace concat
    const everythingConcatIndex = everything.length - 1
    if (i === lineWhereCanConcat && whiteSpaceObj[lines[i][c - 1]] && findExpression()) {
      // const concatWhiteSpaces = lines[concatLineBak].slice(beforeConcatBak, afterConcat)
      // d(`concat "${concatWhiteSpaces}" ${concatWhiteSpaces.length}LENGHT ${beforeConcatBak + 1} line ${concatLineBak + 1}`)
      // I just have to replace the last whiteSpace with concat
      everything[everythingConcatIndex].type = 'concat'
      // everything.push({type: 'concat', text:concatWhiteSpaces,i1: concatLineBak, c1: beforeConcatBak,c2:afterConcat})
      return true
    }

    if (insideContinuation) {
      if (endExprContinuation()) {
        findExpression()
        return true
      }
    } else {
      return false
    }
  }

  function findArrayAccess() {
    if (lines[i][c] === '[') {
      arrayMid('ArrAccess')
      return true
    }
  }
  function arrayMid(which: string) {
    everything.push({type:`[ ${which}`,text:'[',i1:i,c1:c})
    legalObjLine = i

    c++

    let isComma = false
    while (true) {

      if (!skipThroughEmptyLines()) { return false }
      if (lines[i][c] === ',') {
        c++
        isComma = true
        legalObjLine = i
        lineWhereCanConcat = -1
      } else {
        if (i !== legalObjLine ) {
          d(`ILLEGAL ] ${which} i !== legalObjLine`,char())
        }
      }

      const arrSpliceStartIndex = everything.length
      if (recurseBetweenExpression() || findExpression()) {
        if (isComma) {
          isComma = false
          everything.splice(arrSpliceStartIndex,0,{type:`, ${which}`,text:',',i1:i,c1:c})
        }
      } else {
        if (isComma) {
          isComma = false
          d('ILLEGAL trailling , ARRAY',char())
          everything.splice(arrSpliceStartIndex,0,{type:`ILLEGAL trailling , ${which}`,text:',',i1:i,c1:c})
        }

        if (lines[i][c] !== ']') {
          d(`\`${lines[i][c]}\` illegal NOT ] ${which} ${linesPlusChar()}`)
        }
        everything.push({type:`] ${which}`,text:']',i1:i,c1:c})
        c++
        return true
      }
    }

  }
  function endArrAccess() {
    // d(`${validName} ArrAccess ${char()}`)
    // everything.push({ type: 'ArrAccess', text: validName, i1: i, c1: nonWhiteSpaceStart, c2: c })

    // d('[ ArrAccess', char())
    everything.push({type:'[ ArrAccess',text:'[',i1:i,c1:c})
    c++
    if (!recurseBetweenExpression()) { findExpression() }
    // d('] ArrAccess', char())
    everything.push({type:'] ArrAccess',text:']',i1:i,c1:c})
    c++
    recurseFindTrailingExpr()
  }
  function trailingAndRecurse() {
    recurseFindTrailingExpr()
    recurseBetweenExpression()
  }
  function recurseFindTrailingExpr() {
    if (findTrailingExpr()) {
      while (findTrailingExpr()) {
        //
      }
      return true
    }
  }
  function findTrailingExpr() {
    if (lines[i][c] === '.') {
      lastTrailingWasFunc = false
      c++
      everything.push({type:'. property',text:'.',i1:i,c1:c})
      const c1 = c
      skipValidChar()
      everything.push({type:'(.) property findTrailingExpr',text:lines[i].slice(c1,c),i1:i,c1:c1,c2:c})
      /* if (isNaN(Number(validName))) {
        // everything.push({ type: 'obj with property', text: validName, i1: i, c1: nonWhiteSpaceStart, c2: c })
      } else {
        // everything.push({ type: 'Integer part of Decimal', text: validName, i1: i, c1: nonWhiteSpaceStart, c2: c })
      }
      c++
      everything.push({ type: '. property', text: '.', i1: i, c1: c })
      findMethodOrProperty() */
      return true
    }

    //#FUNCTION CALL
    if (lines[i][c] === '(') {
      const functionMidReturn = functionMid('function')
      if (functionMidReturn === 1) {
        return true
      } else if (functionMidReturn === 2) {
        return false
      }
    }
    if (findArrayAccess()) {
      lastTrailingWasFunc = false
      return true
    }
  }
  function findExpression() {
    if (i === howManyLines) {
      d('illegal empty assignment',char())
      return false
    }

    skipThroughWhiteSpaces()

    //nothing left, continue
    if (c === numberOfChars || lines[i][c] === ';') {

      // d('findExpression nothing left, continue',c, numberOfChars, lines[i])

      if (insideContinuation) {
        if (endExprContinuation()) {
          findExpression()
        }
      } else {
        if (startContinuation()) {
          i++,c = 0,numberOfChars = lines[i].length
          findExpression()
        }
      }
      return false
    }

    nonWhiteSpaceStart = c
    //stumble upon a valid variable Char
    if (lines[i][c] === '%' || variableCharsObj[lines[i][c]]) {
      c++

      everything.push({type:'start unit'})

      //skip through % OR valid variable Chars
      while (c < numberOfChars && (findPercentVar() || variableCharsObj[lines[i][c]])) {
        c++
      }
      const fEvalidName = lines[i].slice(nonWhiteSpaceStart,c)

      if (isNaN(Number(fEvalidName))) {
        // d(`${validName} idkVariable ${char()}`)
        if (lookingForAnd && fEvalidName.toLowerCase() === 'and') {
          lookingForAnd = false
          everything.push({type:'legacyIf and{ws} findExpression',text:`${fEvalidName} `,i1:i,c1:nonWhiteSpaceStart,c2:c + 1})
          c++
          return false
        } else {
          everything.push({type:'idkVariable',text:fEvalidName,i1:i,c1:nonWhiteSpaceStart,c2:c})
          lineWhereCanConcat = i
        }
      } else {
        // d(`${validName} Integer ${char()}`)
        everything.push({type:'Integer',text:fEvalidName,i1:i,c1:nonWhiteSpaceStart,c2:c})
      }

      if (recurseFindTrailingExpr()) {
        everything.push({type:'end unit'})

        recurseBetweenExpression()
        return true
      }

      everything.push({type:'end unit'})
      recurseBetweenExpression()
      return true

    }

    if (findDoubleQuotedString()) {
      recurseBetweenExpression()
      return true
    } else {
      if (i === howManyLines) {
        d('findExpression OutOfLines')
        return false
      }
    }

    if (lines[i][c] === '(') {
      // d('( group', char())
      let which = 'group'
      const dIndex = everything.length - 1
      let back = everything[dIndex]
      while (true) {
        if (back) {
          if (back.type === 'emptyLines') {
            back = everything[dIndex - 1]
            if (!back) {
              break
            }
          }
          if (back.type === 'if') {
            which = 'if'
          } else if (back.type === 'while') {
            which = 'while'
          }
        }
        break
      }

      everything.push({type:`( ${which}`,text:'(',i1:i,c1:c})
      c++
      lineWhereCanConcat = -1
      if (!recurseBetweenExpression()) { findExpression() }
      // d(') group', char())
      everything.push({type:`) ${which}`,text:')',i1:i,c1:c})
      c++
      recurseBetweenExpression()
      return true
    }

    if (lines[i][c] === '[') {
      if (arrayMid('Array')) {
        recurseBetweenExpression()
        return true
      }
      return false
    }
    if (i !== lineWhereCanConcat && lines[i][c] === '{') {
      everything.push({type:'{ object',text:'{',i1:i,c1:c})
      legalObjLine = i
      colonDeep++,c++

      let isComma = false
      const singleVarEverythingIndex = -1
      while (true) {

        if (!skipThroughEmptyLines()) { return false }

        const objSpliceStartIndex = everything.length
        if (lines[i][c] === ',') {
          c++
          isComma = true
          legalObjLine = i
          lineWhereCanConcat = -1
          skipThroughWhiteSpaces()
        } else {
          if (i !== legalObjLine ) {
            d('ILLEGAL } Array i !== legalObjLine',char())
          }
        }
        //skipSpaces
        // skip though propCharsObj
        // if found expression:
        // (another propCharsObj or anything)
        // it not NOT a singleVar anymore
        // if (findSingleVar()) {
        // singleVarEverythingIndex = everything.length
        // }
        const lengthBefore = everything.length
        if (recurseBetweenExpression() || findExpression()) {
          const lengthAfter = everything.length
          const lengthDiff = lengthAfter - lengthBefore
          if (lengthDiff === 4) {
            let next = everything[lengthBefore + 3]
            if (next.type === 'emptyLines') {
              next = everything[lengthBefore + 1]
              if (next.type === 'idkVariable') {
                next.type = 'singleVar'
              }
            }
          } else if (lengthDiff === 3) {
            const next = everything[lengthBefore + 1]
            if (next.type === 'idkVariable') {
              next.type = 'singleVar'
            }
          }
          if (isComma) {
            isComma = false
            everything.splice(objSpliceStartIndex,0,{type:', object',text:',',i1:i,c1:c})
          }
        } else {
          // if haven't expression, it is only illegal if haventFoundSingleVar, which is a valid key
          if (isComma) {
            isComma = false
            d('ILLEGAL trailling , object',char())
            everything.splice(objSpliceStartIndex,0,{type:'ILLEGAL trailling , object',text:',',i1:i,c1:c})
          }
          if (lines[i][c] !== '}') {
            d(`\`${lines[i][c]}\` illegal NOT } object ${linesPlusChar()}`)
          }
          everything.push({type:'} object',text:'}',i1:i,c1:c})
          lineWhereCanConcat = -1
          colonDeep--,c++
          trailingAndRecurse()
          recurseBetweenExpression()
          return true

        }

        if (lines[i][c] === ':') {
          // d(': object', char())
          everything.push({type:': object',text:':',i1:i,c1:c})
          c++ //skip :
          legalObjLine = i
          skipThroughWhiteSpaces()
          if (!recurseBetweenExpression()) { findExpression() }
        } else {
          d('illegal obj2, key without : ',char())
          return false
        }

      }

    }

  }
  function findDecimal() {
    if (innerDecimalFinder()) {
      d(`${validName} Decimal ${char()}`)
    } else {
      d(`${validName} Illegal Decimal ${char()}`)
    }
    function innerDecimalFinder() {
      while (c < numberOfChars && !isNaN(Number(lines[i][c]))) {
        c++
      }
      if (c < numberOfChars && lines[i][c] === '.') {
        c++
        innerDecimalFinder()
        return false
      }
      validName = lines[i].slice(nonWhiteSpaceStart,c)
      return true
    }
  }
  //true if current char is ", false if it isn't
  function findDoubleQuotedString() {
    if (lines[i][c] === '"') {
      strStartPos = c,strStartLine = i
      c++
      //noClosing " found on the same line
      if (!findClosingQuoteInLine()) {
        everything.push({type:'open doubleQuote',text:'"',i1:i,c1:c})
        //continuation wasn't resolved
        if (!recurseContinuation()) {
          //script is broken at this point but we still try to continue
          c++
          d('AS LAST RESORT: doing skipThroughEmptyLines',char())
          insideContinuation = true
          skipThroughEmptyLines()
        }
      }
      return true
    } else {
      return false
    }

  }
  //true if found closing ", false if EOL, false if found comment
  function findClosingQuoteInLine() {
    while (c < numberOfChars) {
      if (lines[i][c] === '"') {
        // if 2 consecutive: "", it's escapechar, so continue findClosingQuote
        if (c < numberOfChars - 1 && lines[i][c + 1] === '"') {
          c += 2
          continue
        } else {
          //this IS closing quote because not escapechar
          c++,lineWhereCanConcat = i
          // strStartPos, strStartLine
          const text = textFromPosToCurrent([strStartPos,strStartLine])
          // d(text === printString(), 'String')
          // d(printString(), 'String')
          everything.push({type:'String',text:text,i1:strStartLine,c1:strStartPos,i2:i,c2:c})
          return true
        }
        // semiColonComment must be preceded by whiteSpace
      } else if (lines[i][c] === ';' && whiteSpaceObj[lines[i][c - 1]]) {
        //inefficient, but go back whiteSpaces, to let skipThroughEmptyLines capture them all
        while (whiteSpaceObj[lines[i][--c]]) {
          //lol
        }
        c++
        return false
      }
      //anything else found, next char
      c++
    }
    //out of chars
    return false
  }

  //true if legal, false if illegal startContinuation: which expects (
  function recurseContinuation(): boolean {
    if (startContinuation()) {
      // d('stringContinuation START', char())
      //outoOfLines or (Ended and didn't find end of string)
      if (!endStringContinuation()) {
        //only startContinuation if not already inside one
        if (!insideContinuation) {
          return recurseContinuation()
        }
      }
      return true
    } else {
      return false
    }
  }
  function startContinuation() {
    if (!skipThroughEmptyLines()) {
      // d('illegal: startContinuation OutOfLines')
      // trace()
      return false
    }
    if (lines[i][c] === '(') {
      insideContinuation = true

      everything.push({type:'( continuation',text:'(',i1:i,c1:c})
      c++
      everything.push({type:'continuation options',text:lines[i].slice(c,numberOfChars),i1:i,c1:c,c2:numberOfChars})
      everything.push({type:'newline ( continuation',text:'\n',i1:i,c1:numberOfChars})

      strContiStartPos = 0,strContiStartLine = i + 1
      return true
    }
    return false
    /* while (i < howManyLines) {
      c = 0
      numberOfChars = lines[i].length
      skipThroughWhiteSpaces()
      if (c === numberOfChars) {
        trace()
        process.exit()
        d('Continuation skip empty line')
        i++
        continue
      } else if (lines[i][c] === ';') {
        d('Continuation comment...')
        i++
        continue
      } else if (lines[i][c] === '(') {
        insideContinuation = true
        return true
      } else {
        d(`illegal ${lines[i][c]} c:${c + 1} line:${i + 1} startContinuation#765`)
        // trace()
        // d(everything)
        return false
      }
    }
 */
  }
  function endExprContinuation() {
    i++,c = 0,numberOfChars = lines[i].length
    skipThroughWhiteSpaces()
    if (c !== numberOfChars && lines[i][c] === ')') {
      insideContinuation = false
      d(`) Expression ${char()}`)
      c++
      return true
    } else {
      d(`illegal in endExprContinuation ${char()}`)
      return false
    }
  }

  //true if found charToFind, false if outOfLines
  function skipThroughFindChar(charToFind: string) {
    //also skip through whiteSpaces, comments
    outer:
    while (true) {
      while (c < numberOfChars && whiteSpaceObj[lines[i][c]]) {
        c++
      }
      //EOL: next line
      charLoop:
      while (c < numberOfChars) {
        if (lines[i][c] === ';' && (c === 1 || whiteSpaceObj[lines[i][c - 1]])) {
          d('comment while skipThroughFindChar',char())
          break charLoop
        } else if (lines[i][c] === charToFind) {
          // d('found', charToFind, 'at', char())
          return true
        }
        c++
      }
      i++
      if (i < howManyLines) {
        c = 0,numberOfChars = lines[i].length
        continue outer
      } else {
        return false
      }
    }
  }
  //true if found anything !whiteSpace, false if outOfLines
  function skipThroughEmptyLines() {
    const c1 = c,i1 = i
    //also skip through whiteSpaces, comments
    outOfLines:
    while (i < howManyLines) {
      while (c < numberOfChars && whiteSpaceObj[lines[i][c]]) {
        c++
      }
      //EOL: next line
      if (c === numberOfChars) {
        //comment: next line
      } else if (lines[i][c] === ';' && (c === 0 || whiteSpaceObj[lines[i][c - 1]])) {
        //
      } else if (c < numberOfChars - 1 && lines[i].slice(c,c + 2) === '/*') {
        while (true) {
          if (++i === howManyLines) {
            break outOfLines
          }
          c = 0
          numberOfChars = lines[i].length
          while (c < numberOfChars && whiteSpaceObj[lines[i][c]]) {
            c++
          }
          if (c < numberOfChars - 1 && lines[i].slice(c,c + 2) === '*/') {
            c += 2
            continue outOfLines
          }
        }
      } else {
        //anything else, return found
        const text = textFromPosToCurrent([c1,i1])
        if (text) {
          everything.push({type:'emptyLines',text:text,i1:i1,c1:c1,i2:i,c2:c})
        }
        return true
      }
      i++
      if (i < howManyLines) {
        c = 0,numberOfChars = lines[i].length
      } else {
        break outOfLines
      }
    }
    i--
    c = numberOfChars
    const text = textFromPosToCurrent([c1,i1])
    if (text) {
      everything.push({type:'emptyLines EOF',text:text,i1:i1,c1:c1,i2:i,c2:c})
    }
    i++
    return false
  }
  function skipThroughWhiteSpaces() {
    const c1 = c
    while (c < numberOfChars && whiteSpaceObj[lines[i][c]]) {
      c++
    }
    const text = lines[i].slice(c1,c)
    if (text) {
      // d(`WHITESPACES '${text}'`)
      everything.push({type:'whiteSpaces',text:text,i1:i,c1:c1,c2:c})
    }
  }
  function findCommentsAndEndLine() {
    let toReturn = true
    dummyLoop:
    while (true) {
      skipThroughWhiteSpaces()
      if (c === numberOfChars) {
        break dummyLoop
      }

      if (lines[i][c] === ';' && whiteSpaceObj[lines[i][c - 1]]) {
        const commentToEOL = lines[i].slice(c,numberOfChars)
        // d(commentToEOL,'semiColonComment at findCommentsAndEndLine')
        everything.push({type:'semiColonComment at findCommentsAndEndLine',text:commentToEOL,i1:i,c1:c,c2:numberOfChars})
        break dummyLoop
      }

      if (!whiteSpaceObj[lines[i][c]]) {
        d(`ILLEGAL nonWhiteSpace '${lines[i][c]}' at findCommentsAndEndLine ${char()}`)
        toReturn = false; break dummyLoop
      }

      d('this isn\'t supposed to happen #445')
    }
    everything.push({type:'newLine findCommentsAndEndLine',text:'\n',i1:i,c1:c})
    i++; return toReturn
  }
  function findPercentVarV1Expression() {
    if (lines[i][c] === '%') {
      if (lines[i][c - 1] === '`') {
        d('literal % in findV1Expression')
      } else {
        const cEndOfV1Expression = cNotWhiteSpace
        const text = lines[i].slice(v1ExpressionC1,cEndOfV1Expression)
        if (text) {
          everything.push({type:'v1String findPercentVarV1Expression',text:text,i1:i,c1:v1ExpressionC1,c2:cEndOfV1Expression})
        }


        everything.push({type:'%START %Var%',text:'%',i1:i,c1:c})
        c++

        percentVarStart = c
        if (!(c < numberOfChars && variableCharsObj[lines[i][c]])) {
          d('illegal empty %VAR%')
        }
        //skip through valid variable Chars
        while (c < numberOfChars && variableCharsObj[lines[i][c]]) {
          c++
        }
        const percentVar = lines[i].slice(percentVarStart,c)
        // d('percentVar====',percentVar)
        everything.push({type:'percentVar v1Expression',text:percentVar,i1:i,c1:percentVarStart,c2:c})

        if (lines[i][c] !== '%') {
          d('illegal %VAR% in v1Expression',char())
        }
        cNotWhiteSpace = c
        everything.push({type:'END% %Var%',text:lines[i][c],i1:i,c1:c})
        return true
      }
    }
    return false
  }

  function findPercentVar() {
    const percentVarStart = c
    if (c < numberOfChars && lines[i][c] === '%') {
      c++
      skipValidChar()
      if (c < numberOfChars && lines[i][c] === '%') {
        // d(`${lines[i].slice(percentVarStart, c)} %VAR% ${char()} #988`)
        return true
      } else {
        d(lines[i].slice(nonWhiteSpaceStart,c),'ILLEGAL %VAR%',char())
        return false
      }
    } else {
      return false
    }
  }
  function findIdkVar() {
    if (variableCharsObj[lines[i][c]]) {
      idkVarC1 = c
      c++
    } else if (c < numberOfChars && lines[i][c] === '%') {
      everything.push({type:'% checkPercent',text:'%',i1:i,c1:c})
      percentVarMid()
      c++
      idkVarC1 = c
    } else {
      return false
    }
    while (c < numberOfChars) {
      if (c < numberOfChars && lines[i][c] === '%') {
        everything.push({type:'v1String findIdkVar',text:lines[i].slice(idkVarC1,c),i1:i,c1:idkVarC1,c2:c})
        everything.push({type:'% checkPercent',text:'%',i1:i,c1:c})
        percentVarMid()
        c++
        if (c === numberOfChars) {
          return true
        } else {
          idkVarC1 = c
        }
      }
      if (variableCharsObj[lines[i][c]]) {
        c++
      } else {
        break
      }
    }
    const text = lines[i].slice(idkVarC1,c)
    if (text) {
      everything.push({type:'v1String findIdkVar',text:text,i1:i,c1:idkVarC1,c2:c})
    }
    return true
  }
  function percentVarMid() {
    c++
    idkVarC1 = c
    skipValidChar()
    if (c < numberOfChars && lines[i][c] === '%') {
      everything.push({type:'v1String percentVarMid',text:lines[i].slice(idkVarC1,c),i1:i,c1:idkVarC1,c2:c})
      everything.push({type:'% percentVarMid',text:'%',i1:i,c1:c})
      return true
    } else {
      d(lines[i].slice(nonWhiteSpaceStart,c),'ILLEGAL %VAR%',char())
      return false
    }
  }
  function findSingleVar() {
    const c1 = c
    if (c < numberOfChars && propCharsObj[lines[i][c]]) {
      c++
      //skip through valid variable Chars
      while (c < numberOfChars && propCharsObj[lines[i][c]]) {
        c++
      }
      const text = lines[i].slice(c1,c)
      everything.push({type:'singleVar',text:text,i1:i,c1:c1,c2:c})
      lineWhereCanConcat = i
      return true
    }
    return false
  }
  function skipValidChar() {
    //skip through valid variable Chars
    while (c < numberOfChars && variableCharsObj[lines[i][c]]) {
      c++
    }
  }
  function printString() {
    if (strStartLine === i) {
      return lines[i].slice(strStartPos,c)
    } else {
      let strToPrint = lines[strStartLine].slice(strStartPos)
      for (let i2 = strStartLine + 1; i2 < i; i2++) {
        // console.log(lines[i2])
        strToPrint += `\n${lines[i2]}`
      }
      strToPrint += `\n${lines[i].slice(0,c)}`
      return strToPrint
    }
    // d('no quote after DoubleQuotesString', `Ln ${strStartLine + 1}, Col ${strStartPos + 1} - Ln ${i + 1}, Col ${c + 1}`)

  }
  function ch() {
    d(lines[i][c])
  }
  function char() {
    return `${c + 1} ${l()}`
  }
  function l() {
    return `line ${i + 1}`
  }
  function linesPlusChar() {
    return `line:${i + 1}, char:${c + 1}`
  }
}

