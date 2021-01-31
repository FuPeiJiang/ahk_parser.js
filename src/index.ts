import fs from 'fs'
// import regexes from 'tokens'
const content: string = fs.readFileSync('tests/v2var.ahk').toString().replace(/\r/g, '')

// console.log(content)
const whiteSpace = /[\t\u000B\u000C\u0020\u00A0]+/

console.log(whiteSpace.test(' '))
return
const lines: string[] = content.split('\n')

for (let i = 0, len = lines.length; i < len; i++) {
  const line = lines[i]
  console.log(line)
  // assignStatement(line)
  lineComment(line)

}


function lineComment(line: string) {
  line.indexOf(' ;')
  line.search(/re/)

}



function assignStatement(expr: string) {
  const [left, right]: string[] = expr.split('-')
  console.log(left)
  console.log(right)
}