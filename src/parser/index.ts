import {CommentSemiColon, startingMultiLineComment, endingMultiLineComment, whiteSpaceObj, variableCharsObj} from './tokens'
// import {whiteSpaaaaaceObj} from './usage'
const d = console.debug.bind(console)
// d(whiteSpaaaaaceObj)

export default (content: string) => {
  const lines = content.split('\n')
  const numberOfLines = lines.length
  const everything = []
  let i = 0, c = 0
  outer:
  while (i < numberOfLines) {
    c = 0
    let numberOfChars = lines[i].length
    // break
    const numCharsMinusOne = numberOfChars - 1
    // leave 2 chars at end
    while (c < numCharsMinusOne) {
      // if char is whitespace
      if (whiteSpaceObj[lines[i][c]]) {
        // d(char())
        c++
        continue
      } else if (lines[i].slice(c, c + 2) === '/*') {
        // d('MultilineComment START', l())
        i++
        // continue outer
        outer2:
        while (i < numberOfLines) {
          c = 0
          const numCharsMinusOne = lines[i].length - 1
          while (c < numCharsMinusOne) {
            if (whiteSpaceObj[lines[i][c]]) {
              c++
              continue
            } else if (lines[i].slice(c, c + 2) === '*/') {
              // d('MultilineComment END', l())
              i++
              break outer2
            }
            break
          }
          i++
        }
      }
      break
    }
    outer3:
    while (c < numberOfChars) {
      if (lines[i][c] === ';') {
        // d('SemiColonComment', `${c}-END`, l())
        i++
        continue outer
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
        }
      } else if (variableCharsObj[lines[i][c]]) {
        // c++
        // continue
        const startPosFuncName = c
        c++
        while (c < numberOfChars) {
          if (variableCharsObj[lines[i][c]]) {
            c++
            continue
          } else if (lines[i][c] === '(') {
            const funcName = lines[i].slice(startPosFuncName,c)
            // d('is not a number, valid func name')
            if (isNaN(Number(funcName))) {
              // if (isNaN(funcName as string)) {
              // if (isNumeric(funcName)) {
              // d(lines[i][c - 1], char())
              // d(`FUNCTION Ln ${i + 1} Col ${startPosFuncName + 1} - Col ${c + 1}`, lines[i].slice(startPosFuncName,c))
              everything.push({type: 'function', line: i, colStart:startPosFuncName, colEnd:c, name:lines[i].slice(startPosFuncName,c)})
            }
            c++
            continue outer3
          } else {
            // letter without ( so var NOT func
            continue outer3
          }
        }
      }
      c++
    }
    i++

  }
  return everything


  function char() {
    return `${c + 1} ${l()}`
  }
  function l() {
    return `line ${i + 1}`
  }
}


