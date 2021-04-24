import { trace } from 'console'
import { whiteSpaceObj, variableCharsObj, operatorsObj, typeOfValidVarName, whiteSpaceOverrideAssign, propCharsObj } from './tokens'
const d = console.debug.bind(console)

export default (content: string) => {
  // https://stackoverflow.com/questions/6784799/what-is-this-char-65279#answer-6784805
  // https://stackoverflow.com/questions/13024978/removing-bom-characters-from-ajax-posted-string#answer-13027802
  if (content[0] === '\ufeff') {
    content = content.slice(1)
  }
  const lines = content.split('\n')
  const howManyLines = lines.length
  const everything = []
  const toFile = ''
  const rangeAndReplaceTextArr: [[[number, number],[number, number]], string][] = []

  let i = 0, c = 0, numberOfChars = 0, validName = '', strStartLine: number, strStartPos: number, insideContinuation = false, beforeConcat: number, nonWhiteSpaceStart: number, exprFoundLine = -1, colonDeep = 0, usingStartOfLineLoop = false, variadicAsterisk = false, lineBeforeSkip = 0
  let everythingPushCounter = 0
  lineLoop:
  while (i < howManyLines) {
    c = 0
    numberOfChars = lines[i].length

    skipThroughWhiteSpaces()

    //#multiline comments
    //if line starts with /*
    // leave 2 chars at end
    if (c < numberOfChars - 1 && lines[i].slice(c, c + 2) === '/*') {
      const multiLineCommentLineStart = i, multiLineCommentColStart = c
      // d('MultilineComment START', l())
      while (++i < howManyLines) {
        c = 0
        numberOfChars = lines[i].length

        skipThroughWhiteSpaces()

        //if line starts with */
        if (c < numberOfChars - 1 && lines[i].slice(c, c + 2) === '*/') {
          // d('MultilineComment END', l())
          // everything.push({ type: 'MultilineComment', lineStart: multiLineCommentLineStart, colStart: multiLineCommentColStart, lineEnd: i, colEnd: c + 2 })
          i++
          continue lineLoop
        }
      }
    }

    startOfLineLoop:
    while (true) {

      //out of lines
      if (i === howManyLines) {
        break lineLoop
      }
      //nothing left, continue
      if (c === numberOfChars) {
        everything.push({type: 'newLine startOfLineLoop', text:'\n',i1: i, c1:c})
        i++
        continue lineLoop
      }

      //#semicolon comments
      if (lines[i][c] === ';') {
        // d('SemiColonComment', `${c}-END`, l())
        // everything.push({type: 'SemiColonComment', line: i, colStart: c})
        const text = lines[i].slice(c,numberOfChars)
        everything.push({type: 'SemiColonComment', text:text,i1: i, c1:c, c2:numberOfChars})
        everything.push({type: 'newLine SemiColonComment', text:'\n',i1: i, c1:c})
        i++
        continue lineLoop
      }

      //#function DECLARATION END
      if (lines[i][c] === '}') {
        // d(`} Function DEFINITION ${char()}`)
        everything.push({type: '} function definition', text:'}',i1: i, c1:c})
        c++
        findCommentsAndEndLine()
        continue lineLoop
      }

      nonWhiteSpaceStart = c
      //stumble upon a valid variable Char
      if (variableCharsObj[lines[i][c]]) {
        c++

        skipValidChar()

        // if EOL, it must be COMMAND
        if (c === numberOfChars) {

          validName = lines[i].slice(nonWhiteSpaceStart, c)
          // d(validName, 'COMMAND EOL', char())
          everything.push({type: 'command EOL', text:validName,i1: i, c1:nonWhiteSpaceStart, c2:c})
          everything.push({type: 'newLine command EOL', text:'\n',i1: i, c1:c})
          i++
          continue lineLoop
        }

        validName = lines[i].slice(nonWhiteSpaceStart, c)
        const validNameEnd = c,validNameLine = i

        const idkType = typeOfValidVarName[validName.toLowerCase()]
        // comma can't be assignment, so I can skip assignment
        // if it has a comma, it could be a hotkey, it's only NOT a hotkey if it's a valid COMMAND
        if (lines[i][c] === ',') {
          // directive or command
          if (idkType === 1 || idkType === 4) {
            d(validName, 'comma DIRECTIVE OR COMMAND', char())
            i++
            continue lineLoop
          }
        }

        // only directives and "if" override assignment and ONLY when there's a whiteSpace
        if (whiteSpaceObj[lines[i][c]]) {
          if (whiteSpaceOverrideAssign[idkType]) {
            if (idkType === 1) {
              d(validName, 'whiteSpace DIRECTIVE', char())
            } else if (idkType === 2) {
              // d(validName, 'if statement', char())
            } else if (idkType === 3) {
              d(validName, 'global local or static', char())
            }
            const text = lines[i].slice(nonWhiteSpaceStart, numberOfChars)
            everything.push({type: 'directive', text:text,i1: i, c1:nonWhiteSpaceStart, c2:numberOfChars})
            everything.push({type: 'newLine directive', text:'\n',i1: i, c1:c})
            i++
            continue lineLoop
          }

          const lineBeforeSkip = i

          if (!skipThroughEmptyLines()) { break lineLoop }

          if (findOperators()) {
            // d(`${validName} assignment whiteSpace`)
            everything.splice(everything.length - 1,0,{type: 'assignment whiteSpace', text:validName,i1: validNameLine, c1:nonWhiteSpaceStart ,c2:validNameEnd})
            findExpression()

            continue lineLoop
          }

          if (idkType === 4) {
            // d(validName, 'whiteSpace COMMAND', nonWhiteSpaceStart + 1, lineBeforeSkip + 1, 'line')
            // statement can't have Expr if line changed...
            if (i === lineBeforeSkip) {

              if (validName.toLowerCase() === 'return') {
                // can't be betweenExpression() because whiteSpace := takes priority
                // everything.push({type: 'return', text:validName,i1: validNameLine, c1:nonWhiteSpaceStart ,c2:validNameEnd})
                everything.splice(everything.length - 1,0,{type: 'return', text:validName,i1: validNameLine, c1:nonWhiteSpaceStart ,c2:validNameEnd})
                findExpression()
              } else {
                everything.splice(everything.length - 1,0,{type: 'command', text:validName,i1: validNameLine, c1:nonWhiteSpaceStart ,c2:validNameEnd})
                const text = lines[validNameLine].slice(c, numberOfChars)
                everything.push({type: 'command to EOL', text:text,i1: validNameLine, c1:c ,c2:numberOfChars})
              }
              // untested c, i
              everything.push({type: 'newLine command', text:'\n',i1: i, c1:c})
              i++
            }
            continue lineLoop
          }

        } else {
          //labels can't have spaces
          // well, it's now or never to be a label: because label can't have %
          //#LABELS
          if (lines[i][c] === ':') {
            c++

            skipThroughWhiteSpaces()

            if (c === numberOfChars) {
              // d('LABEL EOL', char())
              i++
              continue lineLoop
            }

            if (lines[i][c] === ';') {
              // d('LABEL SemiColonComment', char())
              // everything.push({type: 'SemiColonComment', line: i, colStart: c})
              i++
              continue lineLoop
            }

            // if 2 consecutive ':' then hotkey
            if (lines[i][c] === ':') {
              // d('HOTKEY validVarName', char())
              i++
              continue lineLoop
            }

            c--

          }
        }

      }

      //%which_something%_var:=2 is valid
      //skip through % OR valid variable Chars
      while (c < numberOfChars && (findPercentVar() || variableCharsObj[lines[i][c]])) {
        c++
      }
      if (c === numberOfChars) {
        d('illegal: unexpected EOL after var parsing', char())
        continue lineLoop
      }
      validName = lines[i].slice(nonWhiteSpaceStart, c)
      const validNameEnd = c,validNameLine = i

      if (validName) {
        //#FUNCTION
        if (lines[i][c] === '(') {
          let validName = lines[i].slice(nonWhiteSpaceStart, c)
          // d('is not a number, valid func name')
          if (isNaN(Number(validName))) {
            //#FUNCTION DEFINITION
            if (isFunctionDefinition()) {
              // d(`${validName}( function( DEFINITION ${char()}`)
              everything.push({type: 'function( definition', text:`${validName}(`,i1: i, c1:nonWhiteSpaceStart,c2:c + 1})
              c++
              variadicAsterisk = true
              while (true) {
                skipThroughWhiteSpaces()
                nonWhiteSpaceStart = c

                if (c === numberOfChars) {
                  d('illegal function DEFINITION: need something after (', char())
                  i++
                  variadicAsterisk = false
                  continue lineLoop
                }

                c++
                skipValidChar()

                validName = lines[i].slice(nonWhiteSpaceStart, c)
                if (validName.toLowerCase() === 'byref') {
                  everything.push({type: 'byref', text:`${validName}`,i1: i, c1:nonWhiteSpaceStart,c2:c})
                  skipThroughWhiteSpaces(), nonWhiteSpaceStart = c
                  if (c === numberOfChars || !variableCharsObj[lines[i][c]]) { break }
                  c++, skipValidChar(), validName = lines[i].slice(nonWhiteSpaceStart, c)
                  // d(validName, 'Byref Param', char())
                  everything.push({type: 'byref param', text:`${validName}`,i1: i, c1:nonWhiteSpaceStart,c2:c})
                } else {
                  // d(validName, 'Param', char())
                  everything.push({type: 'Param', text:validName,i1: i, c1:nonWhiteSpaceStart, c2:c})
                }
                skipThroughEmptyLines()
                findBetween()
                if (lines[i][c] !== ',') {
                  if (lines[i][c] === ')') {
                    // d(') function DEFINITION', char())
                    everything.push({type: ') function DEFINITION', text:')',i1: i, c1:c})
                  } else {
                    d('illegal function DEFINITION END', char())
                  }
                  c++
                  skipThroughEmptyLines()
                  // d(`{ Function DEFINITION ${char()}`)
                  everything.push({type: '{ function DEFINITION', text:'{',i1: i, c1:c})
                  c++
                  usingStartOfLineLoop = true
                  skipThroughWhiteSpaces()
                  variadicAsterisk = false
                  continue startOfLineLoop
                }
                // d(', Function DEFINITION', char())
                everything.push({type: ', function definition', text:',',i1: i, c1:c})

                c++
              }
            } else {
              //#FUNCTION CALL
              // d(`${validName}( function( startOfLine ${char()}`)
              everything.push({type: 'function( startOfLine', text:`${validName}(`,i1: i, c1:nonWhiteSpaceStart ,c2:c + 1})
              c++, exprFoundLine = i
              let endsWithComma = false
              while (true) {
                if (!skipThroughEmptyLines()) { d('EOF Function startOfLine'); break lineLoop }
                if (lines[i][c] === ',') {
                  endsWithComma = true
                  // d(', function CALL startOfLine', char())
                  everything.push({type: ', function startOfLine', text:',',i1: i, c1:c})
                  c++
                  continue
                }
                if (findExpression()) {
                  endsWithComma = false
                } else {
                  if (endsWithComma) {
                    d('ILLEGAL trailling , FUNCTION startOfLine', char())
                  }
                  break
                }
              }

              if (i !== exprFoundLine) {
                d('ILLEGAL ) function startOfLine', char())
              }
              // d(') function startOfLine', char())
              everything.push({type: ') function startOfLine', text:')',i1: i, c1:c})

              c++
              everything.push({type: 'newline ) function startOfLine', text:'\n',i1: i, c1:c})
              i++
              continue lineLoop
            }

          }

          //#METHOD OR PROPERTY
          // this is NOT a METHOD call:
          // str.=v[key] "+" k "|"
          // so check if the next character is a valid Var
        } else if (lines[i][c] === '.' && variableCharsObj[lines[i][c + 1]]) {
          const validName = lines[i].slice(nonWhiteSpaceStart, c)
          //can't have number on startOfLine
          if (isNaN(Number(validName))) {
            c++
            let isProp = false
            if (!findMethodOrProperty()) {
              isProp = true
            }
            //a method can actually be assigned... property too
            //if prop and no assignment
            if (!betweenExpression() && isProp) {
              d('illegal property on startOfLine', char())
            }
            if (i === exprFoundLine) {
              findCommentsAndEndLine()
            }
            continue lineLoop
          } else {
            d('illegal: can\'t have number on startOfLine')
          }
        }

        //out of lines
        if (!skipThroughEmptyLines()) { break lineLoop }

        //#ASSIGNMENT
        if (findOperators()) {
          // d(`${validName} assignment`)
          everything.splice(everything.length - 1,0,{type: 'assignment', text:validName,i1: validNameLine, c1:nonWhiteSpaceStart ,c2:validNameEnd})

          if (!betweenExpression()) { findExpression() }
          if (i === exprFoundLine) {
            findCommentsAndEndLine()
          } else {
            usingStartOfLineLoop = true
            continue startOfLineLoop
          }
          continue lineLoop
        }
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

    //#HOTKEYS
    //skip first character to avoid matching ::, empty hotkey, or not matching :::, colon hotkey, because it matched only the first 2
    //skip ONLY if c is nonWhiteSpaceStart, which is first char
    c = (c === nonWhiteSpaceStart) ? c + 1 : c
    //advance until ':'
    while (c < numberOfChars) {
      if (lines[i][c] === ':') {
        c++
        if (c < numberOfChars && lines[i][c] === ':') {
          d(lines[i].slice(nonWhiteSpaceStart, c + 1), 'HOTKEY', char())
        }
      }
      c++
    }

    //end of lineLoop
    d('end of lineLoop')
    // ch()
    // everything.push({type: 'end of lineLoop', text:'\n',i1: i, c1:c})
    i++
    continue lineLoop
  }
  // d(everything)
  // toFile = toFile.slice(1)
  // writeSync(toFile)

  return everything

  function ws() {
    d(`\`${lines[i].slice(nonWhiteSpaceStart, c)}\``)
  }
  function applyRangeReplacements() {
  //reverse iterate to not change [c,i]
    const linesCopy = lines.slice()
    replaceRangesLoop:
    for (let i = rangeAndReplaceTextArr.length - 1; i > -1; i--) {
      const [[[c1,i1],[c2,i2]], replacementText] = rangeAndReplaceTextArr[i]
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
          for (let n = 1, len = replaceLength - 1; n < len; n++) {
          // d('loop',n)
            linesCopy.splice(i1 + n, 0, textArr[n])
          }
          // d(linesCopy[i1])
          // d(linesCopy[i1 + 1])
          // d(linesCopy[i1 + 2])
          // this is the last line
          linesCopy.splice(i1 + 1, 0, textArr[replaceLength - 1] + rightSlice)

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
          for (let n = 1, len = replaceLength - 1; n < len; n++) {
            linesCopy.splice(i1 + n, 0, textArr[n])
          }
          // first line
          linesCopy[i1] = linesCopy[i1].slice(0,c1) + textArr[0]
          // d(linesCopy[i1])
          // d(linesCopy[i1 + 1])
          // d(linesCopy[i1 + 2])
          continue replaceRangesLoop
        //start replacing inbetwwn lines, then insert lines
        } else if (sourceLength > 2){
        // this is the last line
          linesCopy[i2] = textArr[replaceLength - 1] + linesCopy[i2].slice(c2)
          const middlePointReplaceInsert = replaceLength - sourceLength + 1
          //replace lines
          for (let n = 1; n < middlePointReplaceInsert; n++) {
            linesCopy[i1 + n] = textArr[n]
          }
          //insert
          for (let n = middlePointReplaceInsert, len = replaceLength - 1; n < len; n++) {
            linesCopy.splice(i1 + n, 0, textArr[n])
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
          linesCopy.splice(i1 + 1, sourceLength - replaceLength)
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
          for (let n = 1, len = replaceLength - 1; n < len; n++) {
            linesCopy.splice(i1 + n, 0, textArr[n])
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
      return lines[i].slice(strStartPos, c)
    } else {
      let strToPrint = lines[strStartLine].slice(strStartPos)
      for (let i2 = strStartLine + 1; i2 < i; i2++) {
        strToPrint += `\n${lines[i2]}`
      }
      strToPrint += `\n${lines[i].slice(0, c)}`
      return strToPrint
    }
  }
  function isFunctionDefinition() {
    const iBak = i, cBak = c, numberOfCharsBak = numberOfChars
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
        } else {
        //is the next char '{' ?
          if (lines[i][c] === '{') {
            toReturn = true
            break iCantDirectlyReturn
          }
        }
        i++
        if (i < howManyLines) {
          c = 0, numberOfChars = lines[i].length
        } else {
          break iCantDirectlyReturn
        }
      }

      // }
    } else {
      //haven't found closing )
      d('illegal: haven\'t found closing ) isFunctionDefinition', char())
      toReturn = 2
    }
    i = iBak, c = cBak, numberOfChars = numberOfCharsBak
    //default return false
    return toReturn
  }
  //true if found, false if not found
  function findOperators() {
    //#VARIABLE ASSIGNMENT
    if (c < numberOfChars - 2 && operatorsObj[lines[i].slice(c, c + 3).toLowerCase()]) {
      // d(lines[i].slice(c, c + 3), '3operator', char())
      everything.push({type: '3operator', text:lines[i].slice(c, c + 3),i1: i, c1:c ,c2:c + 3})
      c += 3
      return true
    } else if (c < numberOfChars - 1 && operatorsObj[lines[i].slice(c, c + 2).toLowerCase()]) {
      // d(lines[i].slice(c, c + 2), '2operator', char())
      everything.push({type: '2operator', text:lines[i].slice(c, c + 2),i1: i, c1:c ,c2:c + 2})
      c += 2
      return true
    } else if (c < numberOfChars && operatorsObj[lines[i][c].toLowerCase()]) {
      //if ?, ternary, so expect :
      if (lines[i][c] === '?') {
        // d('? ternary', char())
        everything.push({type: '? ternary', text:'?',i1: i, c1:c})
        colonDeep++, c++
        findExpression()
        //where findExpression stopped at
        if (lines[i][c] === ':') {
          // d(': ternary', char())
          everything.push({type: ': ternary', text:':',i1: i, c1:c})
          colonDeep--, c++
          return true
        } else {
          d('illegal: why is there no : after ? ternary', char())
          //pretend it was legal
          colonDeep--, c++
          //I don't know what returning false does
          return false
        }
      } else if (lines[i][c] === ':') {
        //'?' will make colonDeep true
        if (!colonDeep) {
          //if encounter ':' in the wild BEFORE '?'
          d('illegal: unexpected :', char())
        }
        return false
        //for variadic function definition
      } else if (variadicAsterisk && lines[i][c] === '*') {
        // d('* variadic Argument', char())
        everything.push({type: '* variadic Argument', text:'*',i1: i, c1:c})
        c++
        return true
      }
      // d(lines[i][c], '1operator', char())
      everything.push({type: '1operator', text:lines[i][c],i1: i, c1:c})
      c++
      return true
    } else {
      return false
    }

  }

  //true if found a between AND an expression
  //really hard to understand
  function betweenExpression() {
    exprFoundLine = i, beforeConcat = c
    if (insideContinuation) {
      skipThroughWhiteSpaces()
      if (c !== numberOfChars && lines[i][c] === ';') {
        d('ILLEGAL semiColonComment insideContinuation', char())
        if (endExprContinuation()) {
          return findExpression()
        }
      }
    } else {
      lineBeforeSkip = i
      if (!skipThroughEmptyLines()) { return false }
    }

    if (findBetween()) {
      return true
    } else {
      if (insideContinuation) {
        if (endExprContinuation()) {
          return findExpression()
        }
      }
    }

  }
  //no lines are skipped
  function findBetween() {
    const beforeConcatBak = beforeConcat, afterConcat = c, concatLineBak = i
    if (c === numberOfChars) {
      return false
    }

    if (findOperators()) {
      return findExpression()
    }

    //look for concat, if no operators found
    //if the next thing is expr, it is a concat
    // if char before is whiteSpace concat
    if (i === lineBeforeSkip && whiteSpaceObj[lines[i][c - 1]] && findExpression()) {
      const concatWhiteSpaces = lines[i].slice(beforeConcatBak, afterConcat)
      d(`concat "${concatWhiteSpaces}" ${concatWhiteSpaces.length}LENGHT ${beforeConcatBak + 1} line ${concatLineBak + 1}`)
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
  function findMethodOrProperty() {
    // true if method, false if prop
    //stumble upon a valid variable Char
    if (propCharsObj[lines[i][c]]) {
      c++

      while (c < numberOfChars && propCharsObj[lines[i][c]]) {
        c++
      }

      validName = lines[i].slice(nonWhiteSpaceStart, c)
      if (c === numberOfChars) {
        // d(`${validName} PROPERTY EOL ${char()}`)
        everything.push({type: 'property EOL', text:validName,i1: i, c1:nonWhiteSpaceStart ,c2:c})
        return false
      }

      if (lines[i][c] === '.') {
        c++
        if (isNaN(Number(validName))) {
          findMethodOrProperty()
          return true
        } else {
          findDecimal()
          return true
        }
      }

      //#METHOD CALL
      if (lines[i][c] === '(') {
        // d(`${validName}( METHOD( ${char()}`)
        everything.push({type: 'method(', text:`${validName}(`,i1: i, c1:nonWhiteSpaceStart,c2:c + 1})
        c++, exprFoundLine = i
        let endsWithComma = false
        while (true) {
          skipThroughEmptyLines()
          if (lines[i][c] === ',') {
            endsWithComma = true
            // d(', method CALL', char())
            everything.push({type: ', method', text:',',i1: i, c1:c})
            c++
            continue
          }
          if (findExpression()) {
            endsWithComma = false
          } else {
            if (endsWithComma) {
              d('ILLEGAL trailling , METHOD', char())
            }
            break
          }
        }
        if (i !== exprFoundLine) {
          d('ILLEGAL ) METHOD', char())
        }
        // d(') METHOD', char())
        everything.push({type: ') method', text:')',i1: i, c1:c})

        c++
        return true

      }

      if (findArrayAccess()) { return true }

      // d(`${validName} PROPERTY ${char()}`)
      everything.push({type: 'property', text:validName,i1: i, c1:nonWhiteSpaceStart ,c2:c})
      //look for comments
      return false
    }
  }
  function findArrayAccess() {
    if (lines[i][c] === '[') {
      // d(`${validName} ArrAccess ${char()}`)
      everything.push({type: 'ArrAccess', text:validName,i1: i, c1:nonWhiteSpaceStart ,c2:c})

      // d('[ ArrAccess', char())
      everything.push({type: '[ ArrAccess', text:'[',i1: i, c1:c})
      c++
      if (!betweenExpression()) { findExpression() }
      // d('] ArrAccess', char())
      everything.push({type: '] ArrAccess', text:']',i1: i, c1:c})
      c++
      return true
    }
  }
  function findExpression() {
    skipThroughWhiteSpaces()
    //nothing left, continue
    if (c === numberOfChars || lines[i][c] === ';') {
      if (insideContinuation) {
        if (endExprContinuation()) {
          findExpression()
        }
      } else {
        if (startContinuation()) {
          i++, c = 0, numberOfChars = lines[i].length
          findExpression()
        }
      }
      return false
    }
    nonWhiteSpaceStart = c
    //stumble upon a valid variable Char
    if (lines[i][c] === '%' || variableCharsObj[lines[i][c]]) {
      c++

      skipValidChar()

      validName = lines[i].slice(nonWhiteSpaceStart, c)
      if (c === numberOfChars) {
        if (isNaN(Number(validName))) {
          // d(`${validName} validName VARIABLE EOL ${char()}`)
          everything.push({type: 'validName VARIABLE EOL', text:validName,i1: i, c1:nonWhiteSpaceStart ,c2:c})
        } else {
          // d(`${validName} Integer EOL ${char()}`)
          everything.push({type: 'Integer', text:validName,i1: i, c1:nonWhiteSpaceStart ,c2:c})
        }
        betweenExpression()
        return true
      }

      //skip through % OR valid variable Chars
      while (c < numberOfChars && (findPercentVar() || variableCharsObj[lines[i][c]])) {
        c++
      }
      validName = lines[i].slice(nonWhiteSpaceStart, c)
      if (c === numberOfChars) {
        d(`${validName} %VARIABLE% EOL ${char()}`)
        betweenExpression()
        return true
      }

      if (lines[i][c] === '.') {
        c++
        if (isNaN(Number(validName))) {
          findMethodOrProperty()
        } else {
          findDecimal()
        }
        betweenExpression()
        return true
      }

      //#FUNCTION CALL
      if (lines[i][c] === '(') {
        //#FUNCTION CALL
        // d(`${validName}( function ${char()}`)
        everything.push({type: 'function(', text:`${validName}(`,i1: i, c1:nonWhiteSpaceStart ,c2:c + 1})
        c++, exprFoundLine = i
        let endsWithComma = false
        while (true) {
          skipThroughEmptyLines()
          if (lines[i][c] === ',') {
            endsWithComma = true
            // d(', function CALL', char())
            everything.push({type: ', function', text:',',i1: i, c1:c})
            c++
            continue
          }
          if (findExpression()) {
            endsWithComma = false
          } else {
            if (endsWithComma) {
              d('ILLEGAL trailling , FUNCTION', char())
            }
            break
          }
        }
        if (i !== exprFoundLine) {
          d('ILLEGAL ) function', char())
        }
        // d(') function', char())
        everything.push({type: ') function', text:')',i1: i, c1:c})

        c++
        return true
      }
      if (findArrayAccess()) { return true }

      if (isNaN(Number(validName))) {
        // d(`${validName} idkVariable ${char()}`)
        everything.push({type: 'idkVariable', text:validName,i1: i, c1:nonWhiteSpaceStart ,c2:c})
      } else {
        // d(`${validName} Integer ${char()}`)
        everything.push({type: 'Integer', text:validName,i1: i, c1:nonWhiteSpaceStart ,c2:c})
      }
      betweenExpression()
      return true

    }

    if (findDoubleQuotedString()) {
      betweenExpression()
      return true
    } else {
      if (i === howManyLines) {
        d('findExpression OutOfLines')
        return false
      }
    }

    if (lines[i][c] === '(') {
      d('( group', char())
      c++
      if (!betweenExpression()) { findExpression() }
      d(') group', char())
      c++
      betweenExpression()
      return true
    }

    if (lines[i][c] === '[') {
      // d('[ Array', char())
      everything.push({type: '[ Array', text:'[',i1: i, c1:c})

      c++

      exprFoundLine = i
      while (true) {
        if (!findExpression()) {
          if (lines[i][c] === ',') {
            d('ILLEGAL trailling , ARRAY', char())
          } else if (lines[i][c] === ']') {
            // d('valid empty arr', char())
          } else {
            d('illegal arr1', char())
          }
          break
        }
        if (lines[i][c] !== ',') {
          break
        }
        c++
      }
      if (i !== exprFoundLine) {
        d('ILLEGAL ] Array', char())
      }
      // d('] Array', char())
      everything.push({type: '] Array', text:']',i1: i, c1:c})
      c++
      betweenExpression()
      return true
    }

    if (lines[i][c] === '{') {
      // d('{ object', char())
      everything.push({type: '{ object', text:'{',i1: i, c1:c})
      const objStart: [number, number] = [c,i]
      colonDeep++, c++, exprFoundLine = i
      let kStart: [number, number], vStart: [number, number], k: string, v: string
      const mapKeysAndValuesArr = []
      let singleVar: boolean, afterSingleVar: number,beforeSkipSpaces: number,afterSkipSpaces: number,afterFindExpression: number, haventFoundSingleVar: boolean
      while (true) {
        kStart = [c,i]
        singleVar = true

        beforeSkipSpaces = c
        skipThroughWhiteSpaces()
        afterSkipSpaces = c

        //skipSpaces
        // skip though propCharsObj
        // if found expression:
        // (another propCharsObj or anything)
        // it not NOT a singleVar anymore
        haventFoundSingleVar = true

        if (findSingleVar()) {
          haventFoundSingleVar = false
        }

        afterSingleVar = c

        if (findExpression()) {
          singleVar = false
        } else {
          afterFindExpression = c
          // if haven't expression, it is only illegal if haventFoundSingleVar, which is a valid key
          if (haventFoundSingleVar) {
            if (lines[i][c] === ',') {
              d('ILLEGAL trailling , OBJECT', char())
            } else if (lines[i][c] === '}') {
              // d('valid empty obj', char())
            } else {
              d('illegal obj1', char())
            }
            break
          }
        }

        if (lines[i][c] === ':') {
          // d(': object', char())
          everything.push({type: ': object', text:':',i1: i, c1:c})
        } else {
          d('illegal obj2', char())
        }

        if (singleVar) {
          k = `${lines[i].slice(beforeSkipSpaces,afterSkipSpaces )
          }"${
            lines[i].slice(afterSkipSpaces,afterSingleVar)
          }"${
            lines[i].slice(afterSingleVar,afterFindExpression)}`
          // d('k',k)
        } else {
          k = textFromPosToCurrent(kStart)
        }
        // d('=====================\n',kStart,k,'\n=====================')
        mapKeysAndValuesArr.push(k)

        c++ //skip :

        vStart = [c,i]

        findExpression()

        v = textFromPosToCurrent(vStart)
        // d('=====================\n',vStart,v,'\n=====================')
        mapKeysAndValuesArr.push(v)

        if (lines[i][c] === ',') {
          // d(', object', char())
          everything.push({type: ', object', text:',',i1: i, c1:c})
        } else {
          break
        }
        c++
      }
      if (i !== exprFoundLine) {
        d('ILLEGAL }', char())
      }
      // d('} object', char())
      everything.push({type: '} object', text:'}',i1: i, c1:c})
      // d(`]]]]]]]]]]]]]]]]]]]]\nMap(${mapKeysAndValuesArr.join(',')})`)
      colonDeep--, c++
      // d(']]]]]]]]]]]]]]]]]]]]\n',objStart,i,textFromPosToCurrent(objStart))
      // rangeAndReplaceTextArr.push([[objStart,[c,i]],`Map(${mapKeysAndValuesArr.join(',')})`])
      // objectsToconvertToMap.push({range:[objStart,[c,i]],textArr:mapKeysAndValuesArr})
      betweenExpression()
      return true
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
      validName = lines[i].slice(nonWhiteSpaceStart, c)
      return true
    }
  }
  //true if current char is ", false if it isn't
  function findDoubleQuotedString() {
    if (lines[i][c] === '"') {
      strStartPos = c, strStartLine = i
      c++
      //noClosing " found on the same line
      if (!findClosingQuoteInLine()) {
        //continuation wasn't resolved
        if (!recurseContinuation()) {
          //script is broken at this point but we still try to continue
          c++
          d('AS LAST RESORT: doing skipThroughEmptyLines', char())
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
          c++
          d(printString(), 'String')
          return true
        }
        // semiColonComment must be preceded by whiteSpace
      } else if (lines[i][c] === ';' && whiteSpaceObj[lines[i][c - 1]]) {
        d('semiColonComment when findClosingQuote', char())
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
      d('stringContinuation START', char())
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
    i++
    while (i < howManyLines) {
      c = 0
      numberOfChars = lines[i].length
      skipThroughWhiteSpaces()
      if (c === numberOfChars) {
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
        return false
      }
    }
    d('startContinuation OutOfLines')
    trace()
    return false
  }
  function endExprContinuation() {
    i++, c = 0, numberOfChars = lines[i].length
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


  function endStringContinuation() {
    //now continue until I find a line starting with ')'
    i++
    while (i < howManyLines) {
      c = 0, numberOfChars = lines[i].length
      skipThroughWhiteSpaces()
      //true if found line starting with ) AND closingQuote on the same line
      if (c < numberOfChars && lines[i][c] === ')') {
        insideContinuation = false
        d('stringContinuation END', char())
        c++
        //if ) and no ", return false to start another continuation
        return findClosingQuoteInLine()
        //if found closing " first, expect expression
        // " var
        // but continuation didn't end, IDK what happens
      } else if (findClosingQuoteInLine()) {
        betweenExpression()
        return false
        // return true
      }
      i++
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
          d('comment while skipThroughFindChar', char())
          break charLoop
        } else if (lines[i][c] === charToFind) {
          // d('found', charToFind, 'at', char())
          return true
        }
        c++
      }
      i++
      if (i < howManyLines) {
        c = 0, numberOfChars = lines[i].length
        continue outer
      } else {
        return false
      }
    }
  }
  //true if found anything !whiteSpace, false if outOfLines
  function skipThroughEmptyLines() {
    const c1 = c, i1 = i
    //also skip through whiteSpaces, comments
    while (i < howManyLines) {
      while (c < numberOfChars && whiteSpaceObj[lines[i][c]]) {
        c++
      }
      //EOL: next line
      if (c === numberOfChars) {
        //comment: next line
      } else if (lines[i][c] === ';' && (c === 0 || whiteSpaceObj[lines[i][c - 1]])) {
        // d('comment while skipThroughEmptyLines', char())
      } else {
        //anything else, return found
        const text = textFromPosToCurrent([c1,i1])
        if (text) {
          everything.push({type: 'emptyLines', text:text,i1:i1, c1: c1,i2:i,c2:c})
          everythingPushCounter++
          if (everythingPushCounter === 3) {
            ch()
            trace()
          }
        }
        return true
      }
      i++
      if (i < howManyLines) {
        c = 0, numberOfChars = lines[i].length
      } else {
        return false
      }
    }
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
      everything.push({type: 'whiteSpaces', text:text,i1: i, c1: c1,c2:c})
    }
  }
  function findCommentsAndEndLine() {
    // console.trace()
    // process.exit()
    let toReturn = true
    dummyLoop:
    while (true) {
      if (c === numberOfChars) {
        break dummyLoop
      }
      if (c < numberOfChars && !whiteSpaceObj[lines[i][c]]) {
        d(`ILLEGAL nonWhiteSpace '${lines[i][c]}' at findCommentsAndEndLine ${char()}`)
        toReturn = false; break dummyLoop
      }
      while (c < numberOfChars) {
        if (lines[i][c] === ';') {
          d('semiColonComment at findCommentsAndEndLine', char())
          break dummyLoop
        }
        c++
      }
      break dummyLoop
    }
    everything.push({type: 'newLine findCommentsAndEndLine', text:'\n',i1: i, c1:c})
    i++; return toReturn
  }
  function findPercentVar() {
    const percentVarStart = c
    if (c < numberOfChars && lines[i][c] === '%') {
      c++
      skipValidChar()
      d(lines[i][c])
      if (c < numberOfChars && lines[i][c] === '%') {
        d(`${lines[i].slice(percentVarStart, c)} %VAR% ${char()}`)
        return true
      } else {
        d(lines[i].slice(nonWhiteSpaceStart, c), 'ILLEGAL %VAR%', char())
        return false
      }
    } else {
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
      everything.push({type: 'singleVar', text:text,i1: i, c1: c1,c2:c})
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
  function writeSync(content: string) {
    const fs = require('fs')
    fs.writeFileSync('outputToFile.txt', content, 'utf-8')
    // console.log('readFileSync complete')
  }
  function printString() {
    if (strStartLine === i) {
      return lines[i].slice(strStartPos, c)
    } else {
      let strToPrint = lines[strStartLine].slice(strStartPos)
      for (let i2 = strStartLine + 1; i2 < i; i2++) {
        // console.log(lines[i2])
        strToPrint += `\n${lines[i2]}`
      }
      strToPrint += `\n${lines[i].slice(0, c)}`
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
}

