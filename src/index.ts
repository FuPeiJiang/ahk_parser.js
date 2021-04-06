import fs from 'fs'
import {CommentSemiColon, startingMultiLineComment, endingMultiLineComment, whiteSpaceObj} from './tokens'
const d = console.debug.bind(console)
const content: string = fs.readFileSync('tests/legal.ahk').toString().replace(/\r/g, '')
// const content: string = fs.readFileSync('tests/yolo.ahk').toString().replace(/\r/g, '')
const lines = content.split('\n')
// array of Object|Array

const numberOfLines = lines.length

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
      d('MultilineComment START', l())
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
            d('MultilineComment END', l())
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
                // d('not a quote DoubleQuotesString', `Ln ${strStartLine + 1}, Col ${strStartPos + 1} - Ln ${i + 1}, Col ${c + 1}`)
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
        if (++i >= numberOfLines) {
          break
        }
        c = 0
        numberOfChars = lines[i].length
      }
    }
    c++
  }
  i++
  // if (startingMultiLineComment.test(lines[i])) {
  // d('MultilineComment START', l())
  // while (i < numberOfLines) {
  // if (endingMultiLineComment.test(lines[i])) {
  // d('MultilineComment END', l())
  // break
  // }
  // i++
  // }
  // i++
  // continue
  // } else if (CommentSemiColon.test(lines[i])) {
  // d('SemiColonComment', l())
  // i++
  // continue
  // }
  // i++

}
function char() {
  return `${c + 1} ${l()}`
}
function l() {
  return `line ${i + 1}`
}
