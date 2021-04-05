import fs from 'fs'
import {CommentSemiColon, startingMultiLineComment, endingMultiLineComment} from './tokens'
const d = console.debug.bind(console)
const content: string = fs.readFileSync('tests/yolo.ahk').toString().replace(/\r/g, '')
const lines = content.split('\n')
// array of Object|Array

const numberOfLines = lines.length

let i = 0
while (i < numberOfLines) {
  if (startingMultiLineComment.test(lines[i])) {
    d('MultilineComment START', l())
    while (i < numberOfLines) {
      if (endingMultiLineComment.test(lines[i])) {
        d('MultilineComment END', l())
        break
      }
      i++
    }
    i++
    continue
  } else if (CommentSemiColon.test(lines[i])) {
    d('SemiColonComment', l())
    i++
    continue
  }
  i++
}
function l() {
  return `line ${i + 1}`
}