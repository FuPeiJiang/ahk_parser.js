import fs from 'fs'
import regexes from './tokens'
const content: string = fs.readFileSync('tests/v2var.ahk').toString().replace(/\r/g, '')

// array of Object|Array
const root: (Record<string,unknown>|unknown[])[] = []

const lines: string[] = content.split('\n')

for (let i = 0, len = lines.length; i < len; i++) {
  var line = lines[i], error = 0

  // const lineError: [string, boolean] = [lines[i], true]
  // var error = true
  // assignStatement(line)

  var [line, error] = lineComment(lines,i,root)
  console.log(root)
  console.log([line, error])

}

// function lineComment(lineError: [string, boolean]) {
// function lineComment(line: string, node: Object[]): [string, number] {
function lineComment(lines: string[], i: number, node: (Record<string,unknown>|unknown[])[]): [string, number] {
  // function lineComment(line: string, i: number, node: (Record<string,unknown>|unknown[])[]): [string, number] {
  // function lineComment([line, error]: [string, boolean]) {
  // console.log(lineError[0])
  // const pos = lineError[0].search(regexes.CommentSemiColon)
  // if (pos !== -1) {
  // lineError[0] = lineError[0].slice(0,pos)
  // lineError[1] = false
  // }

  const pos = line.search(regexes.CommentSemiColon)
  if (pos !== -1) {
    node.push({lineComment:line.slice(pos)})
    line = line.slice(0, pos)
    // error = 0
  }
  // const error = 345
  return [line, error, ]
}



function assignStatement(expr: string) {
  const [left, right]: string[] = expr.split('-')
  console.log(left)
  console.log(right)
}