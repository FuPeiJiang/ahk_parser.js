import fs from 'fs'
import ahkParser from './parser/index'
import modifyEverythingToV2 from './modifyEverythingToV2'

const content: Buffer =
// fs.readFileSync('tests3/redo func definition.ahk')
// fs.readFileSync('tests3/fix multiline comments.ahk')
// fs.readFileSync('tests3/L colon L colon.ahk')
// fs.readFileSync('tests3/msgbox up colon.ahk')
// fs.readFileSync('v2tests/prop in func.ahk')
// fs.readFileSync('tests3/loop bracket.ahk')
// fs.readFileSync('tests3/assignment percent.ahk')
// fs.readFileSync('tests3/if paren no ws.ahk')
/* fs.readFileSync('tov2/Biga_mid.ahk')
// fs.readFileSync('tov2/Biga.ahk')
// fs.readFileSync('v2tests/A_IsUnicode from WinClipAPI.ahk')
// fs.readFileSync('v2tests/A_IsUnicode start group space.ahk')
fs.readFileSync('v2tests/A_IsUnicode.ahk')
// fs.readFileSync('v2tests/fix numput.ahk')
// fs.readFileSync('v2tests/fix if not.ahk')
fs.readFileSync('tov2/WinClip.ahk')
fs.readFileSync('tov2/WinClipAPI.ahk')
// fs.readFileSync('v2tests/v1concat space or not.ahk')
// fs.readFileSync('tests3/listlines.ahk')
// fs.readFileSync('tests3/ampersand to .Ptr.ahk')
// fs.readFileSync('tests3/VarSetCapacity with func inside.ahk')
// fs.readFileSync('tests3/recurse VarSetCapacity replacement.ahk')
fs.readFileSync('tov2/OpenInAhkExplorer.ahk')
// fs.readFileSync('tov2/sortAr.ahk')
// fs.readFileSync('tests3/splitpath.ahk')
// fs.readFileSync('tests3/not assignment operatEor.ahk')
// fs.readFileSync('tests3/idkAnymore23.ahk')
fs.readFileSync('tov2/jpgs to pdf.ahk')
// fs.readFileSync('tests3/command EOF.ahk')
// fs.readFileSync('tests3/test validName VARIABLE EOL.ahk')
fs.readFileSync('tov2/use_string.ahk')
// fs.readFileSync('tests3/fix if no paren.ahk')
fs.readFileSync('tov2/string.ahk') */
fs.readFileSync('tests/ahk_explorer.ahk')

const everything = ahkParser(content.toString().replace(/\r/g, ''))
const converted = modifyEverythingToV2(everything)

writeSync(converted,'reconstructed.ah2')
writeSync(arrOrObjToString(everything),'everything.txt')

function arrOrObjToString(obj) {
  const objDelim = ', ', objDelimLen = objDelim.length
  return innerFunc(obj)
  function innerFunc(obj) {
    var str = ''
    if (typeof obj === 'object')
    {
      if (Array.isArray(obj)) {
        for (let i = 0, len = obj.length; i < len; i++) {
          if (typeof obj[i] === 'object') {
            str += `\n${innerFunc(obj[i])},`
          } else {
            if (typeof obj[i] === 'string') {
              str += `\n'${obj[i]}',` //lol this implicitly calls func.toString()
            } else {
              str += `\n${obj[i]},` //lol this implicitly calls func.toString()
            }
          }
        }
        return `[\n${str.slice(1)}\n]` //remove the first , from string. removes nothing if empty string
      } else {
        for (var p in obj) {
          if (obj.hasOwnProperty(p)) {
            if (typeof obj[p] === 'object') {
              str += `${objDelim}${p}:${innerFunc(obj[p])}`
            } else {
              if (typeof obj[p] === 'string') {
                str += `${objDelim}${p}:'${obj[p]}'` //lol this implicitly calls func.toString()
              } else {
                str += `${objDelim}${p}:${obj[p]}` //lol this implicitly calls func.toString()
              }
            }
          }
        }
        return `{${str.slice(objDelimLen)}}` //remove the first , from string. removes nothing if empty string
      }
    } else {
      return ''
    }
  }
}

function writeSync(content: string, fileName: string) {
  fs.writeFileSync(fileName, `${content}`, 'utf-8')
  // console.log('readFileSync complete')
}
