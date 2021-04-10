import fs from 'fs'
import ahkParser from './parser/index'
const d = console.debug.bind(console)

const content: string = fs.readFileSync('tests/ahk_explorer.ahk').toString().replace(/\r/g, '')
// const content: string = fs.readFileSync('tests/legal.ahk').toString().replace(/\r/g, '')
// const content: string = fs.readFileSync('tests/yolo.ahk').toString().replace(/\r/g, '')

const everything = ahkParser(content)

type stringIndeaaaxBool = {
  [key: string]: boolean,
}
export const whiteSpaaaaaceObj: stringIndeaaaxBool = {' ':true,'\t':true}

type stringIndexNumber = {
  [key: string]: number,
}
const countOfEverything: stringIndexNumber = {}
for (let i = 0, len = everything.length; i < len; i++) {
  countOfEverything[everything[i].name] = countOfEverything[everything[i].name] + 1 || 1
}
// d(countOfEverything)
const funcNames = Object.keys(countOfEverything)
for (let i = 0, len = funcNames.length; i < len; i++) {
  const occurrencesOfFunc = countOfEverything[funcNames[i]]
  if (occurrencesOfFunc === 1) {
    console.log(funcNames[i])
  }
  // if (occurrencesOfFunc > 1) {
  // console.log(funcNames[i], occurrencesOfFunc)
  // }
}