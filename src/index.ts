import fs from 'fs'
import regexes from './tokens'
const content: string = fs.readFileSync('tests/v2var.ahk').toString().replace(/\r/g, '')


const lines: string[] = content.split('\n')

for (let i = 0, len = lines.length; i < len; i++) {
  const line = lines[i]
  console.log(line)
  // assignStatement(line)
  lineComment(line)

}


function lineComment(line: string) {
  const pos = line.search(regexes.CommentSemiColon)
  if (pos !== -1) {
    //
  }



}



function assignStatement(expr: string) {
  const [left, right]: string[] = expr.split('-')
  console.log(left)
  console.log(right)
}