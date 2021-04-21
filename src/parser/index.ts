import { CommentSemiColon, startingMultiLineComment, endingMultiLineComment, whiteSpaceObj, variableCharsObj, operatorsObj, typeOfValidVarName,whiteSpaceOverrideAssign } from './tokens'
// import {whiteSpaaaaaceObj} from './usage'
const d = console.debug.bind(console)
// d(whiteSpaaaaaceObj)

export default (content: string) => {
  // const trie = {}
  // const addToTrie = createAddToTrie(trie)
  // addToTrie('#NoEnv', () => console.log(23423))
  // addToTrie(':=', () => console.log('fwefwe\'f'))

  // https://stackoverflow.com/questions/6784799/what-is-this-char-65279#answer-6784805
  // https://stackoverflow.com/questions/13024978/removing-bom-characters-from-ajax-posted-string#answer-13027802
  if (content[0] === '\ufeff') {
    content = content.slice(1)
  }
  const lines = content.split('\n')
  const howManyLines = lines.length
  const everything = []
  const toFile = ''
  let i = 0, c = 0, numberOfChars = 0, validName = ''

  lineLoop:
  while (i < howManyLines) {
    c = 0
    numberOfChars = lines[i].length

    skipThroughWhiteSpaces()

    //#multiline comments
    //if line starts with /*
    // leave 2 chars at end
    const numCharsMinusOne = numberOfChars - 1
    if (c < numCharsMinusOne && lines[i].slice(c, c + 2) === '/*') {
      const multiLineCommentLineStart = i, multiLineCommentColStart = c
      // d('MultilineComment START', l())
      while (++i < howManyLines) {
        c = 0
        const numCharsMinusOne = lines[i].length - 1

        //skip through whiteSpaces
        while (c < numCharsMinusOne && whiteSpaceObj[lines[i][c]]) {
          c++
        }

        //if line starts with */
        if (lines[i].slice(c, c + 2) === '*/') {
          everything.push({ type: 'MultilineComment', lineStart: multiLineCommentLineStart, colStart: multiLineCommentColStart, lineEnd: i, colEnd: c + 2 })
          // d('MultilineComment END', l())
          break
        }
      }
    }
    //out of lines
    if (i === howManyLines) {
      break lineLoop
    }
    //nothing left, continue
    if (c === numberOfChars) {
      i++
      continue lineLoop
    }

    const nonWhiteSpaceStart = c

    //#semicolon comments
    if (lines[i][c] === ';') {
      // d('SemiColonComment', `${c}-END`, l())
      // everything.push({type: 'SemiColonComment', line: i, colStart: c})
      i++
      continue lineLoop
    }

    //stumble upon a valid variable Char
    if (variableCharsObj[lines[i][c]]) {
      const startPosFuncName = c
      c++

      //skip through valid variable Chars
      while (c < numberOfChars && variableCharsObj[lines[i][c]]) {
        c++
      }

      // if EOL, it must be COMMAND
      if (c === numberOfChars) {

        // d('COMMAND EOL', char())
        i++
        continue lineLoop
      }

      validName = lines[i].slice(startPosFuncName, c)
      const idkType = typeOfValidVarName[validName.toLowerCase()]
      // comma can't be assignment, so I can skip assignment
      // if it has a comma, it could be a hotkey, it's only NOT a hotkey if it's a valid COMMAND
      if (lines[i][c] === ',') {
        // directive or command
        if (idkType === 1 || idkType === 4) {
          d(validName, 'DIRECTIVE OR COMMAND comma', char())
          i++
          continue lineLoop
        }
      }

      // only directives and "if" override assignment and ONLY when there's a whiteSpace
      if (whiteSpaceObj[lines[i][c]]) {
        if (whiteSpaceOverrideAssign[idkType]) {
          if (idkType === 1) {
            d(validName,'whiteSpace DIRECTIVE',char())
          } else if (idkType === 2) {
            d(validName,'if statement',char())
          } else if (idkType === 3) {
            d(validName,'global local or static',char())
          }
          i++
          continue lineLoop
        }

        skipThroughWhiteSpaces()

        if (findOperators()) {
          findExpression()
          i++
          continue lineLoop
        }

        if (idkType === 4) {
          d(validName,'whiteSpace COMMAND',char())
          i++
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
    while (c < numberOfChars && lines[i][c] === '%' || variableCharsObj[lines[i][c]]) {
      c++
    }

    //#FUNCTION
    if (lines[i][c] === '(') {
      const validName = lines[i].slice(nonWhiteSpaceStart, c)
      // d('is not a number, valid func name')
      if (isNaN(Number(validName))) {
        // d('FUNCTION CALL OR DEFINITION', char())
        // everything.push({type: 'function', line: i, colStart:startPosFuncName, colEnd:c, name:lines[i].slice(startPosFuncName,c)})
      }

      //#METHOD OR PROPERTY
      // this is NOT a METHOD call:
      // str.=v[key] "+" k "|"
      // so check if the next character is a valid Var
    } else if (lines[i][c] === '.' && variableCharsObj[lines[i][c + 1]]) {
      const validName = lines[i].slice(nonWhiteSpaceStart, c)
      if (isNaN(Number(validName))) {
        // d('METHOD OR PROPERTY', char())
      }
    }

    skipThroughWhiteSpaces()

    if (findOperators()) {
      findExpression()
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
          d(lines[i].slice(nonWhiteSpaceStart,c + 1),'HOTKEY', char())
          // d('HOTKEY')
        }
      }
      c++
    }

    i++

  }
  // d(everything)
  // toFile = toFile.slice(1)
  // writeSync(toFile)
  return everything

  function findOperators() {
    //#VARIABLE ASSIGNMENT
    if (c < numberOfChars - 2 && operatorsObj[lines[i].slice(c,c + 3)]) {
      d(validName,'3 char assignment operator',char())
      c += 3
      return true
    } else if (c < numberOfChars - 1 && operatorsObj[lines[i].slice(c,c + 2)]) {
      // d(validName,'2 char assignment operator',char())
      c += 2
      return true
    } else if (c < numberOfChars && operatorsObj[lines[i][c]]) {
      c++
      return true
    } else {
      return false
    }

  }

  function betweenExpression() {
    skipThroughWhiteSpaces()
    if (c === numberOfChars) {
      return false
    } else if (findOperators()) {
      findExpression()
      return true
    }
  }
  function findExpression() {
    skipThroughWhiteSpaces()
    //nothing left, continue
    if (c === numberOfChars) {
      return false
    }
    const nonWhiteSpaceStart = c
    //stumble upon a valid variable Char
    if (lines[i][c] === '%' || variableCharsObj[lines[i][c]]) {
      c++
      //skip through valid variable Chars
      while (c < numberOfChars && variableCharsObj[lines[i][c]]) {
        c++
      }
      validName = lines[i].slice(nonWhiteSpaceStart, c)
      if (c === numberOfChars) {
        d(validName, 'validName VARIABLE EOL', char())
        return true
      }

      //skip through % OR valid variable Chars
      while (c < numberOfChars && lines[i][c] === '%' || variableCharsObj[lines[i][c]]) {
        c++
      }
      validName = lines[i].slice(nonWhiteSpaceStart, c)
      if (c === numberOfChars) {
        d(`${validName} %VARIABLE% EOL ${char()}`)
        return true
      }

      if (findMethodOrDecimal()) {
        return true
      }

      if (lines[i][c] === '(') {
        d(`${validName} Function ${char()}`)
        return true
      } else if (lines[i][c] === '[') {
        d(`${validName} Array/Map Access ${char()}`)
        return true
      } else {
        d(`${validName} idkVariable ${char()}`)
        betweenExpression()
      }

    }

    if (findDoubleQuotedString()) {
      // d(lines[i][c])
      betweenExpression()
      // return true
    }

  }
  function findMethodOrDecimal() {
    if (lines[i][c] === '.' && variableCharsObj[lines[i][c + 1]]) {
      if (isNaN(Number(validName))) {
        d(validName, 'METHOD OR PROPERTY', char())
        return true
      } else {
        d(validName, 'DECIMAL NUMBER', char())
        return true
      }
    }
    return false
  }
  function findDoubleQuotedString() {
    let strStartPos: number, strStartLine: number
    if (lines[i][c] === '"') {
      strStartPos = c, strStartLine = i
      c++
      while (true) {
        //maybe end of string
        if (c === numberOfChars) {
          expectMultilineParen()
          c++
        } else if (lines[i][c] === '"') {
          // "" is escapechar
          // d(lines[i][c + 1])
          if (c < numberOfChars - 1 && lines[i][c + 1] === '"') {
            c += 2
            continue
          } else {
            //end of string
            //to slice, the caret must be outside, or to the right of c
            c++
            d('string',printString())
            // d('end', lines[i].slice(strStartPos,c + 1))
            return true
          }
          // comment and expectMultiline
        } else if (lines[i][c] === ';' && whiteSpaceObj[lines[i][c - 1]]) {
          d('comment and expectMultiline')
          expectMultilineParen()
          c++
          // return true
        } else {
          c++
        }
      }
    } else {
      return false
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
        strToPrint += `\n${lines[i].slice(0,c)}`
        return strToPrint
      }
      // d('no quote after DoubleQuotesString', `Ln ${strStartLine + 1}, Col ${strStartPos + 1} - Ln ${i + 1}, Col ${c + 1}`)

    }
  }
  function expectMultilineParen() {
    i++
    while (i < howManyLines) {
      c = 0
      numberOfChars = lines[i].length
      skipThroughWhiteSpaces()
      if (c === numberOfChars) {
        d('multilineParen skip empty line')
        i++
        continue
      } else if (lines[i][c] === ';') {
        d('multilineParen comment...')
        i++
        continue
      } else if (lines[i][c] === '(') {
        d('multiLineParen START',char())
        //now continue until I find a line starting with ')'
        i++
        while (i < howManyLines) {
          c = 0
          numberOfChars = lines[i].length
          skipThroughWhiteSpaces()
          if (c < numberOfChars && lines[i][c] === ')') {
            d('multiLineParen END',char())
            return true
          }
          i++
        }
        // how to return out of lines ???
        return false
      } else {
        d(c, numberOfChars)
        d('illegal', lines[i][c])
        //illegal
        return false
      }
    }
    // how to return out of lines ???
    return false
  }
  function skipThroughWhiteSpaces() {
    while (c < numberOfChars && whiteSpaceObj[lines[i][c]]) {
      c++
    }
  }
  function writeSync(content: string) {
    const fs = require('fs')
    fs.writeFileSync('outputToFile.txt', content, 'utf-8')
    // console.log('readFileSync complete')
  }
  function char() {
    return `${c + 1} ${l()}`
  }
  function l() {
    return `line ${i + 1}`
  }
  // function createAddToTrie(trie) {
  // let c: number, strLenMinusOne
  // return function addToTrie(string1, func) {
  // c = 0, strLenMinusOne = string1.length - 1
  // recursiveAddKey(trie)
  // function recursiveAddKey(obj) {
  // const letter = string1[c]
  // if (c < strLenMinusOne) {
  // obj[letter] = obj[letter] || {}
  // c++
  // recursiveAddKey(obj[letter])
  // } else {
  // obj[letter] = func
  // }
  // }
  // }
  // }
}

