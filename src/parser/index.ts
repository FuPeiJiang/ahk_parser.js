import { CommentSemiColon, startingMultiLineComment, endingMultiLineComment, whiteSpaceObj, variableCharsObj } from './tokens'
// import {whiteSpaaaaaceObj} from './usage'
const d = console.debug.bind(console)
// d(whiteSpaaaaaceObj)

export default (content: string) => {
  // https://stackoverflow.com/questions/6784799/what-is-this-char-65279#answer-6784805
  // https://stackoverflow.com/questions/13024978/removing-bom-characters-from-ajax-posted-string#answer-13027802
  if (content[0] === '\ufeff') {
    content = content.slice(1)
  }
  const lines = content.split('\n')
  const numberOfLines = lines.length
  const everything = []
  let i = 0, c = 0

  lineLoop:
  while (i < numberOfLines) {
    c = 0
    const numberOfChars = lines[i].length

    //skip through whiteSpaces
    while (c < numberOfChars && whiteSpaceObj[lines[i][c]]) {
      c++
    }

    //#multiline comments
    //if line starts with /*
    // leave 2 chars at end
    const numCharsMinusOne = numberOfChars - 1
    if (c < numCharsMinusOne && lines[i].slice(c, c + 2) === '/*') {
      const multiLineCommentLineStart = i, multiLineCommentColStart = c
      // d('MultilineComment START', l())
      while (++i < numberOfLines) {
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
    //nothing left, continue
    if (c === numberOfChars) {
      i++
      continue lineLoop
    }

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

      //#FUNCTION
      if (lines[i][c] === '(') {
        const funcName = lines[i].slice(startPosFuncName, c)
        // d('is not a number, valid func name')
        if (isNaN(Number(funcName))) {
          // everything.push({type: 'function', line: i, colStart:startPosFuncName, colEnd:c, name:lines[i].slice(startPosFuncName,c)})
        }
      } else {
        const funcName = lines[i].slice(startPosFuncName, c)
        d(funcName)
        // letter without ( so var NOT func
        // not yet implemented
      }
      i++
      continue
    }

    i++

  }
  d(everything)
  return everything


  function char() {
    return `${c + 1} ${l()}`
  }
  function l() {
    return `line ${i + 1}`
  }
}

/* //#double-quoted strings
      } else if (lines[i][c] === '"') {
        const strStartPos = c, strStartLine = i
        c++

        outer2:
        while (true) {
          while (c < numberOfChars && whiteSpaceObj[lines[i][c]]) {
            c++
          }
          while (c < numberOfChars) {
            if (lines[i][c] === '"') {
              if (c + 1 < numberOfChars) {
                if (lines[i][c + 1] === '"') {
                  // 2 doubleQuotes you may continue
                  c += 2
                  continue
                } else {
                  // not a quote the string ends
                  c++
                  // d('no quote after DoubleQuotesString', `Ln ${strStartLine + 1}, Col ${strStartPos + 1} - Ln ${i + 1}, Col ${c + 1}`)
                  break outer2
                }
              } else {
                // EOL the string ends
                c++
                // d('EOL DoubleQuotesString', `Ln ${strStartLine + 1}, Col ${strStartPos + 1} - Ln ${i + 1}, Col ${c + 1}`)
                break outer2
              }
            }
            c++
          }
          if (++c >= numberOfChars) {
            continue outer3
          }
          c = 0
          numberOfChars = lines[i].length
        } */

