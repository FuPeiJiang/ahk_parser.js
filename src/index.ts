import fs from 'fs'
const content: string = fs.readFileSync('tests/v2var.ahk').toString()

console.log(content)
